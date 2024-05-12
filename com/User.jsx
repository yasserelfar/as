import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './User.css';
import './Res.css';
import { useContext,  } from 'react';
import { AppContext } from '../AppContext';
import axios from 'axios';


const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
};

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
});

function User() {
    let { userData, setUserData } = useContext(AppContext)
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.put('http://localhost:3000/api/users/update-user', values);
            setSubmitting(false);
            alert('Data updated successfully');
        } catch (error) {
            console.error('Failed to update user data', error);
            setSubmitting(false);
        }
    };  
    return (
        <section className="userCont">
            <div className="form-login">
                <header>Your Data</header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="userForm">
                            <div className="field">
                                <label htmlFor="first">User Name:</label>
                                <Field type="text" id="first" name="UserName" placeholder="User Name" value={userData.username} onChange={(e) => {
                                    setUserData({ ...userData, username: e.target.value })
                                }} />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email:</label>
                                <Field type="email" id="email" name="email" required placeholder="Email" value={userData.email} />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password:</label>
                                <Field type="password" id="password" name="password" placeholder="password" onChange={(e) => {
                                    setUserData({ ...userData, password: e.target.value })
                                }} />
                                <i className="bx bx-hide eye-icon"></i>
                            </div>
                            <div className="field">
                                <label htmlFor="confirm">Confirm Password:</label>
                                <Field type="password" id="confirm" name="confirm" placeholder="Confirm Password" />
                            </div>
                            <div className="field">
                                <button type="submit" disabled={isSubmitting} className="normal">
                                    {isSubmitting ? 'Submitting...' : 'Save'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default User;