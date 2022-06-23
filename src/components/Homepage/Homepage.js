import "./Homepage.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Reducer/AuthReducer";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
import { Button } from 'primereact/button';
export function Homepage() {
  const { stateAuth } = useAuth();
  const { isUserAuthenticated } = stateAuth;
  return isUserAuthenticated ? (
    <div className="homepage">
      <p style={{fontFamily: 'cursive',width:'60%'}}>Traveler is a <span className="videoLibrary">video library</span> which lets everyone experience how soul filling it is out there, takes us to some amazing places, inspires us to travel and teaches us how important it is for homosapiens to dwel into the lap of mother nature from time to time.</p>
      <div className="homepage-buttons-outer">
        <Link style={{textDecoration:'none'}} to="/explore">
          {/* <button className="homepage-single-button">Explore</button>
           */}
        <Button className="homepage-single-button"   label="Explore" aria-label="Explore"  />

        </Link>
      </div>
    </div>
  ) : (
    <div className="homepage">
      <p style={{fontFamily: 'cursive',width:'60%'}}>Traveler is a <span className="videoLibrary">video library</span> which lets everyone experience how soul filling it is out there, takes us to some amazing places, inspires us to travel and teaches us how important it is for homosapiens to dwel into the lap of mother nature from time to time.</p>
      <div className="homepage-buttons-outer">
        <Link style={{textDecoration:'none'}} to="/explore">
        <Button className="homepage-single-button"   label="Explore" aria-label="Explore"  />
          {/* <button className="homepage-single-button">Explore</button> */}
        </Link>
        <Link style={{textDecoration:'none'}} to="/login">
        <Button  className="homepage-single-button" label="Sign In" aria-label="Sign In"  />
          {/* <button className="homepage-single-button">Sign In</button> */}
        </Link>
      </div>
    </div>
  );
}
