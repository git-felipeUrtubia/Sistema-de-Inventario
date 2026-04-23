import { createContext, useState } from "react";



export const ProductContext = createContext(undefined)

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    const addToArrayProducts = ( product ) => {
        setProducts(prev => {
            return [...prev, product]
        })
    }

    return (
        <ProductContext.Provider value={{
            addToArrayProducts, products
        }}>
            {children}
        </ProductContext.Provider>
    )

}

