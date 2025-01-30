// interface Props {}

// function Error404(props: Props) {
//     const {} = props

//     return (
//         <div className="h-40 text-center">
//             <h1 className="text-4xl text-primary">404: Page not found</h1>
//             <h2 className="text-2xl">This page does not exist</h2>
//         </div>
//     )
// }

// export default Error404


import { useTheme } from 'next-themes';
import { Heart, HomeIcon, Pill } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface Props {}

function Error404(_props: Props) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Animated Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <Heart 
            className="w-12 h-12 text-red-500 animate-pulse" 
            fill={theme === 'dark' ? '#ef4444' : '#fee2e2'} 
          />
          <Pill 
            className="w-12 h-12 text-blue-500 rotate-45" 
            fill={theme === 'dark' ? '#3b82f6' : '#dbeafe'} 
          />
          <Heart 
            className="w-12 h-12 text-red-500 animate-pulse" 
            fill={theme === 'dark' ? '#ef4444' : '#fee2e2'} 
          />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-500">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Looks like this page took a sick day! 
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Don't worry, our healthcare team is on it. 
            Let's get you back to the homepage.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8">
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Homepage
          </Button>
        </div>

        {/* Health Tips Easter Egg */}
        <div className="mt-12 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            While you're here, remember to: 
            <span className="block mt-2 font-medium">
              Stay hydrated • Get enough sleep • Exercise regularly
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error404;
