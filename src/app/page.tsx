'use client'

import { Container, ThemeProvider } from '@mui/material';

import MainTheme from '@/client/theme';
import NoteList from '@/client/components/Note/NoteList';
import NoteCreate from '@/client/components/Note/NoteCreate';

const Home = () => {
  return (
    <ThemeProvider theme={MainTheme}>
      <Container>
        <NoteCreate />
        <NoteList />
      </Container>

    </ThemeProvider>
      
  )
};

export default Home;