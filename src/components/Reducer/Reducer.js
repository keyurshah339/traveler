import { useReducer, useContext, createContext, useEffect } from "react";
import {
  GetVideos,
  GetLikedVideos,
  GetUserPlaylists,
} from "../ApiCalls/ApiCalls";
import { useAuth } from "./AuthReducer";
import {
  setupAuthHeaderForServiceCalls,
  setupAuthExceptionHandler,
} from "../../utils/funcs";
import { useNavigate } from "react-router-dom";

const VideoHandleContext = createContext();

function videosHandler(state, { type, payload }) {
  const { likedVideos, playlists, originalVideos } = state;
  switch (type) {
    case "INITIAL_VIDEOS_RENDER":
      return {
        ...state,
        videos: payload.videos,
        originalVideos: payload.videos,
      };
    case "INITIAL_LIKED_VIDEOS_RENDER":
      return {
        ...state,
        likedVideos: payload.userLikedVideos,
      };
    case "INITIAL_PLAYLISTS_RENDER":
      return {
        ...state,
        playlists: payload.userPlaylists,
      };
    case "ADD_TO_LIKED_VIDEOS":
      return { ...state, likedVideos: [...likedVideos, payload.video] };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: likedVideos.filter(
          (video) => video.id !== payload.video.id
        ),
      };
    case "ADD_NEW_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...playlists,
          { ...payload.newPlaylist, videos: [payload.video] },
        ],
      };
    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: playlists.filter(
          (playlist) => playlist._id !== payload.playlistId
        ),
      };
    case "ADD_TO_PLAYLIST":
      const tempPlaylists = [...playlists];
      console.log("temp playlist is ", tempPlaylists);
      // index which playlist to mess with
      const index = tempPlaylists.findIndex(
        (loopPlaylist) =>
          payload.playlist.playlistName === loopPlaylist.playlistName
      );
      // update the playlist
      tempPlaylists[index] = {
        ...tempPlaylists[index],
        videos: [...tempPlaylists[index].videos, payload.video],
      };
      return { ...state, playlists: tempPlaylists };
    case "REMOVE_FROM_PLAYLIST":
      const tempPlaylistsRemove = [...playlists];
      const indexToRemoveFrom = tempPlaylistsRemove.findIndex(
        (loopPlaylist) => payload.playlistId === loopPlaylist._id
      );
      const filteredVideos = tempPlaylistsRemove[
        indexToRemoveFrom
      ].videos.filter((currentVideo) => currentVideo._id !== payload.videoId);
      tempPlaylistsRemove[indexToRemoveFrom] = {
        ...tempPlaylistsRemove[indexToRemoveFrom],
        videos: filteredVideos,
      };
      return { ...state, playlists: tempPlaylistsRemove };
    case "FILTER_OUT_CATEGORIES":
      if (payload.category === "All") {
        return { ...state, videos: originalVideos };
      } else
        return {
          ...state,
          videos: originalVideos.filter(
            (video) => video.category === payload.category
          ),
        };
    case "SEARCH_FOR_VIDEOS":
      return {
        ...state,
        videos: originalVideos.filter(
          (video) =>
            video.videoName
              .toLowerCase()
              .indexOf(payload.searchKeyword.toLowerCase()) === 0
        ),
      };
    case "CLEAR_STATE_ON_LOGOUT":
      return { ...state, likedVideos: [], playlists: [] };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const token = localStorage.getItem("token");
  setupAuthHeaderForServiceCalls(token);
  const { stateAuth, dispatchAuth } = useAuth();
  const navigate = useNavigate();
  const likedVideos = [];
  const watchLaterVideos = [];
  const playlists = [{ playlist: { playlistName: "Watch Later" }, videos: [] }];
  const videos = [];
  const originalVideos = [];

  useEffect(() => {
    setupAuthHeaderForServiceCalls(token);
  }, [token]);

  useEffect(() => {
    setupAuthExceptionHandler(navigate, dispatchAuth);
  }, [dispatchAuth, navigate]);

  useEffect(() => {
    async function Apicall() {
      const videos = await GetVideos();
      dispatch({ type: "INITIAL_VIDEOS_RENDER", payload: { videos } });
    }
    Apicall();
  }, []);

  //get all liked videos for a particular user
  useEffect(() => {
    async function Apicall() {
      if (token) {
        const userLikedVideos = await GetLikedVideos();
        dispatch({
          type: "INITIAL_LIKED_VIDEOS_RENDER",
          payload: { userLikedVideos },
        });
      }
    }
    Apicall();
  }, [stateAuth, token]);

  // get all playlotst for authenticated user
  useEffect(() => {
    async function Apicall() {
      if (token) {
        const userPlaylists = await GetUserPlaylists();
        dispatch({
          type: "INITIAL_PLAYLISTS_RENDER",
          payload: { userPlaylists },
        });
      }
    }
    Apicall();
  }, [stateAuth, token]);
  const [state, dispatch] = useReducer(videosHandler, {
    likedVideos,
    watchLaterVideos,
    playlists,
    videos,
    originalVideos,
  });
  return (
    <VideoHandleContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoHandleContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoHandleContext);
}
