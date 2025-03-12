import React, { useState } from 'react';
import { Link } from 'react-router';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const {loading, login} = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-96 p-6 rounded-lg shadow-lg bg-gray-700'> 
        <h1 className='text-3xl font-semibold text-center text-white mb-4'>Login</h1>
        <form className='space-y-4 w-full' onSubmit={handleSubmit}>
          {/* Username */}
          <div className='flex flex-col'>
            <label htmlFor="username" className='text-white mb-1'>Username</label>
            <input 
              type="text" 
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='Enter your username'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='flex flex-col'>
            <label htmlFor="password" className='text-white mb-1'>Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              placeholder='Enter your password'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
            
            {loading ? <span className='loading loading-spinner'></span> : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4">
          <p className='text-white'>
            Don't have an account? <Link to={'/signup'} className='underline text-blue-400 hover:text-blue-300'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
