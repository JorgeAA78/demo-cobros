// URL configurable vía variable de entorno VITE_API_URL (por ejemplo en Vercel)
const envApiUrl = import.meta.env.VITE_API_URL;

// En desarrollo usa localhost:3001; en producción usa VITE_API_URL o ruta relativa /api
export const API_URL = envApiUrl
    ? envApiUrl.replace(/\/+$/, '')
    : (import.meta.env.DEV ? 'http://localhost:3001' : '');

export const API_BASE = `${API_URL}/api`;
