import { useState } from "react";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import { usersAuth } from "../services/api";

function UsersAuthCard() {
  const [authModal, setAuthModal] = useState("");
  const [email, setEmail] = useState("")
  const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userAuthHandler = async () => {
    if (authModal === "exists") {
        //login-logic
    } else if (authModal === "absent") {
        //logic to set password
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
    <div className="bg-black h-screen px-4">

      <div className="grid grid-cols-2 h-full">

        <div className="h-full">
          <img
            src="/userauthimage.jpg"
            alt="User authentication"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center items-center">

          <div className="bg-black border border-gray-700 rounded-2xl p-14 text-white shadow-xl w-[70%] h-[50%]">
            <Heading label="Enter Your Email:" />
            <Input label="Email" placeholder="e.g. abc@gmail.com" textColor="white" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (authModal === "not found") setAuthModal("");
              }} />

            {authModal === "exists" && <Input label="Password" placeholder="enter password here" textColor="white" />}
            {authModal === "absent" && <Input label="Password" placeholder="set your password" textColor="white" />}
            {authModal === "not found" && <p className="border border-gray-600 text-center px-1.5 py-2 font-medium w-[70%] ml-16 text-gray-400 rounded-xl">User not found. Contact your admin.</p>}

            <button
              className={`hover:cursor-pointer mt-4 ml-2 px-6 py-2 border rounded-lg transition duration-300 hover:scale-105 ${authModal === "not found" ? "bg-gray-700 cursor-not-allowed" : "bg-black hover:bg-gray-900 cursor-pointer"}text-white`}
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
