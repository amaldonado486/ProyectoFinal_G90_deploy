import { KITS } from "../data/kits";

export async function getProducts() {
  return Promise.resolve(KITS);
}

export async function getProductById(id) {
  return Promise.resolve(KITS.find((k) => k.id === id));
}
