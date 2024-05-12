import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './SignIn.css';
import './Res.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

function SignUp() {
    return (
        <section className="Logincontainer">
            <div className="form-login">
                <div className="form-content">
                    <header>SignUp</header>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(false);
                            await axios.post(`http://localhost:3000/api/users/adduser`, values).then(() => {
                                Navigate("/login")
                                toast.success("SignUp Successfully");
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
                                    <Field type="text" name="username" placeholder="User Name" />
                                </div>
                                <div className="field">
                                    <Field type="email" name="email" placeholder="Email" />
                                </div>
                                <div className="field">
                                    <Field type="password" name="password" placeholder="password" />
                                    <i className="bx bx-hide eye-icon"></i>
                                </div>
                                <div className="field">
                                    <Field type="password" name="confirmPassword" placeholder="Confirm password" />
                                    <i className="bx bx-hide eye-icon"></i>
                                </div>
                                <div className="field">
                                    <button type="submit" disabled={isSubmitting} className="normal" >
                                        {isSubmitting ? 'Submitting...' : 'Signup'}
                                    </button>
                                </div>
                                <div className="sign-link">
                                    <Link to="/login" className="forgot">
                                        Already have Account?<strong> Login</strong>
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
}

export default SignUp;