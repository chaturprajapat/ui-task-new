
import React, { useEffect, useState } from 'react';
import axios from 'axios';import { useNavigate } from 'react-router-dom';
 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validation, setValidation] = useState({usernameError:'',passwordError:''});

  const tokenData = sessionStorage?.getItem('token');
  const [sessionToken ,setSessionToken] = useState(tokenData);

  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const validateUserNameAndPassword = (userName:string, password:string)=>{
    if(userName==='' && password===''){
      setValidation({usernameError:'username is required',passwordError:'password is required'})
      return true
    }
    else if(userName===''){
      setValidation({passwordError:'',usernameError:'username is required'})
      return true
    }
    else if(password===''){
      setValidation({usernameError:'',passwordError:'password is required'})
      return true
    }else{
      setValidation({usernameError:'',passwordError:''})
      return false
    }
  }

  const handleLogin = async () => {

    try {

      const validationErrors = validateUserNameAndPassword(username, password)
      console.log('validationErrors',validationErrors);
      if(validationErrors){
        return 
      }


      axios.post('https://dummyjson.com/auth/login',
        {
          username: username,
          password: password
        }
        ).then((response)=>{

          const token = response.data.token;

          sessionStorage.setItem('token', token);

          //set token exprie time - 5 minutes
          setTimeout(() => {
            sessionStorage.removeItem('token');
          }, 5 * 60 * 1000);

          navigate("/products");
        }).catch((error)=>{
          console.log(error);
          const errors = error?.response?.data?.message
          setError(errors);
        })
    } catch (error) {

    }
  };

  useEffect(() => {
    if (sessionToken!==null){
       return navigate("/products");
    }
 },[])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md px-5 py-10 bg-white rounded rounded-lg w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUsername(e.target.value)}
              />
              {validation.usernameError!==''? <p className="mt-2 text-sm text-red-600 dark:text-red-500">username is required</p>:null}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              {validation.passwordError!==''?<p className="mt-2 text-sm text-red-600 dark:text-red-500">password is required</p>:null}
            </div>
          </div>
          {error ? <div className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              Invalid Credentials.
            </div>:  null}
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
