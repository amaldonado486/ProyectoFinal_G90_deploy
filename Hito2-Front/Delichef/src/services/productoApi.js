import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/kits`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/api/kits/${id}`);
  return res.json();
}
