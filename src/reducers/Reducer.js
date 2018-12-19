const initialState = {
  keyword:"harry potter",
  fonte:14,
  selectedMovie:"",
  Movie:"",
  related:"",
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_KEYWORD": {
      return {...state, keyword:action.payload}
    }
    case "CHANGE_FONTE-":{
      state.fonte = state.fonte-1
    }
    case "CHANGE_SELECTED":{
     return {...state, selectedMovie:action.payload}
    }
    case "CHANGE_MOVIE":{
      return {...state, Movie:action.payload}
     }
     case "CHANGE_RELATED":{
      return {...state, related:action.payload}
     }
    default:
      return state;
  }
};
