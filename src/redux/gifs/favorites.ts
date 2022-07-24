const typeactions = {
    addFavoritedGif: (state, payload) => {
      const isExists = state.find((gif) => gif.id === payload.id);
      return isExists ? state : [...state, payload];
    },
    deletFavoritedGif: (state, payload) => {
        const newState = state.filter((gif) => gif.id !== payload.id);
        return newState;
      },
  };
  export interface GifFavorites {
    id: string;
    title: string;
  }
  
  const initialState = [];
  type Actions = {
    type: keyof typeof typeactions;
    payload: GifFavorites;
  };
  
  const favoritesReducer = (
    state = initialState as GifFavorites[],
    actions : Actions,
  ) => {
    const {type, payload} = actions;
    const handler = typeactions[type];
    const newState = handler ? handler(state, payload) : state;
    return newState;
  };
  
  export default favoritesReducer;