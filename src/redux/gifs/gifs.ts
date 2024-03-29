// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];
// export const visitedGifs = createSlice({
//   name: "visitedGifs",
//   initialState,
//   reducers: {
//     addVisitedGif: (state, action) => [...state, action.payload],
//   },
// });
// export const { addVisitedGif } = visitedGifs.actions;
// export default visitedGifs.reducer;
const typeactions = {
  addVisitedGif: (state, payload) => {
    const isExists = state.find((gif) => gif.id === payload.id);
    return isExists ? state : [...state, payload];
  },
  deleteVisitedGif: (state, payload) => {
    const newState = state.filter((gif) => gif.id !== payload.id);
    return newState;
  },
};

export interface Gif {
  id: string;
  title: string;
}

const initialState = [];
type Actions = {
  type: keyof typeof typeactions;
  payload: Gif;
};

const reducer = (
  state = initialState as Gif[],
  actions : Actions,
) => {
  const {type, payload} = actions;
  const handler = typeactions[type];
  const newState = handler ? handler(state, payload) : state;
  return newState;
};

export default reducer;
