import { NextResponse, NextRequest } from 'next/server';
import { NoteService } from '@/server/db/services';
import Note from '@/server/db/entity/Note';


export async function POST(req: NextRequest, { params }: { params: { note_id: string } }) {
  const id = parseInt(params.note_id);
  const { title, contents }:Note = await req.json();
  const Note = await NoteService();

  const foundNote = await Note.getNoteById(id);

  if(!foundNote)
    return NextResponse.json({ error: `Unable to find note with id ${id}` }, { status: 400 });
  
  // TODO: add error handling if update wasn't successful

  const createdNote = await Note.updateNote({ id, title, contents });

  return NextResponse.json({ created_note: createdNote });

};

export async function DELETE(req: NextRequest, { params }: { params: { note_id: string } }) {
  const id = parseInt(params.note_id);
  const Note = await NoteService();
 
  // TODO: add error handling if note wasn't deleted

  const deletedNote = await Note.deleteNote(id);

  return NextResponse.json({ deletedNote });
}