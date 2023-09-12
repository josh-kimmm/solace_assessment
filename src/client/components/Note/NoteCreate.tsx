import { useState } from "react";

import { _createNote } from "@/client/store/actions/notes";


import { Stack, Button, styled } from "@mui/material";
import NoteView from "./NoteView";

import { NOTE_ACTIONS } from "@/client/constants";

const Button_CreateNote = styled(Button)({
  width: "12rem"
})

const NoteCreate = () => {
  const [showNoteView, setShowNoteView] = useState<boolean>(false);
  const openNoteView = () => setShowNoteView(true);
  const closeNoteView = () => setShowNoteView(false);

  return (
    <Stack>
      <Button_CreateNote
        variant="contained"
        onClick={openNoteView}
      >
        Create new Note
      </Button_CreateNote>
      <NoteView
        open={showNoteView} 
        handleClose={closeNoteView}
        saveAction={NOTE_ACTIONS.CREATE}
      />
    </Stack>
  )

};

export default NoteCreate;