import React, { useContext } from 'react'
import { currencyFormatter } from '../utils/formationg'
import Button from './Button'
import CartContext from '../store/CartContext'

const MealItem = ({meal}) => {
    const cartCtx = useContext(CartContext)
    const addMealToCart = () => {
        // console.log(meal)
        cartCtx.addItem(meal)
    }

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
            <h3>{meal.name}</h3>
            <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
            <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
            <Button onClick={addMealToCart}>Add To Cart</Button>
        </p>
      </article>
    </li>
  )
}

export default MealItem
