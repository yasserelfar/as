import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
function CheckOut() {
    const navigate = useNavigate()
    const token = Cookies.get("token");
    let [totalCart, setTotalCart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/cart/totalAmount', {
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setTotalCart(data)

            }
            )
            .catch(error => console.error('Error fetching products:', error));

    }, [token]);

    return (
        <section id="cart-add" className="section-p1">
            <div id="coupon">
                <h3>Apply Coupon</h3>
                <div>
                    <input type="text" placeholder="Enter Your Coupon" />
                    <button className="normal">Apply</button>
                </div>
            </div>
            <div id="subtotal">
                <h3>Cart Totals</h3>
                <table>
                    <tr>
                        <td>Cart total</td>
                        <td>{totalCart.totalAmount }</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>70</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{totalCart.totalAmount && totalCart.totalAmount +70}LE</strong></td>
                    </tr>
                </table>

                <button className="normal" onClick={() => navigate('/payment')}>Checkout</button>
            </div>
        </section>
    )
}

export default CheckOut