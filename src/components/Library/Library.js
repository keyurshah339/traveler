import "./Library.css";
import { Liked } from "../Liked/Liked";
import {WatchLater} from "../watchlater/watchlater"
import { Playlists } from "../Playlists/Playlists";
import { useVideo } from "../Reducer/Reducer";
import { SetLoader } from "../Loader/Loader";
import { PopUpModal } from "../PopUpModal/PopUpModal";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { AiOutlineLike } from "react-icons/ai";
import { MdPlaylistPlay } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";

export function Library() {
  const username = localStorage.getItem('username');
  const { action } = useActionManager();
  const { modalText, showModal } = action;
  const { state } = useVideo();
  const { playlists } = state;
  const { likedVideos ,watchLaterVideos } = state;
  const { isLoading, component } = action;
  const { originalVideos } = state;

  let letter = username.charAt(0).toUpperCase();


  

  if (originalVideos.length > 0) {
    return (

      <div style={{display:'flex'}}>

  <div className="library-outer">
        <div className=" library-section">
              <div className="section-heading">
                <h1 className="headings">
                  <AiOutlineLike/>
                  Liked Videos</h1>
                {isLoading && component === "videos" && (
                  <div className="remove-like-loader">
                    <SetLoader />
                  </div>
                )}
              </div>
              <Liked />
            </div>
            
            {/* watchlater */}
            <div className=" library-section">
              <div className="section-heading">
                <h1 className="headings">
                  <MdOutlineWatchLater/>
                  Watch Later</h1>
                {isLoading && component === "videos" && (
                  <div className="remove-like-loader">
                    <SetLoader />
                  </div>
                )}
              </div>
              <WatchLater />
            </div>


            <div className="library-section">
              <div className="section-heading">
                <h1 className="headings">
                  <MdPlaylistPlay />
                  Playlists</h1>
                  <p className="headings" style={{fontWeight:'100',fontSize:'1rem'}}>Playlists you create or save will show up here.</p>
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

      <div className="rightsidebar">
          
          <div className="sidebarContainer">

            <div className="text">
            <div className="textstyle">
                {letter}
              </div>
            </div>
            
            <div className="lowerContainer">
            <div style={{marginBottom:'1rem',fontSize:'1.5rem',fontWeight:'100'}}>{username}</div>  

            <div className="insidelowerContainer">
              <div>Likes</div>
              <div>{likedVideos.length}</div> 
            </div>

            <div className="insidelowerContainer">
             <div>Playlist</div>
             <div>{playlists.length}</div>   
            </div>

            <div className="insidelowerContainer">
              <div>Watch Later</div>
              <div>{watchLaterVideos.length}</div>
                
            </div>


            </div>

          </div>

      </div>


      </div>

      
    );
  } else {
    return <SetLoader />;
  }
}
