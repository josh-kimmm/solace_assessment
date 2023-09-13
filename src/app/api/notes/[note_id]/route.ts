import { NextResponse, NextRequest } from 'next/server';
import { NoteService } from '@/server/services';
import Note from '@/server/db/entity/Note';


export async function POST(req: NextRequest, { params }: { params: { note_id: string } }) {
  try {
    const id = parseInt(params.note_id);
    const { title, contents }:Note = await req.json();
    const Note = await NoteService();
    
    const foundNote = await Note.getNoteById(id);
    
    if(!foundNote)
      return NextResponse.json({ error: `Unable to find note with id ${id}` }, { status: 400 });
    
    const createdNote = await Note.updateNote({ id, title, contents });
    
    if(!createdNote.affected)
      return NextResponse.json({ error: `Failed to update note` }, { status: 500 });
    
    return NextResponse.json({ updated_note: createdNote.raw[0] });
  } catch(err: any) {
    console.error(`Server error detected in ${req.url}`);
    return NextResponse.json({ error: `Server error detected` }, { status: 500 });
  }
};

export async function DELETE(req: NextRequest, { params }: { params: { note_id: string } }) {
  try {
    const id = parseInt(params.note_id);
    const Note = await NoteService();
  
    const deletedNote = await Note.deleteNote(id);
  
    if(!deletedNote.affected)
      return NextResponse.json({ error: `Failed to delete note` }, { status: 500 })
  
    return NextResponse.json({ deleted_note: deletedNote.raw[0] });
  } catch(err: any) {
    console.error(`Server error detected in ${req.url}`);
    return NextResponse.json({ error: `Server error detected` }, { status: 500 });
  }
}