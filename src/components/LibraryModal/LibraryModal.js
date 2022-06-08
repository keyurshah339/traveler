import "./LibraryModal.css";
import { useState, useRef } from "react";
import {
  checkForIdInPlaylist,
  BeforeAsyncOperation,
  AfterAsyncOperation,
} from "../../utils/funcs";
import { useVideo } from "../Reducer/Reducer";
import {
  AddVideoToPlaylist,
  AddNewPlaylist,
  DeleteFromPlaylist,
} from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { SetLoader } from "../Loader/Loader";
export function LibraryModal({ show, setShow, video }) {
  const { state, dispatch } = useVideo();
  const { playlists } = state;
  const [current, setCurrent] = useState("");
  const inputEl = useRef(null);
  const { action, setAction } = useActionManager();
  const { isLoading, component } = action;

  async function keyPressHandler(e) {
    if (current.length > 0 && current.trim()) {
      if (e.key === "Enter") {
        BeforeAsyncOperation({
          action,
          setAction,
          component: "playlistsModal",
        });
        const playlistName = await AddNewPlaylist(dispatch, current, video);
        e.target.value = "";
        setCurrent("");
        AfterAsyncOperation({
          action,
          setAction,
          textPassedToModal: `Added to ${playlistName}`,
        });
      }
    }
  }

  async function onClickHandler(e) {
    if (current.length > 0 && current.trim()) {
      BeforeAsyncOperation({ action, setAction, component: "playlistsModal" });
      const playlistName = await AddNewPlaylist(dispatch, current, video);
      inputEl.current.value = "";
      setCurrent("");
      AfterAsyncOperation({
        action,
        setAction,
        textPassedToModal: `Added to ${playlistName}`,
      });
    }
  }
  async function checkboxHandler(playlist, video) {
    if (checkForIdInPlaylist(playlist.videos, video.id) === true) {
      BeforeAsyncOperation({ action, setAction, component: "checkbox" });

      await DeleteFromPlaylist(video._id, playlist._id, dispatch);
      AfterAsyncOperation({
        action,
        setAction,
        textPassedToModal: `Removed from ${playlist.playlistName}`,
      });
    } else {
      BeforeAsyncOperation({ action, setAction, component: "checkbox" });
      await AddVideoToPlaylist(dispatch, video, playlist);
      AfterAsyncOperation({
        action,
        setAction,
        textPassedToModal: `Added to ${playlist.playlistName}`,
      });
    }
  }

  if (!show) {
    return null;
  } else {
    return (
      <div className="modal-outer" onClick={() => setShow(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <p>Add to Library</p>
            {isLoading &&
              (component === "playlistsModal" || component === "checkbox") && (
                <div className="playlist-interaction-loader">
                  <SetLoader />
                </div>
              )}
            <button className="close-modal" onClick={() => setShow(false)}>
              X
            </button>
          </div>
          <div className="playlists">
            {playlists.map((playlist) => (
              <div className="single-playlist" key={playlist._id}>
                <input
                  type="checkbox"
                  checked={checkForIdInPlaylist(playlist.videos, video.id)}
                  onChange={() => checkboxHandler(playlist, video)}
                />
                <label>{playlist.playlistName}</label>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <input
              type="text"
              id="input"
              ref={inputEl}
              placeholder="Add new..."
              style={{ outline: "none" }}
              onChange={(e) => setCurrent(e.target.value)}
              onKeyPress={(e) => keyPressHandler(e)}
            />
            <button
              className="footer-button"
              onClick={(e) => onClickHandler(e)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
