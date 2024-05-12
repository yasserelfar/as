import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import './Pay.css';
import './Res.css';
import payimg from './img/pay.png';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    cardName: Yup.string().required('Card Name is required'),
    cardNumber: Yup.string().required('Card Number is required'),
    expMonth: Yup.number().required('Expiration Month is required'),
    expYear: Yup.number().required('Expiration Year is required').min(2024, 'Expiration Year must be at least 2024'),
    cvv: Yup.string().required('CVV is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
});

const Pay = () => {
    const token = Cookies.get("token");

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            address: '',
            city: '',
            cardName: '',
            cardNumber: '',
            expMonth: '',
            expYear: '',
            cvv: '',
            phoneNumber: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, event) => {
            event.preventDefault(); // Prevent default form submission
            console.log("Form submitted with values:", values);

            fetch('http://localhost:3000/api/orders/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Set Content-Type header
                },
                body: JSON.stringify(values),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create order');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Order created successfully:", data);
                    console.log("Order done");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
    });

    const [totalCart, setTotalCart] = useState({ totalAmount: 0 });

    useEffect(() => {
        fetch('http://localhost:3000/api/cart/totalAmount', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch total cart amount');
                }
                return response.json();
            })
            .then(data => {
                setTotalCart(data);
            })
            .catch(error => {
                console.error('Error fetching total cart amount:', error);
            });
    }, [token]);

    return (
        <div className="paymentCont">
            <form action="" className="paymentForm" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <h3>Billing Address</h3>
                        <div className="inbox">
                            <label htmlFor="fullName"> Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="Your name"
                            />
                            <div className="error">
                                {formik.touched.fullName && formik.errors.fullName}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="email"> Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="example@gmail.com"
                            />
                            <div className="error">
                                {formik.touched.email && formik.errors.email}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="street-building"
                            />
                            <div className="error">
                                {formik.touched.address && formik.errors.address}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="city"> City</label>
                            <input
                                type="text"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="Your City"
                            />
                            <div className="error">
                                {formik.touched.city && formik.errors.city}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="phoneNumber"> Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="Your Phone Number"
                            />
                            <div className="error">
                                {formik.touched.phoneNumber && formik.errors.phoneNumber}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="total">Total Price</label>
                            <input
                                type="number"
                                name="total"
                                placeholder="Total"
                                value={totalCart.totalAmount && totalCart.totalAmount}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col">
                        <h3>Payment</h3>
                        <div className="inbox">
                            <label> Accepted Cards</label>
                            <img src={payimg} alt="" />
                        </div>
                        <div className="inbox">
                            <label htmlFor="cardName">Name on Card</label>
                            <input
                                type="text"
                                name="cardName"
                                value={formik.values.cardName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="Your Name"
                            />
                            <div className="error">
                                {formik.touched.cardName && formik.errors.cardName}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="cardNumber">
                                Credit Card Number
                            </label>
                            <input
                                type="number"
                                name="cardNumber"
                                value={formik.values.cardNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="1111 2222 3333 4444"
                            />
                            <div className="error">
                                {formik.touched.cardNumber && formik.errors.cardNumber}
                            </div>
                        </div>
                        <div className="inbox">
                            <label htmlFor="expMonth">Exp. month</label>
                            <input
                                type="number"
                                name="expMonth"
                                value={formik.values.expMonth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                placeholder="06"
                                max="12"
                                min="1"
                            />
                            <div className="error">
                                {formik.touched.expMonth && formik.errors.expMonth}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="inbox">
                                <label htmlFor="expYear">Exp. Year</label>
                                <input
                                    type="number"
                                    name="expYear"
                                    value={formik.values.expYear}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    placeholder="2024"
                                    min="2024"
                                />
                                <div className="error">
                                    {formik.touched.expYear && formik.errors.expYear}
                                </div>
                            </div>
                            <div className="inbox">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="number"
                                    name="cvv"
                                    value={formik.values.cvv}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    placeholder="123"
                                />
                                <div className="error">
                                    {formik.touched.cvv && formik.errors.cvv}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit">Pay</button>
            </form>
        </div>
    );
}

export default Pay;
