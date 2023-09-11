import { useState } from "react";

import { ConnectedProps, connect } from "react-redux";
import { _createNote } from "@/client/store/actions/notes";


import { TextField, Container, Box, Stack, Typography } from "@mui/material";


type PropTypes = ConnectedProps<typeof connector>;
const NoteCreate = (props: PropTypes) => {
  const { _createNote } = props;
  
  const [contents, setContents] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  return (
    <Stack>
      <Typography variant="h4" component="h4">
        Create new Note
      </Typography>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField 
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
    </Stack>
  )

};

const mapDispatchToProps = {
  _createNote
};

const connector = connect(null, mapDispatchToProps);

export default connector(NoteCreate);