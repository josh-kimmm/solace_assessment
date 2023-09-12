import Note from '../entity/Note';
import AppDataSource from "../data-source";
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

const noteRepository = AppDataSource.getRepository(Note);

const getAllNotes = async () => {
  let notes: Note[];
  try {
    notes = await noteRepository.find();
  } catch (err) {
    console.error(`Unable to fetch all notes from DB: ${err.message}`);
    throw err;
  }

  return notes;
};

const getNoteById = async (id: number) => {
  let note: Note; 
  try {
    note = await noteRepository.findOneBy({ id });
  } catch (err) {
    console.error(`Unable to fetch note id ${id} from DB: ${err.message}`);
    throw err;
  }

  return note;
};

const searchNoteContents = async (content: string) => {
  let notes: Note[];
  
  try {
    notes = await noteRepository
      .createQueryBuilder()
      .select()
      .where(`contents ILIKE '%${content}%'`, { content })
      .getMany();    
  } catch (err) {
    console.error(`Unable to fetch notes by search "${content}": ${err.message}`);
    throw err;
  }

  return notes;
};

const createNote = async (noteToAdd: Note) => {
  let addedNote: InsertResult; 
  try {
    addedNote = await noteRepository.insert(noteToAdd);
  } catch (err) {
    console.error(`Unable to create note with title: ${noteToAdd.title} and content: ${noteToAdd.contents}: ${err.message}`);
    throw err;
  }

  return addedNote;
};

const updateNote = async (noteToUpdate: Note) => {
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
    
    } catch (err) {
      console.error(`Unable to update note id ${noteToUpdate.id}: ${err.message}`);
      throw err;
    }
  
  return updatedNote;
};

const deleteNote = async (id: number) => {
  let deletedNote: DeleteResult;
  try {
    deletedNote = await noteRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .returning('*')
      .execute();
  } catch (err) {
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
export default NoteService;