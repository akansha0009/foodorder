import React, { useContext } from 'react'
import CartContext from '../store/CartContext'
import Modal from './Modal'
import UserProgressContext from '../store/UserProgressContext'
import { currencyFormatter } from '../utils/formationg'
import Input from './Input'
import Button from './Button'
import useHttp from '../hooks/useHtttp'
import Error from './Error'

const requestConfig = {
    method: 'POST',
    headers:{
        'Content-type' : 'application/json'
    },
}

const Checkout = () => {
    const cartCtx = useContext(CartContext)
    const userProgressCart = useContext(UserProgressContext)

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce(
        (totalPrice,item) => totalPrice + item.quantity * item.price,
        0
       )
    const handleCloseCheckout = () => {
        userProgressCart.hideCheckout()
    }

    const handleFinish = () => {
        userProgressCart.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        sendRequest(
            JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        )

        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers:{
        //         'Content-type' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //         order:{
        //             items: cartCtx.items,
        //             customer: customerData
        //         }
        //     })
        // }) 
    }

    let actions = (<>
            <Button onClick={handleCloseCheckout} type="button" textOnly>Close</Button>
            <Button>Submit Order</Button>
        </>)

    if(isSending){
        actions = <span>Sending Order Data...</span>
    }

    if(data && !error){
        return <Modal open={userProgressCart.progress === 'checkout'} onClose={handleCloseCheckout}>
            <h2>Success!</h2>
            <p>Your order was submitted succesfully.</p>
            <p>We will get back to you with the email within next few minutes.</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay!</Button>
            </p>
        </Modal>
    }

  return (
    <Modal open={userProgressCart.progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label='Full Name' type='text' id='name' />
            <Input label='Email' type='email' id='email' />
            <Input label='Street' type='text' id='street' />
            <div className='control-row'>
                <Input label='Postal Code' type='text' id='postal-code' />
                <Input label='City' type='text' id='city' />
            </div>
            {error && <Error title='Something went wrong...' message={error} />}
            <p className='modal-actions'> 
                {actions}
            </p>
        </form>
    </Modal>
  )
}

export default Checkout
