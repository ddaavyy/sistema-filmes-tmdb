import axios from "axios";

const { VITE_TMDB_BASE_URL, VITE_TMDB_API_TOKEN } = import.meta.env;

export const api = axios.create({
  baseURL: VITE_TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`,
  },
  params: {
    language: "pt-BR",
  },
});
