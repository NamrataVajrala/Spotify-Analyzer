import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './search.css';

function LogoutButton() {
    let history = useNavigate();
  
    function handleClick() {
      axios.post('https://diversify-server.herokuapp.com/api/logout', {
      }).then(() => {
          alert("Sign out successful!");
          history("/login");
      }).catch((err) => {
          alert("Sign out failed!");
          console.log(err);
      });
    }
  
    return (
      <button type="button" className="search-logout" onClick={handleClick}>
        Logout
      </button>
    );
}

export default LogoutButton;