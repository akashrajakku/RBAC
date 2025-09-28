import { useState } from "react";
import Heading from "../../components/ui/Heading";
import Input from "../../components/ui/Input";
import { usersAuth, usersLogin, usersSignup } from "../../services/common/api";
import { useNavigate } from "react-router-dom";

function UsersAuthCard() {
  const [authModal, setAuthModal] = useState("");
  const [email, setEmail] = useState("");
  const[password, setPassword]= useState("");
  const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const userAuthHandler = async () => {
    if (authModal === "exists") {
        const response = await usersLogin(email, password);
        if(response.data.success){
            alert(`Login Success`);
            console.log(response);
            navigate('/welcome');
        }else if(response.data.success === false){
            alert(`${response.data.message}`);
        }else{
          alert(`Error Logging In`)
        }
        
    } else if (authModal === "absent") {
       const response = await usersSignup(email, password);
        if(response.data.success){
            alert(`Successfully generated password`);
            navigate('/welcome');
        }else if(response.data.success === false){
            alert(`${response.data.message}`);
        }else{
          alert(`Error Singing up`)
        }
    } else {
      try {
        const response = await usersAuth(email);
        if (!email) {
          alert(`Email is required`);
          return;
        }

        if (!emailRegexPattern.test(email)) {
          alert(`Enter a valid email`);
        }

        const successCode = response.data.successCode;
        successCode === 0 ? setAuthModal("not found") :
          successCode === 1 ? setAuthModal("exists") :
            successCode === 2 ? setAuthModal("absent") : setAuthModal("");

      } catch (error) {
        console.log(`error: ${error}`)
      }

    }
  }

  return (
    <div className="bg-gradient-to-r from-[#f0f4f8] to-[#d9e2ec] h-screen">

      <div className="grid grid-cols-2 h-full">

        <div className="h-full">
          <img
            src="/userauthimage.jpg"
            alt="User authentication"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center">

          <div className="bg-white/80 border rounded-2xl p-14 text-white shadow-xl w-[70%] h-[50%]">
            <Heading label="Enter Your Email" textColor="purple-600"/>
            <Input label="Email" placeholder="e.g. abc@gmail.com" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (authModal === "not found") setAuthModal("");
              }} />

            {authModal === "exists" && <Input label="Password" placeholder="enter password here" value={password} onChange={(e)=> setPassword(e.target.value)}/>}

            {authModal === "absent" && <Input label="Password" placeholder="set your password" value={password} onChange={(e)=> setPassword(e.target.value)}/>}

            {authModal === "not found" && <p className=" text-center px-1.5 py-2 font-medium w-[70%] ml-16 text-red-400">User not found. Contact your admin.</p>}

            <button
              className={`text-white mt-4 ml-2 px-6 py-2 border rounded-lg transition duration-300 hover:scale-105 ${authModal === "not found"
                  ? "bg-red-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                }`}
              onClick={userAuthHandler}
              disabled={authModal === "not found"}
            >

              {authModal === "exists"
                ? "Log In"
                : authModal === "absent"
                  ? "Set Your Password"
                  : authModal === "not found"
                    ? "Access Denied"
                    : "Get Started"}
            </button>


          </div>

        </div>

      </div>
    </div>
  );
}

export default UsersAuthCard;
