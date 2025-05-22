import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Filter, ShoppingCart as CartIcon } from 'lucide-react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { useCart } from './hooks/useCart';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
  const { cartItems, cartItemCount } = useCart();
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'food', name: 'Food' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'essentials', name: 'Essentials' },
    { id: 'cleaning', name: 'Cleaning' },
  ];

  // Don't show filters on product detail pages
  const showFilters = !location.pathname.includes('/marketplace/product/');
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Marketplace</h1>
        <Link
          to="/marketplace/cart"
          className="relative p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <CartIcon className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>

      {showFilters && (
        <>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div className="mb-6 flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </>
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            <ProductList 
              searchQuery={searchQuery} 
              selectedCategory={selectedCategory} 
            />
          } 
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default Marketplace;