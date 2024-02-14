import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/blinkit.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
const { login } = useAuth();

  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });


  const onSubmit = (values, { setSubmitting }) => {
    login(values.email, values.password)
      .then(() => {
        setSubmitting(false);
        navigate('/'); // navigate to home page
      }).catch(error => {
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-yellow-200">
      <div className="max-w-sm w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
       
        <div className="p-4  bg-white bg-opacity-75">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-2">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <Field type="email" name="email" className="form-input mt-1 block w-full border-gray-300 rounded-md border px-3 py-2" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <Field type="password" name="password" className="form-input mt-1 block w-full border-gray-300 rounded-md border px-3 py-2" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <button type="submit" className="w-full bg-green-500 m-2  text-black px-3 py-2 rounded-md mx-auto">
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-center mt-2">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <NavLink to="/signup" className="text-green-600 hover:underline">Create one</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
