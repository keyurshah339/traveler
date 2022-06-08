import axios from "axios";
const BASE_URL = "https://nirvana-backend.herokuapp.com/";
export async function AddNote(dataToAPi) {
  try {
    const response = await axios.post(BASE_URL + "notes/add", dataToAPi);
    return response;
  } catch (error) {
    console.log("Error occureed ", error.message);
  }
}

export async function GetNotes(dataToAPi) {
  try {
    const response = await axios.post(BASE_URL + "notes/all", dataToAPi);
    return response.data.notes;
  } catch (error) {
    console.log("Error occureed ", error.message);
  }
}

export async function DeleteNote(dataToAPi) {
  try {
    const response = await axios.post(BASE_URL + "notes/delete", dataToAPi);
    return response.status;
  } catch (error) {
    console.log("Error occureed ", error.message);
  }
}
