import "./PasswordReset.css";
import { useState } from "react";
import { UpdatePassword } from "../ApiCalls/ApiCalls";
import { SetLoader } from "../Loader/Loader";
import { TopLoadingBar } from "../TopLoadingBar/TopLoadingBar";
export function PasswordReset() {
  const [action, setAction] = useState({
    isLoading: false,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswords, setNewPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState({
    message: "a",
    styleClass: "update-inital-render-class",
  });
  async function PasswordResetHandler(e) {
    e.preventDefault();
    if (newPasswords.newPassword === newPasswords.confirmNewPassword) {
      setAction({ isLoading: true });
      const response = await UpdatePassword(
        currentPassword,
        newPasswords.newPassword
      );
      setAction({
        isLoading: false,
      });
      response.status === true
        ? setPasswordUpdateMessage({
            message: response.message,
            styleClass: "update-status update-success",
          })
        : setPasswordUpdateMessage({
            message: response.message,
            styleClass: "update-status update-failure",
          });
    } else {
      setPasswordUpdateMessage({
        message: "Passwords didn't match.Try again",
        styleClass: "update-status update-failure",
      });
    }
  }
  return (
    <form onSubmit={PasswordResetHandler}>
      <div className="account-info password-div">
        <p className="label">Reset Password</p>
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
        <p className={passwordUpdateMessage.styleClass}>
          {passwordUpdateMessage.message}
        </p>

        <div className="inline-inputs">
          <div className="holder internal-inline-div">
            <label className="labels-acc" htmlFor="username">
              Current Password
            </label>
            <input
              name="username"
              type="password"
              className="input-box acc-username"
              required
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="holder internal-inline-div">
            <label className="labels-acc new-passsword" htmlFor="username">
              New Password
            </label>
            <input
              name="username"
              type="password"
              className="input-box acc-username"
              required
              onChange={(e) =>
                setNewPasswords({
                  ...newPasswords,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="holder">
          <label className="labels-acc" htmlFor="username">
            Confirm New Password
          </label>
          <input
            name="username"
            type="password"
            className="input-box acc-username"
            required
            onChange={(e) =>
              setNewPasswords({
                ...newPasswords,
                confirmNewPassword: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" className="button button-outline submit-button ">
          UPDATE PASSWORD
        </button>
      </div>
    </form>
  );
}
