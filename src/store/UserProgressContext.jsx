import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart' 'checkout'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}

})

export function UserProgressContextProvider({children}){
    const [userProgree, setUSerProgress] = useState('');

    function showCart(){
        setUSerProgress('cart')
    }

    function hideCart(){
        setUSerProgress(' ')
    }

    function showCheckout(){
        setUSerProgress('checkout')
    }

    function hideCheckout(){
        setUSerProgress(' ')
    }

    const userProgressCtx = {
        progress: userProgree,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return(
        <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
    )
}

export default UserProgressContext;