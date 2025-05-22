import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto" />
        <h2 className="mt-4 text-xl font-medium text-gray-900">Loading...</h2>
        <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your experience.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;