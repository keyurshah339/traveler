import "./ProfileDetails.css";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../Reducer/AuthReducer";
import { GetAccountDetails, UpdateUserDetails } from "../ApiCalls/ApiCalls";
import { SetLoader } from "../Loader/Loader";
import { TopLoadingBar } from "../TopLoadingBar/TopLoadingBar";
export function ProfileDetails({ props }) {
  const [action, setAction] = useState({
    isLoading: false,
  });
  const { getUser } = props;
  const { stateAuth } = useAuth();
  const { isUserAuthenticated } = stateAuth;
  const usernameEl = useRef(null);
  const emailEl = useRef(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [updateMessage, setUpdateMessage] = useState({
    message: "a",
    styleClass: "update-inital-render-class",
  });
  useEffect(() => {
    async function ApiCall() {
      if (isUserAuthenticated) {
        const response = await GetAccountDetails();
        if (response) {
          if (usernameEl.current !== null || undefined) {
            usernameEl.current.value = response.username;
            emailEl.current.value = response.email;
            setNewUsername(response.username);
            setNewEmail(response.email);
            getUser(response.username);
          }
        }
      }
    }
    ApiCall();
  }, [isUserAuthenticated, getUser]);

  async function AccountUpdateHandler(e) {
    e.preventDefault();
    setAction({ isLoading: true });
    const response = await UpdateUserDetails(newUsername, newEmail);
    setAction({
      isLoading: false,
    });

    if (response.status) {
      getUser(newUsername);
      setUpdateMessage((updateMessage) => {
        return {
          message: response.message,
          styleClass: "update-status update-success",
        };
      });
    } else {
      setUpdateMessage({
        message: response.message,
        styleClass: "update-status update-failure",
      });
    }
  }

  return (
    <form onSubmit={AccountUpdateHandler}>
      <div className="profile-details width-adjust">
        <p className="label">Account</p>

        {action.isLoading && (
          <>
            <div className="account-interaction-loader">
              <SetLoader />
            </div>
            <div className="top-loading-bar">
              <TopLoadingBar />
            </div>
          </>
        )}
        <p className={updateMessage.styleClass}>{updateMessage.message}</p>
        <div className="holder">
          <label className="labels-acc" htmlFor="username">
            Username
          </label>
          <input
            ref={usernameEl}
            onChange={(e) => setNewUsername(e.target.value)}
            name="username"
            type="username"
            className="input-box acc-username"
            placeholder="username"
            required
          />
        </div>
        <div className="holder">
          <label className="labels-acc" htmlFor="email">
            Email
          </label>
          <input
            ref={emailEl}
            onChange={(e) => setNewEmail(e.target.value)}
            name="email"
            type="email"
            className="input-box acc-password"
            placeholder="email"
            required
          />
        </div>
        <button type="submit" className="submit-button ">
          UPDATE
        </button>
      </div>
    </form>
  );
}
