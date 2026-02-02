// resources/js/services/api.js

const BASE_URL = '/api';

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('API error');
  }
  return res.json();
};

export const api = {
  getTrending: (page = 1) =>
    fetchJson(`${BASE_URL}/trending?page=${page}`),

  search: (q) =>
    fetchJson(`${BASE_URL}/search?q=${encodeURIComponent(q)}`),
};
