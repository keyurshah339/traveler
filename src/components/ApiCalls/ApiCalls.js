import axios from "axios";
const BASE_URL = "https://nirvana-backend.herokuapp.com/";
// const BASE_URL = "http://localhost:9000/";
export async function UserSignIn({ userDetails }) {
  const dataFromView = { userDetails: userDetails };
  try {
    const response = await axios.post(BASE_URL + "users/signin", dataFromView);
    if (response.status === 200) {
      const userResponseFromServer = {
        allowUser: response.data.allowUser,
        messageToShowOnView: response.data.message,
        token: response.data.token,
      };
      return userResponseFromServer;
    }
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}
export async function GuestAccess() {
  try {
    const response = await axios.post(BASE_URL + "users/guest");
    if (response.status === 200) {
      const userResponseFromServer = {
        allowUser: response.data.allowUser,
        messageToShowOnView: response.data.message,
        token: response.data.token,
      };
      return userResponseFromServer;
    }
  } catch (error) {
    console.log("error ocurred ", error.message);
  }
}
export async function UserSignUp(userDetails) {
  const signUpDataFromView = {
    userDetails: userDetails,
  };
  let isSignUpSuccessfull;
  try {
    const response = await axios.post(
      BASE_URL + "users/signup",
      signUpDataFromView
    );
    if (response.status === 200) {
      if (response.data.status === true) {
        return (isSignUpSuccessfull = {
          status: true,
          token: response.data.token,
        });
      } else if (response.data.status === false) {
        //  11000 is returned when we send data which is already there for common field
        if (response.data.code === 11000) {
          isSignUpSuccessfull = {
            status: false,
            existingField: response.data.existingField,
          };
          return isSignUpSuccessfull;
        }
      }
    }
  } catch (error) {
    console.log("error occured ", error.message);
  }
}

export async function GetVideos() {
  try {
    const response = await axios.get(BASE_URL + "videos");
    if (response.status === 200) {
      return response.data.videos;
    }
  } catch (error) {
    console.log("error occurred ", error);
  }
}

export async function GetLikedVideos() {
  try {
    const response = await axios.post(BASE_URL + "liked/all");
    if (response.status === 200) {
      return response.data.likedVideos;
    }
  } catch (error) {
    console.log("Oops!an error occurred ", error.response.data);
  }
}

export async function SaveToLiked(dispatch, video) {
  try {
    const data = { videoId: video._id };
    const response = await axios.post(BASE_URL + "liked/add", data);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_LIKED_VIDEOS",
        payload: { video },
      });
    }
  } catch (error) {
    console.log("ean error occurred ", error);
  }
}

export async function RemoveFromLikedVideos(dispatch, video) {
  try {
    const data = { videoId: video._id };
    const response = await axios.post(BASE_URL + "liked/delete", data);
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_LIKED_VIDEOS",
        payload: { video },
      });
    }
  } catch (error) {
    console.log("error occured ", error.response.data);
  }
}

export async function GetUserPlaylists() {
  try {
    const response = await axios.post(BASE_URL + "playlists/all/");
    if (response.status === 200) {
      return response.data.playlists;
    }
  } catch (error) {
    console.log("an error occured ", error.response.data);
  }
}

export async function AddVideoToPlaylist(dispatch, video, playlist) {
  try {
    const data = { playlistId: playlist._id, videoId: video._id };
    const response = await axios.post(BASE_URL + "playlists/addvideo", data);
    if (response.status === 200) {
      dispatch({
        type: "ADD_TO_PLAYLIST",
        payload: { playlist, video },
      });
    }
  } catch (error) {
    console.log("error occured ", error.response);
  }
}

export async function AddNewPlaylist(dispatch, playlistName, video) {
  try {
    const data = {
      playlistName: playlistName,
      videoId: video._id,
    };
    const response = await axios.post(BASE_URL + "playlists/newplaylist", data);
    if (response.status === 200) {
      dispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: { newPlaylist: response.data.newPlaylist, video },
      });
      return response.data.newPlaylist.playlistName;
    }
  } catch (error) {
    console.log("error in creating new playlist ", error.response);
  }
}

export async function DeleteFromPlaylist(videoId, playlistId, dispatch) {
  try {
    const data = { videoId, playlistId };
    const response = await axios.post(BASE_URL + "playlists/removevideo", data);
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { videoId, playlistId },
      });
    }
  } catch (error) {
    console.log("error occured ", error);
  }
}

export async function RemovePlaylist(playlistId, dispatch) {
  try {
    const data = { playlistId };
    const response = await axios.post(
      BASE_URL + "playlists/removeplaylist",
      data
    );
    if (response.status === 200) {
      dispatch({ type: "REMOVE_PLAYLIST", payload: { playlistId } });
    }
  } catch (error) {
    console.log("an error occurred while removing playlist", error);
  }
}

export async function GetAccountDetails() {
  try {
    const response = await axios.post(BASE_URL + "account");

    if (response.status === 200) {
      return response.data.accountDetails;
    }
  } catch (error) {
    console.log("an error occurred while fetching account details", error);
  }
}

export async function UpdateUserDetails(newUsername, newEmail) {
  try {
    const data = { newUsername, newEmail };
    const response = await axios.post(BASE_URL + "account/update", data);
    if (response.status === 200) {
      return { status: true, message: "User updated successfully" };
    }
  } catch ({ response }) {
    if (response.data.error.code === 11000) {
      return Object.keys(response.data.error.keyPattern)[0] === "username"
        ? { staus: false, message: "Couldn't Update.Username already exists" }
        : {
            staus: false,
            message:
              "Couldn't update.Email is already linked to a different account",
          };
    } else {
      console.log(
        "Oops!!unexpected error occurred while updating user details ",
        response.data.errMessage
      );
    }
  }
}

export async function UpdatePassword(oldPassword, newPassword) {
  const data = { oldPassword, newPassword };
  try {
    const response = await axios.post(BASE_URL + "password/update", data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("an error occurred while updating password", error);
  }
}
