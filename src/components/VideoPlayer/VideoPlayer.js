import "./VideoPlayer.css";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useVideo } from "../Reducer/Reducer";
import { LibraryModal } from "../LibraryModal/LibraryModal";
import { Notes } from "../Notes/Notes";
import { useAuth } from "../Reducer/AuthReducer";
import { UserNotLoggedIn } from "../VideoInteractions/UserNotLoggedIn";
import { UserLoggedIn } from "../VideoInteractions/UserLoggedIn";
import { SetLoader } from "../Loader/Loader";
import { PopUpModal } from "../PopUpModal/PopUpModal";
import { useActionManager } from "../Contexts/ActionManagementContext";
export function VideoPlayer() {
  const { action } = useActionManager();
  const { modalText, showModal } = action;
  const { state } = useVideo();
  const { originalVideos, likedVideos } = state;
  const { stateAuth } = useAuth();
  const { isUserAuthenticated } = stateAuth;
  const { id } = useParams();
  const video = originalVideos.find((video) => video?.id === id);
  const videoInLiked = likedVideos.filter(
    (videoInIteration) => videoInIteration.id === video?.id
  );

  const [show, setShow] = useState(false);

  // to be passed to Library Modal
  let props = { show: show, setShow: setShow, video: video };
  if (video) {
    return (
      <div className="outer-main">
        <div className="player-card">
          <div className="player">
            <ReactPlayer
              url={video.url}
              controls={true}
              width={"100%"}
              height={"60vh"}
              playing={true}
            />
          </div>
          <div className="video-label">
            <p className="video-intro">{video.videoName}</p>

            <div className="interactions">
              {isUserAuthenticated ? (
                <UserLoggedIn
                  videoInLiked={videoInLiked}
                  video={video}
                  setShow={setShow}
                />
              ) : (
                <UserNotLoggedIn />
              )}
            </div>
          </div>
          <div className="creator-details">
            <div className="thumbnail-and-name">
              <img
                className="thumbnail"
                src={video.creatorThumbnail}
                alt="creator-thumbnail"
              />
              <p className="name">{video.creatorName}</p>
            </div>
            <div className="video-details">
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        </div>

        <Notes video={video} />

        <LibraryModal {...props} />
        <div>
          <PopUpModal props={{ showModal, modalText }} />
        </div>
      </div>
    );
  } else {
    return <SetLoader />;
  }
}
