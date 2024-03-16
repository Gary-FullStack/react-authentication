import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import UserContext from '../context/UserContext';
import ThemeContext from '../context/ThemeContext';
import Errors from './Errors';

const UserSignIn = () => {

  const { actions } = useContext(UserContext);
  const { accentColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  // State
  const name = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
      event.preventDefault();

      const user = {
        name: name.current.value,
        username: username.current.value,
        password: password.current.value
      }
      
      try{      
        const response = await api("/users", "POST", user);
      if (response.status === 201) {
        console.log(`User ${user.username} has been created!`);

        await actions.signIn(user);
        navigate('/authenticated');      

      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors); 
            
      }else {
        throw new Error('An error occurred');
      }

    } catch (error){
      console.log(error);
      navigate('/error');
    }
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign up</h1>
        <div>
          <Errors errors={errors} />
          
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              ref={name}
              placeholder="Name" />
            <input
              id="username"
              name="username"
              type="text"
              ref={username}
              placeholder="User Name" />
            <input
              id="password"
              name="password"
              type="password"
              ref={password}
              placeholder="Password" />
            <div className="pad-bottom">
              <button className="button" type="submit" style={{ background: accentColor }}>Sign up</button>
              <button className="button button-secondary" style={{ color: accentColor }} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <p>
          Already have a user account? <Link style={{ color: accentColor }} to="/signin">Click here</Link> to sign in!
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;