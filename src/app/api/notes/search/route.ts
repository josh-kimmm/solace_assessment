import { NextResponse, NextRequest } from 'next/server';
import { NoteService } from '@/server/services';

export async function POST(req: NextRequest) {
  try {
    const { textToSearch } = await req.json();
    const Note = await NoteService();
  
    const notes = await Note.searchNoteContents(textToSearch);
  
    return NextResponse.json({ notes });
    
  } catch(err: any) {
    console.error(`Server error detected in ${req.url}`);
    return NextResponse.json({ error: `Server error detected` }, { status: 500 });
  }
};