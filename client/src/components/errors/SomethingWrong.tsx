
// interface Props {}

// function SomethingWrong(props: Props) {
//     const {} = props

//     return (
//         <div className="h-40 text-center">
//             <h1 className="text-4xl">Something Went Wrong</h1>
//             <p className="text-2xl">Please try again</p>
//         </div>
//     )
// }

// export default SomethingWrong

import { useTheme } from 'next-themes';
import { AlertCircle, RefreshCcw, HomeIcon, Syringe } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Props {}

function SomethingWrong(_props: Props) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Animated Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <Syringe 
            className="w-12 h-12 text-blue-500 -rotate-45 animate-bounce" 
            fill={theme === 'dark' ? '#3b82f6' : '#dbeafe'} 
          />
          <AlertCircle 
            className="w-12 h-12 text-red-500 animate-pulse"
          />
          <Syringe 
            className="w-12 h-12 text-blue-500 rotate-45 animate-bounce" 
            fill={theme === 'dark' ? '#3b82f6' : '#dbeafe'} 
          />
        </div>

        {/* Error Message */}
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-2xl font-bold text-red-800 dark:text-red-200">
            Something Went Wrong
          </AlertTitle>
          <AlertDescription className="text-red-600 dark:text-red-300">
            Our health system needs a quick check-up. Don't worry, we'll have everything back to normal soon.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button 
            onClick={handleRefresh}
            variant="secondary"
            size="lg"
            className="space-x-2"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>

          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 space-x-2"
          >
            <HomeIcon className="h-4 w-4" />
            <span>Back to Homepage</span>
          </Button>
        </div>

        {/* Health System Status */}
        <div className="mt-12 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Health System Status
          </h3>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span>System recovery in progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SomethingWrong;