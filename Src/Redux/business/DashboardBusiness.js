export function generateStoreList(completeList, selectedLocationId) {
  let storeList = [];
  if (completeList.length > 0) {
    for (i = 0; i < completeList.length; i++) {
      if (completeList[i].id == selectedLocationId) {
        storeList = completeList[i].store;
      }
    }
    return storeList;
  } else {
    return [];
  }
}
export function assignToCart(cartList, itemForCart) {
  let localCartList = cartList;

  if (localCartList.length != 0) {
    let findIndex = localCartList.findIndex((o) => o.id == itemForCart.id);
    if (findIndex != -1) {
      localCartList.map((item, index) => {
        if (index == findIndex) {
          item.numberOfItem = item.numberOfItem + 1;
        }
      });
    } else {
      localCartList.push({ ...itemForCart, numberOfItem: 1 });
    }
  } else {
    localCartList.push({ ...itemForCart, numberOfItem: 1 });
  }
  return localCartList;
}
export function assignToWishlist(wishList, itemForWishlist) {
  let localWishList = wishList;

  if (localWishList.length != 0) {
    let findIndex = localWishList.findIndex((o) => o.productId == itemForWishlist.productId);
    if (findIndex != -1) {
      localWishList.map((item, index) => {
        if (index == findIndex) {
          item.numberOfItem = item.numberOfItem + 1;
        }
      });
    } else {
      localWishList.push({ ...itemForWishlist, numberOfItem: 1 });
    }
  } else {
    localWishList.push({ ...itemForWishlist, numberOfItem: 1 });
  }
  return localWishList;
}
export function assignToResentView(resentView, itemForWishlist) {
  let localResentView = resentView;
  if (localResentView.length != 0) {
    let findIndex = localResentView.findIndex((o) => o.productId == itemForWishlist.productId);
    if (findIndex != -1) {
      localResentView.map((item, index) => {
        if (index == findIndex) {
          console.log('already added')
          // item.numberOfItem = item.numberOfItem + 1;
        }
      });
    } else {
      localResentView.push({ ...itemForWishlist });
    }
  } else {
    localResentView.push({ ...itemForWishlist });
  }
  return checklistResentView(localResentView);
}
function checklistResentView(localResentView) {
  if (localResentView.length > 10) {
    let local = localResentView.slice(1)
    return local
  } else {
    return localResentView
  }
}
export function updateHomeItem(listForUpdate, prvHomeList) {
  let tempListForUpdate = listForUpdate;
  //	debugger
  if (
    tempListForUpdate.section !== undefined &&
    tempListForUpdate.section.length !== 0
  ) {
    if (
      prvHomeList !== undefined &&
      prvHomeList.section !== undefined &&
      prvHomeList.section.length != 0
    ) {
      if (tempListForUpdate.section.length != 0) {
        tempListForUpdate.section.map((pItem, index) => {
          if (pItem.section_type === 'Offer') {
          } else {
            pItem.products.map((cItem, i) => {
              cItem.isAddedToCart =
                prvHomeList.section[index].products[i].isAddedToCart;
            });
          }
        });
      }
    } else {
      if (tempListForUpdate.section.length != 0) {
        tempListForUpdate.section.map((pItem, index) => {
          if (pItem.section_type === 'Offer') {
          } else {
            pItem.products.map((cItem, i) => {
              cItem.isAddedToCart = false;
            });
          }
        });
      }
    }
  }
  //	debugger
  if (
    tempListForUpdate.product !== undefined &&
    tempListForUpdate.product !== '' &&
    tempListForUpdate.product.length !== 0
  ) {
    if (
      prvHomeList !== undefined &&
      prvHomeList.product !== undefined &&
      prvHomeList.product.length != 0
    ) {
      if (tempListForUpdate.product.length != 0) {
        tempListForUpdate.product.map((pItem, index) => {
          pItem.isAddedToCart = prvHomeList.product[index].isAddedToCart;
        });
      }
    } else {
      if (tempListForUpdate.product.length != 0) {
        tempListForUpdate.product.map((pItem, index) => {
          pItem.isAddedToCart = false;
        });
      }
    }
  }

  return tempListForUpdate;
}
export function updateHomeAddToCart(cItemi, cIndex, pIndex, homeList) {
  //	debugger
  let tempListForUpdate = homeList;
  if (
    tempListForUpdate.section !== undefined &&
    tempListForUpdate.section.length != 0
  ) {
    tempListForUpdate.section.map((pItem, index) => {
      if (index === pIndex) {
        pItem.products.map((cItem, i) => {
          if (cIndex == i) {
            cItem.isAddedToCart = !cItemi.isAddedToCart;
          }
        });
      }
    });
  }
  if (
    tempListForUpdate.product !== undefined &&
    tempListForUpdate.product.length != 0
  ) {
    tempListForUpdate.product.map((pItem, index) => {
      if (index === cIndex) {
        pItem.isAddedToCart = !cItemi.isAddedToCart;
      }
    });
  }
  return tempListForUpdate;
}
