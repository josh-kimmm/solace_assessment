import { NextResponse, NextRequest } from 'next/server';
import { NoteService } from '@/server/db/services';

export async function POST(req: NextRequest) {
  const { textToSearch } = await req.json();
  const Note = await NoteService();

  const notes = await Note.searchNoteContents(textToSearch);

  return NextResponse.json({ notes });

};