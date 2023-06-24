export const SendToCart = (pro, num, comment = "") => {
  if (
    localStorage.getItem("cart") &&
    JSON.parse(localStorage.getItem("cart")).length !== 0
  ) {
    const localStorageProduct = JSON.parse(localStorage.getItem("cart"));
    const findProduct = localStorageProduct.find((ele) => ele.id === pro.id);
    if (findProduct) {
      findProduct.number += num;
      findProduct.comment = comment;
      localStorage.setItem("cart", JSON.stringify(localStorageProduct));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...localStorageProduct,
          { id: pro.id, number: num, comment: comment },
        ])
      );
    }
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ id: pro.id, number: num, comment: comment }])
    );
  }
};