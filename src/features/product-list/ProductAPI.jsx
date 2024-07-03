export const fetchProducts = (count = 1) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    resolve(data);
  });
};
