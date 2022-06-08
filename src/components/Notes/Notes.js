import "./Notes.css";
import { useState, useEffect } from "react";
import { AddNote, GetNotes, DeleteNote } from "../ApiCalls/Notes";
import { SetLoader } from "../Loader/Loader";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { useAuth } from "../Reducer/AuthReducer";
export function Notes({ video }) {
  const { action, setAction } = useActionManager();
  const { isLoading, component } = action;
  const { stateAuth } = useAuth();
  const { isUserAuthenticated } = stateAuth;
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function ApiCall() {
      const dataToApi = { videoId: video._id };
      if (isUserAuthenticated) {
        const response = await GetNotes(dataToApi);
        response ? setNotes([...response]) : setNotes([]);
      }
    }
    ApiCall();
  }, [video._id, isUserAuthenticated]);

  async function notesHandler(e) {
    const dataToApi = { note: e.target.value, videoId: video._id };
    try {
      BeforeAsyncOperation({ action, setAction, component: "notes" });
      await AddNote(dataToApi);
      setNotes([...notes, e.target.value]);
      AfterAsyncOperation({
        action,
        setAction,
        textPassedToModal: "Note Added",
      });
      e.target.value = "";
    } catch (error) {
      console.log("Error occurred while adding a note");
    }
  }
  async function deleteHandler(note) {
    const dataToApi = { videoId: video._id, note: note };
    BeforeAsyncOperation({ action, setAction, component: "notes" });
    const response = await DeleteNote(dataToApi);
    response
      ? setNotes(notes.filter((item) => item !== note))
      : setNotes(notes);
    AfterAsyncOperation({
      action,
      setAction,
      textPassedToModal: "Note Removed",
    });
  }
  return (
    <div className="notes-outer">
      <p className="notes-heading">Fill Your Bucket List...</p>
      {isLoading && component === "notes" && (
        <div className="notes-interaction-loader">
          <SetLoader />
        </div>
      )}
      <div className="notes">
        {notes.map((note) => (
          <div className="individual-note" key={note}>
            <p className="note-text">{note}</p>
            <button className="delete-note" onClick={() => deleteHandler(note)}>
              X
            </button>
          </div>
        ))}
      </div>
      <input
        className="notes-input-box"
        type="text"
        placeholder="Type here..."
        onKeyPress={(e) => (e.key === "Enter" ? notesHandler(e) : "do nothing")}
      />
    </div>
  );
}
