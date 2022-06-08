import axios from "axios";

export function checkForIdInPlaylist(playlist, videoId) {
  const ifPresent = playlist.filter((item) => item.id === videoId);
  return ifPresent.length > 0 ? true : false;
}

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function setupAuthExceptionHandler(navigate, dispatchAuth) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatchAuth({ type: "LOGOUT_USER" });
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
}

export function BeforeAsyncOperation({ action, setAction, component }) {
  setAction({
    ...action,
    isLoading: true,
    component: component,
  });
}
export function AfterAsyncOperation({ action, setAction, textPassedToModal }) {
  setAction({
    ...action,
    isLoading: false,
    showModal: true,
    modalText: textPassedToModal,
  });

  setTimeout(() => {
    setAction({
      ...action,
      isLoading: false,
      showModal: false,
      modalText: "",
    });
  }, 1300);
}
