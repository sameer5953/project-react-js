import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import app from './Firebase/Firebase'
import swal from 'sweetalert'
import { usersRef } from './Firebase/Firebase'
import { addDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import bycrpt from 'bcryptjs'
import { upload } from '@testing-library/user-event/dist/upload'
import { Password } from '@mui/icons-material'



const auth = getAuth(app);


function Signup() {
    const navigate= useNavigate();

    const[form ,setForm]=useState({
        name:"",
        mobile:"",
        password:" "
    })
    const[loading,Setloading] =useState(false);
    const[otpSent,setotpSent] =useState(false);
    const[OTP,setOTP] =useState("");
    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier( auth,'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            
          }
        }, auth);
      }
    
      const requestOtp = () => {
        Setloading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
              text: "OTP Sent",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setotpSent(true);
            Setloading(false);
          }).catch((error) => {
            console.log(error)
          })
    }

    
        const verifyOTP = () => {
            try {
              Setloading(true);
              window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                  text: "Sucessfully Registered",
                  icon: "success",
                  buttons: false,
                  timer: 3000,
                  
                });
                navigate('/login')
                Setloading(false);
            })
    }catch(error){
        console.log(error)
    }
}
    const uploadData =  async()=>{
        
    const salt =bycrpt.genSaltSync(10);
    var hash =bycrpt.hashSync(form.password,salt);
      await addDoc(usersRef,{

        name: form.name,
        password: hash,
        mobile: form.mobile
      });
    }
    

  return (
    
<div className="w-full flex flex-col mt-8 items-center">
<h1 className="text-xl font-bold">Sign up</h1>
    {
    otpSent?
      <>
<div class="p-2 w-full md:w-1/3">
  
  <div class="relative">
    <label for="message" class="leading-7 text-sm text-gray-300">
      OTP
    </label>
    <input
      
      id="message"
      name="message"
      value={OTP}
      onChange={(e) => setOTP( e.target.value )}
      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
  </div>

</div>
<div class="p-2 w-full">
        <button
        onClick={verifyOTP}
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
     {loading ? <TailSpin height={25} color="white" /> : "Confirm otp"}
        </button>
        
    
      </div>

   </>
      :
    <>
      
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Name
          </label>
          <input
            id="message"
            name="message"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
  
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type={"number"}
            id="message"
            name="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
         
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button
        onClick={requestOtp}
        
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Request Otp"}
        </button>
        
    
      </div>
      </>
    }
     
      <div>
        <p>Already have an account? <Link to={'/login'}><span className="text-blue-500">Login</span></Link></p>
      </div>
      <div id="recaptcha-container"></div>

    </div>
  );

}
export default Signup