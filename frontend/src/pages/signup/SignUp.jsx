import React from 'react'
import GenderCheckbox from './GenderCheckBox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='h-full w-full p-10  bg-white-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-gray-300 '>
            <span>
              SignUp
            </span>
        </h1>


        <form>
            
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
          <input type="text" 
                  placeholder="Enter your full name" 
                  className="input input-bordered input-success w-full max-w-xs" 
          />
          </div> 
          
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
          <input type="text" 
                  placeholder="Enter your username" 
                  className="input input-bordered input-success w-full max-w-xs" 
          />
          </div> 
          

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password </span>
            </label>
          <input type="password" 
                  placeholder="Enter your password" 
                  className="input input-bordered input-success w-full max-w-xs" 
          />
          </div> 


          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password </span>
            </label>
          <input type="password" 
                  placeholder="Enter your password again" 
                  className="input input-bordered input-success w-full max-w-xs" 
          />
          </div> 

            <GenderCheckbox />


          <a href="#" className='text-lg hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Alredy "} have an account?
          </a>

          <div>
              <button className="btn glass btn-wide mt-2 bg-color-black">SignUp </button>
          </div>


          </form>
      
      </div>
    </div>
  )
}

export default SignUp