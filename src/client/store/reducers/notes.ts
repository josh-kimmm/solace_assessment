import { NotesReducerPayload, NotesReducers, NotesState } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NOTES_REDUCER_TYPES } from "@/client/constants";



const initialState: NotesState = {
  notesToShow: [],
};

const notes = (state = initialState, action: NotesReducerPayload) => {
  const { type, payload } = action;
  const { notesToShow } = state;

  const { CREATE, FETCH, UPDATE, DELETE } = NOTES_REDUCER_TYPES;

  switch(type){
    case DELETE: 
    case UPDATE:
      const { note: changedNote } = payload;

      const newNotesToShow = type === DELETE ? 
        notesToShow.filter(note => note.id !== changedNote.id) : 
        notesToShow.map((note) => {
          if(note.id === changedNote.id)
            return payload.note;
        
          return note;
        });
   
      return {...state, notesToShow: newNotesToShow};
    case CREATE:
      return {...state, notesToShow: [payload.note, ...notesToShow] };
    case FETCH:
      return {...state, notesToShow: payload.notes };
    default:
      return state;
  }
};


export default notes;