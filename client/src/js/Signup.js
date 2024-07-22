import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function SignupCard() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const signup = async (props) => {
    props.preventDefault();
    try {
      const response = await axios.post('/signup', JSON.stringify({ name, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        });

      console.log("user created");
      console.log(response.data);
      toast.success('Registered successfully');
    }
    catch (e) {
      toast.error("Please fill all the details");
      console.log(e.response);
    }
    navigate('/login', { state: email });
  }

  return (
    <><div id="triangle-ups"></div>
      <div className="wrapper">
        <form onSubmit={signup}>
          <div className="field">
            <input type="text" id='name'
              autoComplete='off' onChange={(e) => setName(e.target.value)} required />
            <label htmlFor='name'>Name</label>
          </div>
          <div className="field">
            <input type="email" id='email'
              autoComplete='off' onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor='email'>Email Address</label>
          </div>
          <div className="field">
            <input type="password" id='password'
              autoComplete='off' onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor='password'>Password</label>
          </div>
          
          <div className="field">
            <input type="submit" value="Signup" className='signupBtn' />
          </div>
          <div className="signup-link">Already registered? <Link to="/login">&nbsp;Login now</Link></div>
        </form>
      </div>
    </>
  );
}