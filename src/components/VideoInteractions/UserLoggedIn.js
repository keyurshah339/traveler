import { useVideo } from "../Reducer/Reducer";
import { SaveToLiked, RemoveFromLikedVideos } from "../ApiCalls/ApiCalls";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { SetLoader } from "../Loader/Loader";
// css from VideoPlayer.css

export function UserLoggedIn({ videoInLiked, video, setShow }) {
  const { dispatch } = useVideo();
  const { action, setAction } = useActionManager();
  const { isLoading, component } = action;
  const userId = localStorage.getItem("userId");
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
            <ion-icon name="thumbs-up-outline"></ion-icon>
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
            <ion-icon name="thumbs-up-sharp"></ion-icon>
          </button>
        )}
        <button
          title="Add to Library"
          className="buttons tooltip"
          onClick={() => setShow(true)}
        >
          <ion-icon name="create-outline"></ion-icon>
        </button>
      </div>
    </>
  );
}
