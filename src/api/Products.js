

import axios from "axios";

export const saveProduct = async (formData) => {

    const res = await axios.post('http://localhost:8080/api/v1/product', formData);

    return res;
} 

export const findAllProducts = async () => {

    const res = await axios.get('http://localhost:8080/api/v1/product');

    return res;
}

export const updateProduct = async (code, formData) => {

    const res = await axios.put(`http://localhost:8080/api/v1/product/${code}`, formData);

    return res;
}

export const deleteProduct = async (code) => {

    const res = await axios.delete(`http://localhost:8080/api/v1/product/${code}`);

    return res;
}


