export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});

export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const updateCart = (cartItems) => ({
  type: "UPDATE_CART",
  payload: cartItems,
});
