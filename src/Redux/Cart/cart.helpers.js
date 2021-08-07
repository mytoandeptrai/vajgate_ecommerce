export const handleExistingCartItem = ({ prevCartItems, nextCartItems }) => {
  return prevCartItems.find((cartItem) => cartItem._id === nextCartItems._id);
};

export const TotalPriceOfCarts = (cartItems) => {
  const itemPrice =
    cartItems.length === 0
      ? 0
      : cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const taxPrice = itemPrice * 0.1;
  const shippingPrice = itemPrice > 2000 ? 0 : 50;
  const totalPrice =
    cartItems.length === 0 ? 0 : itemPrice + shippingPrice + taxPrice;
  return totalPrice;
};

export const handleAddToCart = ({ prevCartItems, nextCartItems }) => {
  const quantityIncrement = 1;
  const cartItemExisting = handleExistingCartItem({
    prevCartItems,
    nextCartItems,
  });

  if (cartItemExisting) {
    return prevCartItems.map((cartItem) =>
      cartItem._id === nextCartItems._id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }

  const newCartItem = [
    ...prevCartItems,
    {
      ...nextCartItems,
      quantity: quantityIncrement,
    },
  ];
  localStorage.setItem("cartItems", JSON.stringify(newCartItem));

  return newCartItem;
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem._id === cartItemToReduce._id
  );

  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      (cartItem) => cartItem._id !== existingCartItem._id
    );
  }

  const newCartItem = prevCartItems.map((cartItem) =>
    cartItem._id === existingCartItem._id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );

  localStorage.setItem("cartItems", JSON.stringify(newCartItem));
  return newCartItem;
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  const newCartItem = prevCartItems.filter(
    (item) => item._id !== cartItemToRemove._id
  );
  localStorage.setItem("cartItems", JSON.stringify(newCartItem));
  return newCartItem;
};
