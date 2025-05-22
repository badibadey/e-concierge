import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { mockFaqs } from '../data/mockFaqs';

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Filter FAQs based on search query
  const filteredFaqs = mockFaqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group FAQs by category
  const groupedFaqs = filteredFaqs.reduce<Record<string, typeof mockFaqs>>(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    },
    {}
  );
  
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-1 text-sm text-gray-500">
            Find answers to common questions about living in our community
          </p>
          
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {Object.entries(groupedFaqs).length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No FAQs found matching your search.</p>
            </div>
          ) : (
            Object.entries(groupedFaqs).map(([category, faqs]) => (
              <div key={category} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-md overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedItems[faq.id] ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedItems[faq.id] && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;