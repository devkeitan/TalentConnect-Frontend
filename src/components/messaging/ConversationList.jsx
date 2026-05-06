import { useEffect, useState } from 'react';
import { getConversations } from '../../api/messaging';

const ConversationList = ({ onSelect, selectedId }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations().then((res) => {
      setConversations(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4 text-gray-400 text-sm">Loading conversations...</div>;

  if (conversations.length === 0)
    return <div className="p-4 text-gray-400 text-sm">No conversations yet.</div>;

  return (
    <div className="flex flex-col divide-y">
      {conversations.map((convo) => (
        <button
          key={convo.id}
          onClick={() => onSelect(convo.id)}
          className={`flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition ${
            selectedId === convo.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
          }`}
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
            {convo.other_user_name?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 text-sm truncate">
                {convo.other_user_name}
              </span>
              {convo.unread_count > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 ml-2 shrink-0">
                  {convo.unread_count}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {convo.last_message || 'No messages yet'}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ConversationList;
