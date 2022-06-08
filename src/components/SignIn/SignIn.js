import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GuestAccess, UserSignIn } from "../ApiCalls/ApiCalls";
import { useAuth } from "../Reducer/AuthReducer";
export function SignIn() {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState("none");
  const [loginButtonText, setLoginButtonText] = useState("Sign In");
  let userResponseFromServer;

  async function handleSubmit({ e, guest }) {
    e.preventDefault();
    setLoginButtonText("Signing In...");
    if (guest) {
      userResponseFromServer = await GuestAccess();
    } else {
      userResponseFromServer = await UserSignIn({
        userDetails: {
          username,
          password,
        },
      });
    }

    setLoginButtonText("Sign In");
    if (userResponseFromServer.allowUser === false) {
      setDisplayError("block");
    } else if (userResponseFromServer.allowUser === true) {
      dispatchAuth({
        type: "CHECK_IF_USER_AUTHENTICATED",
        payload: {
          status: true,
          token: userResponseFromServer.token,
        },
      });
      setDisplayError("none");
      navigate("/explore");
    }
  }
  async function guestLoginHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    await handleSubmit({ e, guest: true });
  }
  return (
    <form className="form" onSubmit={(e) => handleSubmit({ e })}>
      <div className="login-main">
        <h1 className="login-heading">Login</h1>
        <p
          className="error-message"
          style={{ display: displayError, color: "red" }}
        >
          Username or password is incorrect
        </p>
        <input
          className="input-field username"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="input-field password"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="login-button" value={loginButtonText} />
        <p>
          Don't have an account?{" "}
          <Link className="signup-link" to="/signup">
            Sign up
          </Link>
        </p>
        <button
          type="submit"
          className="guest-login"
          onClick={(e) => guestLoginHandler(e)}
        >
          Sign In as Guest
        </button>
      </div>
    </form>
  );
}
