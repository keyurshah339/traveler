
import "./watchlater.css";
import { useVideo } from "../Reducer/Reducer";
import { Card } from "../Card/Card";
import { RemoveFromLikedVideos } from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

export function WatchLater() {
    const toast = useRef(null);
  const { state, dispatch } = useVideo();
  const { watchLaterVideos } = state;
  const { action, setAction } = useActionManager();
  const userId = localStorage.getItem("userId");

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
}
  if (watchLaterVideos.length === 0) {
    return (
      <div className="outer-liked-container">
        <h1 className="none-selected" style={{marginLeft:'1rem'}}>No Watch Later Videos Yet...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Toast ref={toast} />
        <div className="liked-container">
          {watchLaterVideos.map((video) => (
            <div className="liked-video-card" key={video._id}>
              <Card video={video} />
              <button
                className=" remove-video-button trash-button"
                onClick={() => {
                    dispatch({type:'DELETE_WATCHLATER',payload:video._id})
                }}
              >
                <AiFillDelete color="red" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
