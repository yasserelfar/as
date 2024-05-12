import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './SignIn.css';
import './Res.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

function SignIn() {
    const navigate = useNavigate();

    return (
        <section className="Logincontainer">
            <div className="form-login">
                <header>Login</header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={
                        async (values, { setSubmitting }) => {
                        setSubmitting(false);
                        await axios.post(`http://localhost:3000/api/users/login`, values).then((res) => {
                            console.log(res); // Log the entire response
                            if (res.data.isAdmin)
                            {
                                Cookies.set('token', res.data.token, { expires: 1 }); // Save the token in cookies
                                toast.success("Login Successfully");
                                navigate("/DashBored");
                            }
                            else {
                                Cookies.set('token', res.data.token, { expires: 1 }); // Save the token in cookies
                                toast.success("Login Successfully");
                                navigate("/");
                           }

                        }).catch((error) => {
                            try {
                                toast.error(error.response.data.message);
                            } catch (error) {
                                toast.error(error.message);
                            }
                        })
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='SignInform'>
                            <div className="field">
                                <Field type="email" name="email" placeholder="Email" />
                            </div>
                            <div className="field">
                                <Field type="password" name="password" placeholder="password" />
                                <i className="bx bx-hide eye-icon"></i>
                            </div>
                            <div className="field">
                                <button type="submit" disabled={isSubmitting} className="normal">
                                    {isSubmitting ? 'Submitting...' : 'Login'}
                                </button>
                            </div>
                            <div className="sign-link">
                                <Link to="/signup" className="forgot">
                                    Don&apos;t have an Account
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default SignIn;