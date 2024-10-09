import React, { useEffect, useState } from 'react'
import MealItem from './MealItem'
import useHttp from '../hooks/useHtttp'
import Error from './Error'

const requestConfig = {}

const Meals = () => { 

    const {data : loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])
    console.log('loaded', isLoading)

    if(isLoading){
      return <p className='center'>Loading Meals...</p>
    }

    if(error){
      return <Error className='center' title='invalid to fetch meals' message={error} />
    }

  return (
    <>
    <ul id='meals'>
      {loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
    </>
  )
}

export default Meals
