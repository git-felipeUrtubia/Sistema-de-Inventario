import { useEffect, useState } from "react";
import { findAllProducts } from '../api/Products.js'

export const useProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        findAllProducts()
            .then(res => {
                setProducts(res.data);
            })
            .catch(error => {
                console.error("Error al cargar los productos:", error);
            });

    }, [])
    return { products };
}

