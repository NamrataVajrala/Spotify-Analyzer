import { useNavigate } from "react-router-dom";
import './search.css';

function HomeButton() {
    let history = useNavigate();
  
    function handleClick() {
      history("/welcome");
    }
  
    return (
      <button type="button" className="search-home" onClick={handleClick}>
        Home
      </button>
    );
}

export default HomeButton;