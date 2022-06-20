import { useVideo } from "../Reducer/Reducer";
import { SaveToLiked, RemoveFromLikedVideos } from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { SetLoader } from "../Loader/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { MdAddCircle } from "react-icons/md";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";

import { useState } from "react";



// css from VideoPlayer.css

export function UserLoggedIn({ videoInLiked, video, setShow }) {
  const [isWatchLater,setisWatchLater]=useState(true)
  const { dispatch } = useVideo();
  const { action, setAction } = useActionManager();
  const { isLoading, component } = action;
  const userId = localStorage.getItem("userId");
  console.log('videoInLiked',videoInLiked)
  return (
    <>
      {isLoading && component === "likedButton" && (
        <div className="like-interaction-loader">
          <SetLoader />
        </div>
      )}
      <div className="interactions">
        {videoInLiked.length === 0 ? (
          <button
            title="Like"
            onClick={async () => {
              BeforeAsyncOperation({
                action,
                setAction,
                component: "likedButton",
              });
              await SaveToLiked(dispatch, video, userId);
              AfterAsyncOperation({
                action,
                setAction,
                textPassedToModal: "Added to liked videos",
              });
            }}
            className="not-liked buttons"
          >
            <BsHandThumbsUp />
          </button>
        ) : (
          <button
            onClick={async () => {
              BeforeAsyncOperation({
                action,
                setAction,
                component: "likedButton",
              });
              await RemoveFromLikedVideos(dispatch, video, userId);
              AfterAsyncOperation({
                action,
                setAction,
                textPassedToModal: "Removed from liked videos",
              });
            }}
            className="liked buttons"
          >
            <BsFillHandThumbsUpFill />
          </button>
        )}
        
          {
            isWatchLater ? 
            <button
            title="watchlater"
            onClick={ () => {
              setisWatchLater(!isWatchLater)
              dispatch({type:"WATCH_LATER",payload:video})
              AfterAsyncOperation({
                action,
                setAction,
                textPassedToModal: "Added to Watch Later videos",
              });
            } }
            
              className="not-liked buttons"
          >
            
            <MdOutlineWatchLater />
          </button>
          :
          <button
            title="watchlater"
            onClick={ () => {
              setisWatchLater(!isWatchLater)
              dispatch({type:"DELETE_WATCHLATER",payload:video._id})
              AfterAsyncOperation({
                action,
                setAction,
                textPassedToModal: "Removed Watch Later videos",
              });
            } }
            
              className="liked buttons"
          >
            
            <MdWatchLater />
          </button>
        
          }
          


        <button
          title="Add to Library"
          className="buttons tooltip"
          onClick={() => setShow(true)}
        >
          <MdAddCircle />
        </button>
      </div>
    </>
  );
}
