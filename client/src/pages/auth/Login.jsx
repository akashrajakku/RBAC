import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/admin/api";

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
    <div className="min-h-screen bg-gradient-to-r from-[#f0f4f8] to-[#d9e2ec] flex items-center justify-center">

      <div className="relative">
       
        <div
          className="relative bg-white/80 rounded-3xl shadow-2xl w-full max-w-md mx-auto p-10 space-y-6 hover:shadow-3xl transition-all duration-300"
        >
          <div className="text-center space-y-2">
            <div className="flex justify-center">
            </div>
            <h2 className="text-3xl font-bold ">
              Welcome <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent">Admin</span>
            </h2>
            <p className="text-gray-600">Signin to your Account</p>
          </div>

          <div className="relative group">
            {/*<label htmlFor="email" className="block text-md font-medium text-black mb-1">Email</label>*/}
            <input
              id="email"
              placeholder="Enter your email"
              className={`w-full pl-12 pr-4 py-4 border border-purple-600 rounded-2xl backdrop-blur-sm transition-all duration-200 focus:outline-none`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
            />
          </div>

          <div className="relative group">
            {/*<label htmlFor="password" className="block text-md font-medium text-black mb-1">Password</label>*/}
            <input
              id="password"
              placeholder="Enter your password"
              className={`w-full pl-12 pr-4 py-4 border border-purple-600 rounded-2xl backdrop-blur-sm transition-all duration-200 focus:outline-none`}
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
            className="w-full bg-purple-600 hover:bg-purple-700 border border-white  font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none  active:scale-[0.98] hover:cursor-pointer"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Sign In</span>
            </span>
          </button> 

          <button
            className="w-full text-center text-black transition-colors duration-200 text-sm font-medium"
          >
            Do not have an account?
            <span className="text-purple-600 hover:text-purple-700 ml-1 underline decoration-2 underline-offset-2 hover:cursor-pointer" onClick={handleSignup}>
              Sign up here
            </span>
          </button>

          <p className="text-center text-black transition-colors duration-200 text-md font-medium">Not an Admin ? <span className="font-bold text-purple-600 hover:text-purple-700 underline decoration-2 hover:cursor-pointer" onClick={usersClickHandler}>Visit Here</span></p>

        </div>
        
      </div>
    </div>
  );
};

export default Login;
