import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Sparkles } from 'lucide-react';
import { userSignup } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function StylishSignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [focusedField, setFocusedField] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await userSignup(formData);
    console.log(res);
    if (res.data.success) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/");
    }else{
      alert(`${res.data.message.slice(24)}`)
    }
  };


  const siginHandler = ()=>{
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-150"></div>
      </div>

      <div className="relative">
        {/* Main form container */}
        <div
          className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-md mx-auto p-8 space-y-6 hover:shadow-3xl transition-all duration-300"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600">Join us and start your journey</p>
          </div>

          {/* Username field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className={`w-5 h-5 transition-colors duration-200 ${
                focusedField === 'username' ? 'text-purple-500' : 'text-gray-400'
              }`} />
            </div>
            <input
              placeholder="Enter your name"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 hover:border-purple-300 ${
                focusedField === 'username' ? 'border-purple-400 bg-white/70' : 'border-gray-200'
              }`}
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField('')}
            />
          </div>

          {/* Email field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`w-5 h-5 transition-colors duration-200 ${
                focusedField === 'email' ? 'text-purple-500' : 'text-gray-400'
              }`} />
            </div>
            <input
              placeholder="Enter your email"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 hover:border-purple-300 ${
                focusedField === 'email' ? 'border-purple-400 bg-white/70' : 'border-gray-200'
              }`}
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
                <User className={`w-5 h-5 transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-purple-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                placeholder="Enter your password"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 hover:border-purple-300 ${
                  focusedField === 'username' ? 'border-purple-400 bg-white/70' : 'border-gray-200'
                }`}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
              />
            </div>


          {/* Submit button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-200 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center space-x-2 hover:cursor-pointer">
              <span>Create Account</span>
              <Sparkles className="w-4 h-4" />
            </span>
          </button>

          {/* Login link */}
          <button
            className="w-full text-center py-3 px-4 text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
          >
            Already have an account? 
            <span className="text-purple-600 hover:text-purple-700 ml-1 underline decoration-2 underline-offset-2 hover:pointer" onClick={siginHandler}>
              Sign in here
            </span>
          </button>

          {/* Terms and conditions */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 animate-bounce delay-300"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-80 animate-bounce delay-700"></div>
      </div>
    </div>
  );
}

