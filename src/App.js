import "./App.css";
import { Header } from "./components/Header/Header";
import { Liked } from "./components/Liked/Liked";
import { Routes, Route } from "react-router-dom";
import { VideoPlayer } from "./components/VideoPlayer/VideoPlayer";
import { Explore } from "./components/Explore/Explore";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Library } from "./components/Library/Library";
import { Homepage } from "./components/Homepage/Homepage";
import { Search } from "./components/Search/Search";
import { Account } from "./components/Account/Account";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { NotFound } from "./components/NotFound/NotFound";
import { useAuth } from "./components/Reducer/AuthReducer";
import { TopLoadingBar } from "./components/TopLoadingBar/TopLoadingBar";
import { useActionManager } from "./components/Contexts/ActionManagementContext";
function App() {
  const { stateAuth } = useAuth();
  const { isUserAuthenticated } = stateAuth;
  const { action } = useActionManager();
  const { isLoading } = action;
  function PrivateRoute(props) {
    if (isUserAuthenticated) {
      return <Route {...props} />;
    } else {
      return (
        <Route
          {...props}
          element={
            <div className="main">
              <SignIn />
            </div>
          }
        />
      );
    }
  }

  function LoginRoute(props) {
    if (isUserAuthenticated) {
      return (
        <Route
          {...props}
          element={
            <div className="main">
              {" "}
              <Explore />
            </div>
          }
        />
      );
    } else {
      return (
        <Route
          {...props}
          element={
            <div className="main">
              <SignIn />
            </div>
          }
        />
      );
    }
  }

  return (
    <div className="main-outer-div">
      <div className="header">
        <Header />
        <div>
          {isLoading && (
            <div className="horizontal-top-loader">
              <TopLoadingBar />
            </div>
          )}
        </div>
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="main">
              {" "}
              <Homepage />
            </div>
          }
        />
        <Route
          path="/explore"
          element={
            <div className="main">
              <Explore />
            </div>
          }
        />
        <Route
          path="/liked"
          element={
            <div className="main">
              <Liked />
            </div>
          }
        />
        <Route
          path="watch/:id"
          element={
            <div className="main">
              <VideoPlayer />
            </div>
          }
        />
        <PrivateRoute
          path="library"
          element={
            <div className="main">
              <Library />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="main">
              <Search />
            </div>
          }
        />
        <Route
          path="/categories/:category"
          element={
            <div className="main">
              <Explore />
            </div>
          }
        />
        <PrivateRoute
          path="/account"
          element={
            <div className="main">
              <Account />
            </div>
          }
        />
        <LoginRoute
          path="/login"
          element={
            <div className="main">
              <SignIn />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="main">
              <SignUp />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="main">
              <NotFound />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
