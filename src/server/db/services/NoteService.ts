import Note from '../entity/Note';
import AppDataSource from "../data-source";

export default class NoteService {
  private noteRepository = AppDataSource.getRepository(Note);

  async getAllNotes() {
    return this.noteRepository.find();
  }

  async getNoteById(id: number) {
    return this.noteRepository.findOneBy({ id });
  }


  // TODO: Explain in comments why I chose to do it this way
  async searchNoteContents(content: string) {
    const notes = await this.noteRepository
      .createQueryBuilder()
      .select()
      .where("search_vector @@ to_tsquery('simple', :content)", { content: content.toLowerCase() })
      .getMany();

    // TODO: Add some error handling

    return notes;
  }

  async createNote(note: Note) {
    return await this.noteRepository.insert(note);
  }

  async updateNote(note: Note) {
    const {id, title, contents } = note;
    return await this.noteRepository.update({ id }, { title, contents });
  }

  async deleteNote(id: number) {
    return await this.noteRepository.delete({ id });
  }

  newNoteEntity() {
    return new Note();
  }
};