import { useState, useEffect } from 'react';
import './Shop.css';
import './Res.css'
import Cookies from 'js-cookie';
const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            
            }
            )
            .catch(error => console.error('Error fetching products:', error));
        
    }, []);

    return (

        <section id="product1" className="section-p1">
            <div className="pro-cont">
                {products.map(product => (


                    <div className="pro" key={product.id} id={`product${product.id}`}>
                        
                        <img src={product.img} alt={product.name} onClick={() => { window.location.href = `/productdetails/${product.id}` }} />
                        <div className="des">

                            <h5>{product.name}</h5>
                            <h4>{product.price}LE</h4>
                        </div>
                        <button onClick={() => addToCart(product.id)}><i className="fas fa-cart-plus cart"></i></button>
                    </div>

                ))}
            </div>
        </section>

    );
}

const addToCart = async (id) => {
    try {
        const token = Cookies.get("token");

        

        const response = await fetch(`http://localhost:3000/api/cart/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: id,
                quantity: 1
            }),
        });

        console.log('Response:', response);

        if (response.ok) {
            console.log(`Product with id ${id} added to cart successfully.`);
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add product to cart.');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};

export default Shop;