import store from "@/client/store";
import type Note from "@/server/db/entity/Note"
import { NOTES_REDUCER_TYPES } from "@/client/constants";
import { PayloadAction } from "@reduxjs/toolkit";

interface NotesState {
  notesToShow: Note[]
}
type AppDispatch = typeof store.dispatch;
type NotesReducers = typeof NOTES_REDUCER_TYPES[keyof typeof NOTES_REDUCER_TYPES];
type FetchNotesResponse = {
  notes: Note[]
};
type CreateNotesResponse = {
  new_note: Note
};
type UpdateNotesResponse = {
  updated_note: Note
};
type DeleteNotesResponse = {
  deleted_note: Note
};
type State = typeof store.getState;

type SingleNoteActionPayload = { note: Note };
type SingleNoteActionType = typeof NOTES_REDUCER_TYPES.CREATE 
  | typeof NOTES_REDUCER_TYPES.UPDATE 
  | typeof NOTES_REDUCER_TYPES.DELETE;
type SingleNoteAction = PayloadAction<SingleNoteActionPayload, SingleNoteActionType>;

type MultipleNoteActionPayload = { notes: Note[] };
type MultipleNoteActionType = typeof NOTES_REDUCER_TYPES.FETCH;
type MultipleNoteAction = PayloadAction<MultipleNoteActionPayload, MultipleNoteActionType>;

type NotesReducerPayload =  SingleNoteAction | MultipleNoteAction;

export type {
  NotesReducers,
  SingleNoteAction,
  MultipleNoteAction,
  NotesReducerPayload,
  NotesState,
  AppDispatch,
  Note,
  State,
  FetchNotesResponse,
  CreateNotesResponse,
  UpdateNotesResponse,
  DeleteNotesResponse
};