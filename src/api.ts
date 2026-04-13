import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const generatePath = async (payload: {
  topic: string;
  level: string;
  duration: number;
}) => {
  const response = await api.post("/generate", payload);
  return response.data;   // 🔥 RETURN DATA DIRECTLY
};

