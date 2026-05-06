import { useEffect, useState } from 'react';
import { getMe } from '../../../api/auth';
import ConversationList from '../../../components/messaging/ConversationList';
import ChatWindow from '../../../components/messaging/ChatWindow';
import { useSearchParams } from 'react-router-dom';

const TalentMessages = () => {
  const [searchParams] = useSearchParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedId, setSelectedId] = useState(
  searchParams.get('conversation') || null
);
  
    useEffect(() => {
    getMe().then((data) => setCurrentUserId(data.id));
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-64px)] border rounded-xl overflow-hidden shadow-sm">

      {/* Sidebar */}
      <div className="w-80 border-r bg-white overflow-y-auto shrink-0">
        <h2 className="text-lg font-semibold p-4 border-b">Messages</h2>
        <ConversationList onSelect={setSelectedId} selectedId={selectedId} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white">
        {selectedId ? (
          <ChatWindow conversationId={selectedId} currentUserId={currentUserId} />
        ) : (
          <div className="flex-1 h-full flex items-center justify-center text-gray-400">
            Select a conversation to start chatting 💬
          </div>
        )}
      </div>

    </div>
  );
};

export default TalentMessages;
