import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Product not found</h2>
        <p className="mt-2 text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/marketplace')}
          className="mt-4 btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div>
      <button
        onClick={() => navigate('/marketplace')}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Products</span>
      </button>
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="mt-6 lg:mt-0">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 flex-shrink-0 ${
                    product.rating > rating
                      ? 'text-accent-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-gray-600">({product.reviews} reviews)</p>
          </div>
          
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-sm text-green-600">In stock</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center">
              <span className="mr-3 text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full btn ${
                addedToCart ? 'bg-success-600 hover:bg-success-700' : 'btn-primary'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900">Delivery Information</h3>
            <p className="mt-2 text-sm text-gray-500">
              Delivery typically takes 15-30 minutes within the community.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="mt-6 space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className="h-4 w-4 text-accent-500"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm font-medium text-gray-900">Michael J.</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Great product! Delivery was quick and the quality was excellent.
            </p>
            <p className="mt-1 text-xs text-gray-500">2 days ago</p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3].map((rating) => (
                  <Star
                    key={rating}
                    className="h-4 w-4 text-accent-500"
                  />
                ))}
                {[0].map((rating) => (
                  <Star
                    key={rating}
                    className="h-4 w-4 text-gray-300"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm font-medium text-gray-900">Sarah T.</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Good product but took a bit longer to deliver than expected.
            </p>
            <p className="mt-1 text-xs text-gray-500">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;