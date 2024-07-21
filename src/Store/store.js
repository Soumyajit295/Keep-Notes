import { configureStore } from "@reduxjs/toolkit";
import noteReducer from '../Features/notesSice'

export const store = configureStore({
    reducer : {
        notes : noteReducer
    }
})