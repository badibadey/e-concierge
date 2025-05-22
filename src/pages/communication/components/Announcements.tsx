import { useState } from 'react';
import { Megaphone, Calendar, Bell, Heart, MessageCircle, Share2 } from 'lucide-react';
import { mockAnnouncements } from '../data/mockAnnouncements';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  
  const handleLike = (id: string) => {
    setAnnouncements(
      announcements.map(announcement =>
        announcement.id === id
          ? {
              ...announcement,
              likes: announcement.liked
                ? announcement.likes - 1
                : announcement.likes + 1,
              liked: !announcement.liked,
            }
          : announcement
      )
    );
  };
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Community Announcements</h2>
          <p className="mt-1 text-sm text-gray-500">
            Stay up to date with the latest news and events in your community
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 rounded-full p-2">
                  {announcement.type === 'event' ? (
                    <Calendar className="h-6 w-6 text-primary-600" />
                  ) : (
                    <Megaphone className="h-6 w-6 text-primary-600" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {announcement.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{announcement.content}</p>
                  
                  {announcement.image && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleLike(announcement.id)}
                        className={`flex items-center text-sm ${
                          announcement.liked ? 'text-error-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Heart
                          className={`h-5 w-5 mr-1 ${
                            announcement.liked ? 'fill-error-600' : ''
                          }`}
                        />
                        <span>{announcement.likes}</span>
                      </button>
                      <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <MessageCircle className="h-5 w-5 mr-1" />
                        <span>{announcement.comments}</span>
                      </button>
                    </div>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <Share2 className="h-5 w-5 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;