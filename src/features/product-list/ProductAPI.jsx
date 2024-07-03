export const fetchAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log("error: ", error);
  }
  // return new Promise(async (resolve) => {
  //   // we will not hard-code server URL here
  //   const response = await fetch("http://localhost:8080/products");
  //   const data = await response.json();
  //   resolve({data});
  // });
};
