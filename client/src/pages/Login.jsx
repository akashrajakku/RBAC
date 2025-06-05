import React from "react";
import { Eye, EyeOff, User, Mail, Lock, Sparkles } from 'lucide-react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [focusedField, setFocusedField] = useState('');

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  }



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userLogin(formData);
    console.log(res);

    if (res.data.success) {
      setFormData({
        email: "",
        password: "",
      });
      navigate('/welcome');
    } else {
      alert()
    }
  };

  const usersClickHandler = () => {
    navigate('/users/auth');
  }


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="relative">
        {/* Main form container */}
        <div
          className="relative bg-black backdrop-blur-xl border border-white text-white rounded-3xl shadow-2xl w-full max-w-md mx-auto p-8 space-y-6 hover:shadow-3xl transition-all duration-300"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
            </div>
            <h2 className="text-3xl font-bold text-white">
              Welcome Admin
            </h2>
            <p className="text-gray-400">Signin to your Account</p>
          </div>

          {/* Email field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            </div>
            <input
              placeholder="Enter your email"
              className={`w-full pl-12 pr-4 py-4 border rounded-2xl bg-black backdrop-blur-sm transition-all duration-200 focus:outline-none`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            </div>
            <input
              placeholder="Enter your password"
              className={`w-full pl-12 pr-4 py-4 border rounded-2xl bg-black backdrop-blur-sm transition-all duration-200 focus:outline-none`}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-black border border-white text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none  active:scale-[0.98]"
          >
            <span className="flex items-center justify-center space-x-2 hover:cursor-pointer">
              <span>Sign In</span>
            </span>
          </button>

          <button
            className="w-full text-center py-3 px-4 text-gray-300 hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
          >
            Do not have an account?
            <span className="text-gray-200 hover:text-gray-100 ml-1 underline decoration-2 underline-offset-2 hover:cursor-pointer" onClick={handleSignup}>
              Sign up here
            </span>
          </button>

          <p className="text-center py-3 px-4 text-gray-300 hover:text-gray-200 transition-colors duration-200 text-sm font-medium">Not an Admin ? <span className="font-bold text-gray-200 hover:text-gray-100 underline decoration-2 hover:cursor-pointer" onClick={usersClickHandler}>Visit Here</span></p>

        </div>
        
      </div>
    </div>
  );
};

export default Login;
