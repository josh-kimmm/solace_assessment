import { NotesReducers, NotesState } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NOTES_REDUCER_TYPES } from "@/client/constants";



const initialState: NotesState = {
  notesToShow: [],
};

const notes = (state = initialState, action: PayloadAction<NotesState, NotesReducers>) => {
  const { type, payload } = action;
  const { notesToShow } = state;

  const { CREATE, FETCH } = NOTES_REDUCER_TYPES;

  switch(type){
    case CREATE:
      return {...state, notesToShow: notesToShow.concat(payload.notesToShow)};
    case FETCH:
      return {...state, notesToShow: payload.notesToShow };
    default:
      return state;
  }
};


export default notes;