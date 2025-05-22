import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 fixed bottom-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center">
          {/* Lewa strona - linki */}
          <div className="flex justify-start space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <span className="text-sm">Privacy</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <span className="text-sm">Terms</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <span className="text-sm">Contact</span>
            </a>
          </div>
          
          {/* Środek - Made with heart */}
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-500 flex items-center">
              Made with <Heart className="h-4 w-4 text-error-500 mx-1" /> for smart living
            </p>
          </div>
          
          {/* Prawa strona - copyright */}
          <div className="flex justify-end">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} e-consigier
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;