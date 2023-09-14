import Note from '../db/entity/Note';
import AppDataSource from "../db/data-source";
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

const noteRepository = AppDataSource.getRepository(Note);

const getAllNotes = async (): Promise<Note[]> => {
  let notes: Note[];
  try {
    notes = await noteRepository.find();
  } catch(err: any) {
    console.error(`Unable to fetch all notes from DB: ${err.message}`);
    throw err;
  }

  return notes;
};

const getNoteById = async (id: number): Promise<Note | null>=> {
  let note: Note | null; 
  try {
    note = await noteRepository.findOneBy({ id });
  } catch(err: any) {
    console.error(`Unable to fetch note id ${id} from DB: ${err.message}`);
    throw err;
  }

  return note;
};

const searchNoteContents = async (content: string): Promise<Note[]> => {
  let notes: Note[];
  
  try {
    notes = await noteRepository
      .createQueryBuilder()
      .select()
      .where(`contents ILIKE '%${content}%'`, { content })
      .getMany();    
  } catch(err: any) {
    console.error(`Unable to fetch notes by search "${content}": ${err.message}`);
    throw err;
  }

  return notes;
};

const createNote = async (noteToAdd: Note): Promise<InsertResult> => {
  let addedNote: InsertResult; 
  try {
    addedNote = await noteRepository.insert(noteToAdd);
  } catch(err: any) {
    console.error(`Unable to create note with title: ${noteToAdd.title} and content: ${noteToAdd.contents}: ${err.message}`);
    throw err;
  }

  return addedNote;
};

const updateNote = async (noteToUpdate: Note): Promise<UpdateResult> => {
  let updatedNote: UpdateResult;
  try {
    const {id, title, contents } = noteToUpdate;
    updatedNote = await noteRepository
      .createQueryBuilder()
      .update()
      .set({ title, contents })
      .where('id = :id', { id })
      .returning('*')
      .execute();
    
    } catch(err: any) {
      console.error(`Unable to update note id ${noteToUpdate.id}: ${err.message}`);
      throw err;
    }
  
  return updatedNote;
};

const deleteNote = async (id: number): Promise<DeleteResult> => {
  let deletedNote: DeleteResult;
  try {
    deletedNote = await noteRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .returning('*')
      .execute();
  } catch(err: any) {
    console.error(`Unable to delete note id ${id}: ${err.message}`);
    throw err;
  }

  return deletedNote;
};



const NoteService = {
  getAllNotes,
  getNoteById,
  searchNoteContents,
  createNote,
  updateNote,
  deleteNote
};

type AllNoteServices = typeof NoteService;
export type { AllNoteServices }; 
export default NoteService;