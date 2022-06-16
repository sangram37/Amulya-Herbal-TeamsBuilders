export function generateImageLinks(list) {
  let imageLinks = [];
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      imageLinks.push(list[i].image);
    }
    return imageLinks;
  } else {
    return [];
  }
}
export function createItemForPlaceOrder(cartList, merchant_id) {
  let cartListLocal = [];

  cartList.map((item, index) => {
    let newObj = {
      id: item.id,
      numberOfItem: item.numberOfItem,
      productId: item.productId,

    };
    cartListLocal.push(newObj);
  });
  return cartListLocal;
}
export function createorderDetailsforPlaceorder(
  delivery_address,
  total_amount,
  order_date,
  user_id,
  payment_type,
  payment_id,
  payment_order_id,
) {
  let detailsorder = [
    {
      delivery_address: delivery_address,
      total_amount: total_amount,
      order_date: order_date,
      user_id: user_id,
      payment_type: payment_type,
      payment_id: payment_id,
      payment_order_id: payment_order_id,
    },
  ];


  return detailsorder;
}
export function getDiscountValue(params, item) {
  switch (item.discount_type) {
    case 'percentage':
      return ((item.discount_amount / 100) * params.order_amount).toFixed(2);
    case 'flat':
      return item.discount_amount;
  }
}
