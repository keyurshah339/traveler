import "./Liked.css";
import { useVideo } from "../Reducer/Reducer";
import { Card } from "../Card/Card";
import { RemoveFromLikedVideos } from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
export function Liked() {
  const { state, dispatch } = useVideo();
  const { likedVideos } = state;
  const { action, setAction } = useActionManager();
  const userId = localStorage.getItem("userId");
  if (likedVideos.length === 0) {
    return (
      <div className="outer-liked-container">
        <h1 className="none-selected">No Liked Videos Yet...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="liked-container">
          {likedVideos.map((video) => (
            <div className="liked-video-card" key={video._id}>
              <Card video={video} />
              <button
                className=" remove-video-button trash-button"
                onClick={async () => {
                  BeforeAsyncOperation({
                    action,
                    setAction,
                    component: "videos",
                  });
                  await RemoveFromLikedVideos(dispatch, video, userId);
                  AfterAsyncOperation({
                    action,
                    setAction,
                    textPassedToModal: "Removed From Liked Videos Successfully",
                  });
                }}
              >
                <ion-icon name="trash"></ion-icon>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
