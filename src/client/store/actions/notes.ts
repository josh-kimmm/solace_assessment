import { AppDispatch, CreateNotesResponse, DeleteNotesResponse, FetchNotesResponse, MultipleNoteAction, Note, NotesReducerPayload, NotesReducers, NotesState, SingleNoteAction, UpdateNotesResponse } from "@/types";
import axios from "@/client/lib/axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { NOTES_REDUCER_TYPES } from "@/client/constants";
import { AxiosResponse } from "axios";

const singleNoteAction = (action: SingleNoteAction) => ({
  type: action.type,
  payload: action.payload
});
const multipleNoteAction = (action: MultipleNoteAction) => ({
  type: action.type,
  payload: action.payload
});


const _createNote = (note: Note) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<CreateNotesResponse> = await axios.post("/notes", note);

  console.log(`New note created: ${data}`);
  dispatch(singleNoteAction({
    type: NOTES_REDUCER_TYPES.CREATE,
    payload: {
      note: data.new_note
    }
  }));

  return data.new_note;
};

const _updateNote = (note: Note) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<UpdateNotesResponse> = await axios.post(`/notes/${note.id}`, note);

  console.log(`Updated note: ${data.updated_note}`);
  dispatch(singleNoteAction({
    type: NOTES_REDUCER_TYPES.UPDATE,
    payload: {
      note: data.updated_note
    }
  }));

  return note;
};

const _deleteNote = (note: Note) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<DeleteNotesResponse> = await axios.delete(`/notes/${note.id}`);

  console.log(`Deleted note: ${data.deleted_note}`);
  dispatch(singleNoteAction({
    type: NOTES_REDUCER_TYPES.DELETE,
    payload: {
      note: data.deleted_note
    }
  }));

  return note;
};

const _fetchNotes = (searchStr?: string) => async (dispatch: AppDispatch) => {
  const { data }: AxiosResponse<FetchNotesResponse> = searchStr ? 
    await axios.post("/notes/search", { textToSearch: searchStr }) : 
    await axios.get("/notes");
  const { notes } = data;

  console.log(`Notes fetched: ${data.notes}`);
  dispatch(multipleNoteAction({
    type: NOTES_REDUCER_TYPES.FETCH,
    payload: {
      notes
    }
  }));

  return notes;
};



export {
  _createNote,
  _updateNote,
  _deleteNote,
  _fetchNotes
}