import "./Playlists.css";
import { Card } from "../Card/Card";
import { useVideo } from "../Reducer/Reducer";
import { DeleteFromPlaylist, RemovePlaylist } from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Tooltip } from 'primereact/tooltip';


export function Playlists({ playlist }) {
  const { dispatch, state } = useVideo();
  const { playlists } = state;
  const { action, setAction } = useActionManager();
  const [playlistName, setPlaylistName] = useState("");

  if (playlists.length > 0) {
    return (
      <div className="playlists-container">
        {playlists.map((playlist) => (
          <div key={playlist._id}>
            <div className="single-playlist-show">
              <h1 style={{ fontWeight: "200", textAlign: "left",fontSize:'30px',marginLeft:'1rem' }}>
                {playlist.playlistName}
              </h1>
              <button
              tooltip="Enter your username"
                onClick={async () => {
                  BeforeAsyncOperation({
                    action,
                    setAction,
                    component: "playlists",
                  });
                  setPlaylistName(playlist.playlistName);

                  await RemovePlaylist(playlist._id, dispatch);
                  AfterAsyncOperation({
                    action,
                    setAction,
                    textPassedToModal: "Playlist removed successfully",
                  });
                }}
                className="trash-button"
              >
                <AiFillDelete  size="1.3em" color="red" />
              </button>
            </div>
            {playlist.videos.length > 0 ? (
              <div className="video-container">
                {playlist.videos.map((video) => (
                  <div className="playlist-video">
                    <Card video={video} />
                    <button
                      className=" remove-video-button trash-button"
                      onClick={async () => {
                        setPlaylistName(playlist.playlistName);
                        BeforeAsyncOperation({
                          action,
                          setAction,
                          component: "playlists",
                        });

                        await DeleteFromPlaylist(
                          video._id,
                          playlist._id,
                          dispatch
                        );
                        AfterAsyncOperation({
                          action,
                          setAction,
                          textPassedToModal: "Video removed successfully",
                        });
                      }}
                    >
                    <AiFillDelete color="red" />

                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h1 className="none-selected" style={{marginLeft:'1rem'}}>
                  No videos in here currently...
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <h1 className="none-selected">No playlists added currently...</h1>
      </>
    );
  }
}
