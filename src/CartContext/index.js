import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItemIntoCart: () => {},
  updateQunatity: () => {},
})

export default CartContext
