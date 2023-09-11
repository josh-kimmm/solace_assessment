import store from "@/client/store";
import type Note from "@/server/db/entity/Note"
import { NOTES_REDUCER_TYPES } from "@/client/constants";

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
type State = typeof store.getState;

export type {
  NotesReducers,
  NotesState,
  AppDispatch,
  Note,
  State,
  FetchNotesResponse,
  CreateNotesResponse
};