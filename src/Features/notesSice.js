import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    filterNotes: JSON.parse(localStorage.getItem('filterNotes')) || [],
    filteredNotesEnable: false,
    noFilterNotes: false, 
    isEdit: false,
    editTitle: '',
    editDescription: '',
    editId: null
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            const note = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                time : action.payload.time
            };
            state.notes.push(note);
            localStorage.setItem('notes', JSON.stringify(state.notes));
        },
        removeNote: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
            localStorage.setItem('notes', JSON.stringify(state.notes));
        },
        changeEditCredential: (state, action) => {
            const { title, description, id } = action.payload;
            state.isEdit = true;
            state.editTitle = title;
            state.editDescription = description;
            state.editId = id;
        },
        updateNotes: (state, action) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            const {time} = action.payload
            const newUpdatedTime = time.replace("Added",'Updated')
            if (index !== -1) {
                state.notes[index].title = action.payload.title;
                state.notes[index].description = action.payload.description;
                state.notes[index].time = newUpdatedTime
            }
            localStorage.setItem('notes', JSON.stringify(state.notes));
            state.isEdit = false
        },
        filterNotes: (state, action) => {
            state.filterNotes = state.notes.filter((note) =>
                note.title.toLowerCase().includes(action.payload.toLowerCase())
            );
            if (state.filterNotes.length === 0) {
                state.noFilterNotes = true;
            } else {
                state.noFilterNotes = false;
                state.filteredNotesEnable = true;
            }
            localStorage.setItem('filterNotes', JSON.stringify(state.filterNotes));
        },
        removeFilter: (state, action) => {
            state.filteredNotesEnable = false;
            state.filterNotes = [];
            state.noFilterNotes = false; 
            localStorage.setItem('filterNotes', JSON.stringify(state.filterNotes));
        }
    }
});

export const { addNote, removeNote, changeEditCredential, updateNotes, filterNotes, removeFilter } = noteSlice.actions;

export default noteSlice.reducer;
