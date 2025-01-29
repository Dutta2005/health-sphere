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

// Modified system prompt to reduce safety triggers
const createSafePrompt = (userMessage) => {
  const systemPrompt = `You are a general wellness assistant. Please provide:
    1. General information about health and wellness
    2. Basic lifestyle suggestions for common concerns
    3. General educational information about health topics
    4. Reminders to consult healthcare professionals
    
    Remember to:
    - Keep responses informational and educational
    - Avoid specific medical advice or diagnoses
    - Maintain a supportive, professional tone
    - Emphasize the importance of professional medical consultation
    
    Note: This is for educational purposes only.`;

  return `${systemPrompt}\n\nQuestion: ${userMessage}`;
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

// Process chat message with enhanced error handling
export const processChat = async (req, res) => {
  try {
    const { message, context = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize the chat model with more conservative settings
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.6,
        topP: 0.7,
        topK: 30,
      },
    });

    const chat = model.startChat({
      history: formatChatHistory(context),
      generationConfig: {
        stopSequences: ["diagnose", "prescribe", "treatment plan"]
      }
    });

    try {
      const safePrompt = createSafePrompt(message);
      const result = await chat.sendMessage([{ text: safePrompt }]);
      
      // Additional safety check
      if (!result.response) {
        throw new Error('No response received from the model');
      }

      const responseText = result.response.text();
      
      if (!responseText) {
        throw new Error('Empty response received');
      }

      // Add disclaimer to response
      const finalResponse = `${responseText}\n\nNote: This information is for educational purposes only. Please consult with a healthcare professional for medical advice.`;

      const updatedContext = [
        ...context,
        { role: "user", content: message },
        { role: "assistant", content: finalResponse }
      ];

      res.json({
        message: finalResponse,
        context: updatedContext
      });

    } catch (chatError) {
      console.error('Chat processing error:', chatError);
      
      // Handle specific error types
      if (chatError.message?.includes('SAFETY')) {
        return res.status(400).json({
          error: 'Unable to process this request. Please rephrase your question in general terms.',
          message: 'I apologize, but I need you to rephrase your question in more general terms. Remember, I can only provide general educational information and cannot give specific medical advice.'
        });
      }

      // Fallback error response
      res.status(500).json({
        error: 'Unable to process request',
        message: 'I apologize, but I cannot process this request. Please try asking a different question or rephrase your current one.'
      });
    }

  } catch (error) {
    console.error('Error in processChat:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      message: 'An error occurred while processing your request. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};