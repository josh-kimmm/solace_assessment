import { AppDispatch, CreateNotesResponse, DeleteNotesResponse, FetchNotesResponse, MultipleNoteAction, Note, NotesReducerPayload, NotesReducers, NotesState, SingleNoteAction, UpdateNotesResponse } from "@/types";
import axios from "@/client/lib/axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { NOTES_REDUCER_TYPES } from "@/client/constants";
import { AxiosResponse } from "axios";

const singleNoteAction = (action: SingleNoteAction): SingleNoteAction => ({
  type: action.type,
  payload: action.payload
});
const multipleNoteAction = (action: MultipleNoteAction): MultipleNoteAction => ({
  type: action.type,
  payload: action.payload
});


const _createNote = (note: Note) => async (dispatch: AppDispatch): Promise<Note> => {
  try {
    const { data }: AxiosResponse<CreateNotesResponse> = await axios.post("/notes", note);
  
    console.log(`New note created: ${data}`);
    dispatch(singleNoteAction({
      type: NOTES_REDUCER_TYPES.CREATE,
      payload: {
        note: data.new_note
      }
    }));
  
    return data.new_note;
  } catch (err: any) {
    console.error(`Failed to create notes from server: ${err.message}`)
    throw err;
  }
};

const _updateNote = (note: Note) => async (dispatch: AppDispatch): Promise<Note> => {
  try {
    const { data }: AxiosResponse<UpdateNotesResponse> = await axios.post(`/notes/${note.id}`, note);
    const { updated_note } = data;
    
    console.log(`Updated note: ${updated_note}`);
    dispatch(singleNoteAction({
      type: NOTES_REDUCER_TYPES.UPDATE,
      payload: {
        note: updated_note
      }
    }));
  
    return updated_note;
    
  } catch (err: any) {
    console.error(`Failed to update notes from server: ${err.message}`);
    throw err;  
  }
};

const _deleteNote = (note: Note) => async (dispatch: AppDispatch): Promise<Note> => {
  try {
    const { data }: AxiosResponse<DeleteNotesResponse> = await axios.delete(`/notes/${note.id}`);
  
    console.log(`Deleted note: ${data.deleted_note}`);
    dispatch(singleNoteAction({
      type: NOTES_REDUCER_TYPES.DELETE,
      payload: {
        note: data.deleted_note
      }
    }));
  
    return note;
  } catch (err: any) {
    console.error(`Failed to delete note from server: ${err.message}`);
    throw err; 
  }
};

const _fetchNotes = (searchStr?: string) => async (dispatch: AppDispatch): Promise<Note[]> => {
  try {
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
    
  } catch (err: any) {
    console.error(`Failed to fetch notes from server: ${err.message}`);
    throw err; 
  }
};



export {
  _createNote,
  _updateNote,
  _deleteNote,
  _fetchNotes
}