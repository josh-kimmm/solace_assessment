import { useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import { useNotesState } from "@/client/hooks";

import { _fetchNotes } from "@/client/store/actions/notes";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  Container, 
  ThemeProvider, 
  Typography, 
  createTheme 
} from "@mui/material";
import MainTheme from '@/client/theme';
import { deepmerge } from "@mui/utils";

const NoteListTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
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
          width: "33%",
          padding: "1rem"
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

type PropTypes = ConnectedProps<typeof connector>;
const NoteList = (props: PropTypes) => {
  const { _fetchNotes } = props;
  const notes = useNotesState().notesToShow;
  

  useEffect(() => {
    const initializeState = async () => {
      await _fetchNotes();
    };
    
    initializeState();
  }, [_fetchNotes]);

  const Notes_tsx = notes.map(note => 
    <Card key={note.id} variant="outlined">
      <CardHeader title={note.title} />
      <CardContent>{note.contents}</CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <Typography variant={"h4"} component={"h4"}>Notes</Typography>
      <Container>
        {Notes_tsx}
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = {
  _fetchNotes
};

const connector = connect(null, mapDispatchToProps);

export default connector(NoteList);