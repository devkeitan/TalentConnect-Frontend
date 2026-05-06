const MessageBubble = ({ message, currentUserId }) => {
  const isMine = (message.sender_id ?? message.sender) === currentUserId;


  return (
    <div
      className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
          isMine
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <span
          className={`text-[10px] mt-1 block ${
            isMine ? 'text-blue-200 text-right' : 'text-gray-400'
          }`}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
