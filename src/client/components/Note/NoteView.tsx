import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import { ConnectedProps, connect } from "react-redux";
import { _createNote, _deleteNote, _updateNote } from "@/client/store/actions/notes";

import { 
  NOTE_ACTIONS, 
  ERROR_CONTENT_LENGTH
} from "@/client/constants";

import { 
  Modal, 
  ThemeProvider, 
  createTheme, 
  Paper, 
  TextField, 
  Stack,
  Button,
  IconButton,
  ButtonGroup,
  styled,
  Typography
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Loading from "../Loading";
import { checkContentsLength } from "@/client/lib/utils/stringHelpers";


const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          position: "relative",
          padding: "1rem 3rem",
          margin: "2% 10%",
          height: "90vh"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          paddingBottom: "1.5rem",
          justifyContent: "flex-start"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          alignItems: "flex-start"
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    }
  }
});

const TextField_Title = styled(TextField)({
  marginTop: "2.5rem"
});

const TextField_Content = styled(TextField)({
  height: "63vh",
});

const Button_Action = styled(Button)({
  width: "5rem"
});

const Button_Close = styled(IconButton)({
  position: "absolute",
  top: ".5rem",
  right: ".5rem",
  alignSelf: "flex-end"
});
const ErrorText = styled(Typography)({
  marginRight: "auto"
});
const Stack_Errors_ButtonGroup = styled(Stack)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
});

type PropTypes = ConnectedProps<typeof connector> & { 
  open: boolean,
  handleClose: () => void,
  saveAction?: typeof NOTE_ACTIONS[keyof typeof NOTE_ACTIONS],
  id?: number,
  initialTitle?: string,
  initialContent?: string
};
const NoteView = (props: PropTypes) => {
  const { 
    open, 
    handleClose, 
    saveAction,
    id,
    initialTitle, 
    initialContent,
    _createNote,
    _updateNote,
    _deleteNote
  } = props;

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [showLoadSpinner, setShowLoadSpinner] = useState<boolean>(false);
  const [contentLengthError, setContentLengthError] = useState<string>("");

  const saveNote = async () => {
    const saveContents = saveAction === NOTE_ACTIONS.CREATE ? _createNote : _updateNote;
    setShowLoadSpinner(true);

    try {
      const updatedNote = await saveContents({ id, title, contents });
      console.log(`updatedNote: ${updatedNote}`);
    } catch(err: any) {
      console.error(`Something wrong with saving the note: ${err.message}`);
      setShowLoadSpinner(false);
      return;
    }

    setTitle("");
    setContents("");
    setShowLoadSpinner(false);

    handleClose();
  };

  const deleteNote = async () => {
    setShowLoadSpinner(true);
    try {
      const updatedNote = await _deleteNote({ id, title, contents });
      console.log(`updatedNote: ${updatedNote}`);
    } catch(err: any) {
      console.error(`Something wrong with saving the note: ${err.message}`);
      setShowLoadSpinner(false);
      return;
    }

    setTitle("");
    setContents("");
    setShowLoadSpinner(false);

    handleClose();
  };

  const onCloseHandler = async () => {
    setContents(initialContent || "");
    setTitle(initialTitle || "");
    setContentLengthError("");
    handleClose();
  }

  const keyStrokeSave = (e: KeyboardEvent) => {
    if(e.key === "Enter" && e.ctrlKey && checkContentsLength(contents))
      saveNote();
    
  };

  const contentsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContents = e.target.value;
    setContents(e.target.value)
    
    if(!checkContentsLength(newContents)){
      setContentLengthError(ERROR_CONTENT_LENGTH);
      return;
    }

    setContentLengthError("");
  }

  useEffect(() => {
    setTitle(initialTitle || "");
    setContents(initialContent || "");

  }, [initialTitle, initialContent]);

  return (
    <ThemeProvider theme={theme}>
      {showLoadSpinner && <Loading appLoading />}
      <Modal open={open} onClose={onCloseHandler} >
        <Paper>
          <Stack>
            <Button_Close onClick={onCloseHandler} >
              <Close />
            </Button_Close>
            <TextField_Title
              autoFocus={saveAction === NOTE_ACTIONS.CREATE}
              placeholder="Enter a Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={keyStrokeSave}
            />
            <TextField_Content
              autoFocus={saveAction === NOTE_ACTIONS.UPDATE}
              multiline
              placeholder="Enter content here"
              helperText="Notes can only be 20 - 300 characters long"
              value={contents}
              onChange={contentsChangeHandler}
              onKeyDown={keyStrokeSave}

            />
            <Stack_Errors_ButtonGroup>
              {contentLengthError && <ErrorText color="error">{contentLengthError}</ErrorText>}
              <ButtonGroup>
                <Button_Action
                  variant="contained"
                  color="error"
                  onClick={deleteNote}
                >
                  Delete
                </Button_Action>
                <Button_Action 
                  variant="contained"
                  onClick={saveNote}
                  disabled={contentLengthError.length > 0}
                >
                  Save
                </Button_Action>
              </ButtonGroup>
            </Stack_Errors_ButtonGroup>
          </Stack>
        </Paper>
      </Modal>
    </ThemeProvider>
  )
};

const mapDispatchToProps = {
  _createNote,
  _updateNote,
  _deleteNote
}
const connector = connect(null, mapDispatchToProps);

export default connector(NoteView);