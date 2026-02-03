import axios from 'axios';

const BASE_URL = '/api';

const fetchJson = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const api = {
  getTrending: (page = 1) =>
    fetchJson(`${BASE_URL}/trending?page=${page}`),

  search: (q) =>
    fetchJson(`${BASE_URL}/search?q=${encodeURIComponent(q)}`),

  getMovieDetail: (path) =>
    fetchJson(`${BASE_URL}/movie?path=${encodeURIComponent(path)}`),
};
