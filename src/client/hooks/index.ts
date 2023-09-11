import { useSelector } from "react-redux";

import type { State } from '@/types';

const useNotesState = () => useSelector((state: ReturnType<State>) => state.notes);



export { useNotesState };