import { wait } from "@testing-library/user-event/dist/utils";

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

export const fetchProductsByFilter = async (filter, sort) => {
  console.log("filter: ", filter);
  // filter = {category:["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // TODO:on server we will support multiple values
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    console.log("categoryValues: ", categoryValues);

    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      console.log("lastCategoryValue: ", lastCategoryValue);
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log("error: ", error);
  }
};
