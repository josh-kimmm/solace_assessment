import { AppDispatch, CreateNotesResponse, FetchNotesResponse, Note, NotesReducers, NotesState } from "@/types";
import axios from "@/client/lib/axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { NOTES_REDUCER_TYPES } from "@/client/constants";
import { AxiosResponse } from "axios";

const updateNotesState = (action: PayloadAction<NotesState, NotesReducers>) => ({
  type: action.type,
  payload: action.payload
})

const _createNote = (note: Note) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<CreateNotesResponse> = await axios.post("/notes", note);

  console.log(`New note created: ${data}`);
  dispatch(updateNotesState({
    type: NOTES_REDUCER_TYPES.CREATE,
    payload: {
      notesToShow: [data.new_note]
    }
  }));
};

const _fetchNotes = (searchStr?: string) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<FetchNotesResponse> = await axios.get("/notes");
  const { notes } = data;

  console.log(`Notes fetched: ${data.notes}`);
  dispatch(updateNotesState({
    type: NOTES_REDUCER_TYPES.FETCH,
    payload: {
      notesToShow: notes
    }
  }));

  return notes;
};



export {
  _createNote,
  _fetchNotes,
}