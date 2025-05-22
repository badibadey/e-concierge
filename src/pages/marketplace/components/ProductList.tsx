import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { mockProducts } from '../data/mockProducts';

type ProductListProps = {
  searchQuery: string;
  selectedCategory: string;
};

const ProductList = ({ searchQuery, selectedCategory }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Filter products based on search query and category
    let filteredProducts = [...mockProducts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.category === selectedCategory
      );
    }
    
    setProducts(filteredProducts);
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card group">
              <Link to={`/marketplace/product/${product.id}`} className="block">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover object-center transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-4 w-4 flex-shrink-0 ${
                          product.rating > rating
                            ? 'text-accent-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </p>
                </div>
              </Link>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;