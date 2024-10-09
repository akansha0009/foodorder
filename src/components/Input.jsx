import React from 'react'

const Input = ({label, id, type, ...props}) => {
  return (
    <p className='control'>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required {...props} />
    </p>
  )
}

export default Input
