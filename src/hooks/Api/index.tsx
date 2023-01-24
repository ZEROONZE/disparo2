import axios from "axios";

const api = axios.create({
  baseURL: "https://v5.chatpro.com.br/chatpro-ca5d05b09d/api/v1",
});

export default api;

export const token = "c9f4305b621bf0bc560045b3856266fd";
