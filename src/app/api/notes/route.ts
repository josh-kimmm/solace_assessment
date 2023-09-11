import { NextResponse, NextRequest } from 'next/server';
import { NoteService } from '@/server/db/services';
import Note from '@/server/db/entity/Note';

export async function GET() {
  const Note = await NoteService();
  const allNotes = await Note.getAllNotes();

  // TODO: add error handling if fetch wasn't successful
  
  return NextResponse.json({ notes: allNotes });
};


export async function POST(req: NextRequest) {
  const { title, contents }:Note = await req.json();
  const Note = await NoteService();

  // TODO: add error handling if update or insert wasn't successful

  const createdNote = await Note.createNote({ title, contents });

  return NextResponse.json({ new_note: createdNote });

};