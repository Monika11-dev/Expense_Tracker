import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuth-slice";

// creating store

const store = configureStore({
    reducer : {userAuth : userAuthSlice.reducer, }
});

export default store;