import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from "../ui/button";

function SomethingWrong() {
  return (
    <div className="h-screen bg-light-bg/80 dark:bg-dark-bg/80 flex items-center justify-center">
      <div className="text-center p-8 rounded-lg bg-light-bg dark:bg-dark-bg shadow-lg max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-red-600 animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Something Went Wrong
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We apologize for the inconvenience. This error won't affect any ongoing donation processes.
        </p>

        
          <Button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh Page
          </Button>
        

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          If the problem persists, please contact support
        </p>
      </div>
    </div>
  );
}

export default SomethingWrong;