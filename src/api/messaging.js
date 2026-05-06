import api from './axios';

const WS_BASE = import.meta.env.VITE_WS_BASE_URL;

// ─── REST API ───────────────────────────────────────────

export const getConversations = () =>
  api.get('/api/messaging/conversations/');

export const getConversation = (id) =>
  api.get(`/api/messaging/conversations/${id}/`);

export const createConversation = (bookingId) =>
  api.post(`/api/messaging/conversations/booking/${bookingId}/`);

// ─── WEBSOCKET ──────────────────────────────────────────

export const createChatSocket = (conversationId, onMessage) => {
  const token = localStorage.getItem('access');
  const socket = new WebSocket(
    `${WS_BASE}/ws/chat/${conversationId}/?token=${token}`
  );

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (err) => console.error('WebSocket error:', err);

  return socket;
};
