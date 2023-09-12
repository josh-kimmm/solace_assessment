import { NextResponse, NextRequest } from 'next/server';
import { NoteService } from '@/server/db/services';
import Note from '@/server/db/entity/Note';

export async function GET(req: NextRequest) {
  try {
    const Note = await NoteService();
    const allNotes = await Note.getAllNotes();
    
    return NextResponse.json({ notes: allNotes });
  } catch (err) {
   console.error(`Server error detected in ${req.url}`);
   return NextResponse.json({ error: `Server error detected` }, { status: 500 });
  }
};

export async function POST(req: NextRequest) {
  try {
    const { title, contents }:Note = await req.json();
    const notePayload = { title, contents };
    
    const Note = await NoteService();
    const createdNote = await Note.createNote(notePayload);
  
    // payload doesn't get included on repository insertion result 
    return NextResponse.json({ new_note: {...createdNote.raw[0], ...notePayload } });
  } catch (err) {
    console.error(`Server error detected in ${req.url}`);
    return NextResponse.json({ error: `Server error detected` }, { status: 500 });
  }

};