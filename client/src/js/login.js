import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/authProvider';
import '../css/login.css';

export default function LoginCard() {

  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setRole, setToken } = useContext(AuthContext);

  useEffect(async () => {
    if (location.state !== null)
      setEmail(location.state);
  }, [])

  const notify = () => toast.success('Logged in successfully');

  const login = async (props) => {
    props.preventDefault();

    try {
      const res = await axios.post('/login', JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false
      });
      
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('role', res.data.user.role);
      setRole(res.data.user.role);
      setToken(res.data.token);

      setEmail('');
      setPassword('');
      navigate('/dashboard/viewBooks');
      notify();
    }
    catch (e) {
      toast.error("Invalid email or password");
      console.log(e.response);
    }

  }

  return (
    <>
      <div className="wrapper">

        <form onSubmit={login}>
          <div className="field">
            <input type="email" id='email' autoComplete='off'
              onChange={(e) => setEmail(e.target.value)} value={email} required />
            <label htmlFor='email'>Email Address</label>
          </div>
          <div className="field">
            <input type="password" id='password' autoComplete='off'
              onChange={(e) => setPassword(e.target.value)} value={password} required />
            <label htmlFor='password'>Password</label>
          </div>
          
          <div className="field">
            <input type="submit" value="Login" className='loginBtn' />
          </div>
          <div className="signup-link">Not a member? <Link to="/signup">&nbsp;Signup now</Link></div>
        </form>
      </div>
    </>
  );
}