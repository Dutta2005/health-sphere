import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Common medical conditions data
const commonConditions = [
  { id: 1, name: 'Headache', prompt: 'I have a severe headache' },
  { id: 2, name: 'Common Cold', prompt: 'I have runny nose and fever' },
  { id: 3, name: 'Stomach Pain', prompt: 'I have stomach pain and nausea' },
  { id: 4, name: 'Allergies', prompt: 'I have itchy eyes and sneezing' },
  { id: 5, name: 'Back Pain', prompt: 'I have lower back pain' },
];

// Helper function to convert chat history to Gemini format
const formatChatHistory = (context) => {
  if (!Array.isArray(context)) return [];
  
  return context.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
};

// Helper function to create system prompt with user message
const createPromptWithContext = (systemPrompt, userMessage) => {
  return `${systemPrompt}\n\nUser Query: ${userMessage}`;
};

// Get common conditions
export const getCommonConditions = async (req, res) => {
  try {
    res.json(commonConditions);
  } catch (error) {
    console.error('Error in getCommonConditions:', error);
    res.status(500).json({ error: 'Failed to fetch conditions' });
  }
};

// Process chat message
export const processChat = async (req, res) => {
  try {
    const { message, context = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are a medical assistant AI. Your role is to:
    1. Help identify possible conditions based on symptoms
    2. Provide general medical information and advice
    3. Discuss medications, their uses, and effects
    4. Always remind users to consult healthcare professionals for accurate diagnosis
    5. Avoid making definitive diagnoses
    Do not provide specific treatment recommendations.

    Important: Always maintain a professional and caring tone. If discussing serious symptoms,
    emphasize the importance of seeking immediate medical attention.`;

    // Initialize the chat model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Format the chat history
    const formattedHistory = formatChatHistory(context);

    try {
      // Start the chat with history
      const chat = model.startChat({
        history: formattedHistory,
      });

      // Send the message
      const prompt = createPromptWithContext(systemPrompt, message);
      const result = await chat.sendMessage([{ text: prompt }]);
      const response = await result.response;
      const responseText = response.text();

      // Update context with new messages
      const updatedContext = [
        ...context,
        { role: "user", content: message },
        { role: "assistant", content: responseText }
      ];

      // Send response
      res.json({
        message: responseText,
        context: updatedContext
      });

    } catch (chatError) {
      console.error('Chat processing error:', chatError);
      throw new Error('Failed to process chat message');
    }

  } catch (error) {
    console.error('Error in processChat:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Add symptom to existing conversation
// export const addSymptom = async (req, res) => {
//   try {
//     const { symptom, context = [] } = req.body;

//     if (!symptom) {
//       return res.status(400).json({ error: 'Symptom is required' });
//     }

//     const message = `I want to add another symptom: ${symptom}. Please consider this with my previous symptoms if any.`;
    
//     // Reuse the processChat logic
//     req.body.message = message;
//     await processChat(req, res);

//   } catch (error) {
//     console.error('Error in addSymptom:', error);
//     res.status(500).json({ 
//       error: 'Failed to process symptom',
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };