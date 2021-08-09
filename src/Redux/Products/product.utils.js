export const handleFilterProductByPrice = ({ prevProductItems, price }) => {
  let product = [...prevProductItems];

  if (price === "Highest") {
    product.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (price === "Lowest") {
    product.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (price === "Rented") {
    product.sort((a, b) => Number(b.rented) - Number(a.rented));
  }
  return [...product];
};
