import { useState, useEffect } from 'react';
import './Cart.css';
import Cookies from 'js-cookie';

function Cart() {
    const [products, setProductData] = useState([]); // Initialize with an empty array

    const handleDeleteItem = (itemId) => {
        const token = Cookies.get("token");

        fetch(`http://localhost:3000/api/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    // If the item is successfully deleted, you may want to update the cart data
                    console.log(response);
                    fetchCartData();
                } else {
                    console.error('Failed to delete item:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting item:', error));
    };


    const fetchCartData = () => {
        const token = Cookies.get("token");

        fetch(`http://localhost:3000/api/cart/items`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then(
                (data) => {
                    console.log(data)
                    setProductData(data)

                })
            .catch((error) => console.error('Error fetching product data:', error));
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <section id="cart" className="section-p1">
            <table width="100%">
                <thead>
                    <tr>
                        <td>Remove</td>
                        <td>Image</td>
                        <td>product Name</td>
                        <td>price</td>
                        <td>Quantity</td>
                        <td>Subtotal</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>
                                <button id='del'className='normal' onClick={() => handleDeleteItem(product.productId)}>
                                    Delete
                                </button>
                            </td>
                            <td><img src={product.image} alt="" /></td>
                            <td>{product.productName}</td>
                            <td>{product.price} LE</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    disabled
                                    name="quantity"
                                    id="count"
                                />
                            </td>
                            <td>{product.price * product.quantity} LE</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}



export default Cart;