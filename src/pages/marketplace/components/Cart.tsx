import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const deliveryFee = 2.5;
  const total = subtotal + deliveryFee;
  
  const handleCheckout = () => {
    // Simulate checkout process
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderComplete(true);
      clearCart();
    }, 2000);
  };
  
  if (isOrderComplete) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success-100 text-success-600 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
        <p className="mt-2 text-gray-500">
          Your order has been placed and will be delivered shortly.
        </p>
        <p className="mt-1 text-gray-500">Order #12345</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate('/marketplace')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-500 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">
          Looks like you haven't added any products to your cart yet.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate('/marketplace')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <button
        onClick={() => navigate('/marketplace')}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Continue Shopping</span>
      </button>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-card">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.product.id} className="p-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-error-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M20 12H4" 
                              />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 4v16m8-8H4" 
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 lg:mt-0 lg:col-span-4">
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Delivery Fee</p>
                <p className="text-sm font-medium text-gray-900">${deliveryFee.toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">Order Total</p>
                <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full btn btn-primary py-2.5"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Checkout
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Delivery time: approximately 15-30 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;