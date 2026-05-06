import { useEffect, useRef, useState } from 'react';
import { getConversation, createChatSocket } from '../../api/messaging';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ conversationId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // ─── Load existing messages ───────────────────────────
  useEffect(() => {
    if (!conversationId) return;

    getConversation(conversationId).then((res) => {
      setMessages(res.data.messages);
      setLoading(false);
    });

  }, [conversationId]);

  // ─── WebSocket connection ─────────────────────────────
  useEffect(() => {
    if (!conversationId) return;

    socketRef.current = createChatSocket(conversationId, (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current?.close();
    };
  }, [conversationId]);

  // ─── Auto scroll to bottom ────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ─── Send message ─────────────────────────────────────
  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;

   socketRef.current.send(JSON.stringify({ content: input }));
  setInput('');
  };  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center text-gray-400">Loading messages...</div>;

  return (
    <div className="flex flex-col h-full">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-4">No messages yet. Say hello! 👋</p>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} currentUserId={currentUserId} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2 items-center">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 resize-none border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatWindow;
