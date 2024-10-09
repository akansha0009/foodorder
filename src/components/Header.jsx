import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

const Header = () => {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems += item.quantity
    }, 0)

    function handleShowCart(){
        userProgressCtx.showCart()
    }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} />
        <h1>FOOD APP</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header
