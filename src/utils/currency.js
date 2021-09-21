export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function calculateSubTotal(productList) {
  let subTotal = 0;

  productList.forEach((product) => {
    subTotal +=
      parseFloat(product.price) *
      ((100 - product.discount) / 100) *
      parseInt(product.numberInCart);
  });

  return subTotal;
}
