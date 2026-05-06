import api from './axios';


// Decode JWT token to get user info
export const decodeToken = (token) => {
    try {
        const base64 = token.split('.')[1];
        return JSON.parse(atob(base64));   // decodes the payload
    } catch {
        return null;
    }
};

// Register
export const register = async (name, email, password, role) => {
  const res = await api.post('/api/users/', { name, email, password, role });
  const { access, refresh } = res.data;        // ← backend now returns these
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
  return decodeToken(access);                  // ← returns { role, name, user_id }
};

// Login
export const login = async (email, password) => {
  const res = await api.post('/api/auth/login/', { email, password });
  const { access, refresh } = res.data;

  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);

  const decoded = decodeToken(access);
  console.log('decoded token:', decoded);
  return decoded;
};

export const getMe = async () => {
    const res = await api.get('/api/users/me/');
    return res.data;
};

// Logout
export const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
};
