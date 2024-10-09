import { useContext } from 'react'
import Modal from './Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formationg'
import Button from './Button'
import UserProgressContext from '../store/UserProgressContext'

const Cart = () => {
   const cartCtx = useContext(CartContext)
   const userProgressCart = useContext(UserProgressContext)

   const cartTotal = cartCtx.items.reduce(
    (totalPrice,item) => totalPrice + item.quantity * item.price,
    0
   )

   function handleCloseCart(){
        userProgressCart.hideCart()
   }

   function handleCheckout(){
    // console.log('checkout', userProgressCart.progress)
    userProgressCart.showCheckout()
   }

  return (
    <Modal className='cart' open={userProgressCart.progress === 'cart'} >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => <li className='cart-item' key={item.id}>
            <p>{item.name} - {item.quantity}</p>
            <p className='cart-item-actions'>
                <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => cartCtx.addItem(item)}>+</button>
            </p>
        </li>)}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button onClick={handleCloseCart} textOnly>Close</Button>
        {cartCtx.items.length > 0 && <Button onClick={handleCheckout} >Go To Checkout</Button>}
      </p>
    </Modal>
  )
}

export default Cart
