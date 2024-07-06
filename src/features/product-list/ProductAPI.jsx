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

export const fetchProductsByFilter = async (filter, sort, pagination) => {
  console.log("paginationinquery: ", pagination);
  console.log("filter: ", filter);
  // filter = {category:["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination=_page=1&_limit=10
  // TODO:on server we will support multiple values
  let queryString = "";
  console.log("queryString: ", queryString);

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

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count"); //write now this feature is not working we will see it with Our own server
    return { data: { products: data, totalItems: totalItems } };
  } catch (error) {
    console.log("error: ", error);
  }
};

// to fetch all the categories lists
export const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log("error: ", error);
  }
};

// to fetch all the brand lists
export const fetchBrands = async () => {
  try {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log("error: ", error);
  }
};
