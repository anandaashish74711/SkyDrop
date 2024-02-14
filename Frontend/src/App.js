// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './Screens/login';
import Home from './Screens/home';
import Signup from './Screens/signup';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Layout>
        <Routes>
        <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        </Layout>
      </AuthProvider>
    </Router>
   
  );
}

export default App;
