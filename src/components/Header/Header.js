import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useVideo } from "../Reducer/Reducer";
import { FcSearch } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
export function Header() {
  const username = localStorage.getItem('username');
  const { dispatch } = useVideo();
  const [searchKeyword, setSearchKeyword] = useState("");
  let navigate = useNavigate();
  let letter = ''
  if (username !== null){
  letter = username.charAt(0).toUpperCase();
  }

  function keyPressHandler(e) {
    if (e.key === "Enter") {
      dispatch({ type: "SEARCH_FOR_VIDEOS", payload: { searchKeyword } });
      navigate(`/search/?keyword=${searchKeyword}`, { replace: true });
    }
  }
  return (
    <header className="header-container">
      <div className="header-start">
        <Link to="/">
          <span className="logo-span">
            <img width="60" height="60" src="https://s2.svgbox.net/illlustrations.svg?ic=travel-bag" />
            <svg
              data-src="https://s2.svgbox.net/illlustrations.svg?ic=travel-bag"
              width="60"
              height="60"
              color="#000"
            ></svg>
          </span>
        </Link>
      </div>
      <div className="header-center">
        <input
          type="text"
          className="search-box"
          placeholder=" Search"
          onKeyPress={(e) => keyPressHandler(e)}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <Link to={{ pathname: `/search`, search: `?keyword=${searchKeyword}` }}>
          <button
            className="search-button"
            onClick={() =>
              dispatch({
                type: "SEARCH_FOR_VIDEOS",
                payload: { searchKeyword },
              })
            }
          >
            <BsSearch />
          </button>
        </Link>
      </div>

      <div className="header-end">
        <Link style={{textDecoration:'none'}} to="/account" >
          
          <div className="text2">
            <div className="textstyle2">
                {username == null ? 'A' : letter}
              </div>
            </div>
            
        </Link>
      </div>
    </header>
  );
}
