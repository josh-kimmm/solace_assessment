import { ChangeEvent, useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import { debounce } from "debounce";

import { useNotesState } from "@/client/hooks";

import { _fetchNotes } from "@/client/store/actions/notes";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  Container, 
  TextField, 
  ThemeProvider, 
  Typography, 
  createTheme, 
  styled
} from "@mui/material";
import { SearchSharp } from "@mui/icons-material";
import { deepmerge } from "@mui/utils";

import MainTheme from '@/client/theme';

import NoteView from "./NoteView";

import { Note } from "@/types";
import { NOTE_ACTIONS } from "@/client/constants";
import Loading from "../Loading";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const NoteListTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          alignContent: "flex-start"
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: "center"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: "32%",
          padding: "1rem",
          margin: ".5%",
          cursor: "pointer"
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          textAlign: "center"
        }
      }
    }
  }
});
const theme = createTheme(deepmerge(MainTheme, NoteListTheme));

const HighlightedText = styled('span')({
  background: "yellow"
});

// Need to consider moving this into a separate library or component library in the future
// if we ever needed to highlight text via search
const formatTextWithHighlight = (text: string, searchString: string): Array<string | ReactJSXElement> => { 
  // escape characters specific to regular expressions
  const escapedSearchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const parts = text.split(new RegExp(`(${escapedSearchString})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === searchString.toLowerCase() ? (
      <HighlightedText key={index} >
        {part}
      </HighlightedText>
    ) : (
      part
    )
  );
};

type PropTypes = ConnectedProps<typeof connector>;
const NoteList = (props: PropTypes) => {
  const { _fetchNotes } = props;
  const notes = useNotesState().notesToShow;

  const [selectedNote, setSelectedNote] = useState<Note | null>();
  const [openNoteView, setOpenNoteView] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [loadingNotes, setLoadingNotes] = useState<boolean>(false);

  const openNote = (note: Note) => {
    setSelectedNote(note);
    setOpenNoteView(true);
  };

  const closeNote = () => {
    setOpenNoteView(false);
  };

  const fetchNotesWithLoading = async (latestSearch?: string) => {
    setLoadingNotes(true);

    try {
      await _fetchNotes(latestSearch);
    } catch (err: any) {
      console.error(`Unable to fetch notes: ${err.message}`);
      // error state ideally set here
    }
    setLoadingNotes(false);
  };

  const searchHandler = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const latestSearch = e.target.value;
    setSearchString(latestSearch);
    fetchNotesWithLoading(latestSearch);
  };

  useEffect(() => {
    const initializeState = async () => {
      fetchNotesWithLoading();
    };
    
    initializeState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Notes_tsx = notes.map(note => 
    <Card key={note.id} variant="outlined" onClick={() => openNote(note)} >
      <CardHeader title={note.title} />
      <CardContent>{formatTextWithHighlight(note.contents, searchString)}</CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <Typography variant={"h4"} component={"h4"}>Notes</Typography>
      <TextField 
        InputProps={{
          startAdornment: <SearchSharp />
        }}
        onChange={debounce(searchHandler, 500)}
      >

      </TextField>
      <Container>
        {loadingNotes ? <Loading /> : Notes_tsx}
      </Container>
      <NoteView 
        open={openNoteView} 
        handleClose={closeNote} 
        saveAction={NOTE_ACTIONS.UPDATE} 
        id={selectedNote?.id}
        initialTitle={selectedNote?.title}
        initialContent={selectedNote?.contents}
      />
    </ThemeProvider>
  );
};

const mapDispatchToProps = {
  _fetchNotes
};

const connector = connect(null, mapDispatchToProps);

export default connector(NoteList);