import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({children, open, className='', onClose}) => {
    const dialog = useRef()

    useEffect(() => {
        if(open){
            dialog.current.showModal()
        }

        return () => dialog.current.close()
    }, [open])
  return (
    <div>
      {createPortal(<dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>, document.getElementById('modal'))}
    </div>
  )
}

export default Modal
