import "./Library.css";
import { Liked } from "../Liked/Liked";
import { Playlists } from "../Playlists/Playlists";
import { useVideo } from "../Reducer/Reducer";
import { SetLoader } from "../Loader/Loader";
import { PopUpModal } from "../PopUpModal/PopUpModal";
import { useActionManager } from "../Contexts/ActionManagementContext";
export function Library() {
  const { action } = useActionManager();
  const { modalText, showModal } = action;
  const { state } = useVideo();
  const { isLoading, component } = action;
  const { originalVideos } = state;
  if (originalVideos.length > 0) {
    return (
      <div className="library-outer">
        <div className=" library-section">
          <div className="section-heading">
            <h1 className="heading-intro">Liked Videos|</h1>
            {isLoading && component === "videos" && (
              <div className="remove-like-loader">
                <SetLoader />
              </div>
            )}
          </div>
          <Liked />
        </div>
        <div className="library-section">
          <div className="section-heading">
            <h1 className="heading-intro">Playlists|</h1>
            {isLoading && component === "playlists" && (
              <div className="playlist-loader">
                <SetLoader />
              </div>
            )}
          </div>

          <Playlists />
        </div>
        <div>
          <PopUpModal
            props={{
              showModal,
              modalText,
            }}
          />
        </div>
      </div>
    );
  } else {
    return <SetLoader />;
  }
}
