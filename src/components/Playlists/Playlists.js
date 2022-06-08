import "./Playlists.css";
import { Card } from "../Card/Card";
import { useVideo } from "../Reducer/Reducer";
import { DeleteFromPlaylist, RemovePlaylist } from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { useState } from "react";
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
              <h1 style={{ fontWeight: "lighter", textAlign: "left" }}>
                {playlist.playlistName}
              </h1>
              <button
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
                <ion-icon name="trash"></ion-icon>
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
                      <ion-icon name="trash"></ion-icon>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h1 className="none-selected">
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
