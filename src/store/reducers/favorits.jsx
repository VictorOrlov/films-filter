const initialState = JSON.parse(localStorage.getItem("myFavorits")) || [];

const favorits = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_FAVORIT':
      return [
        ...state,
        action.payload
      ];
    case 'DELETE_FAVORIT':
    return [
      ...state.filter(favorit => favorit.id !== action.payload)
    ];
    default: return state;
  }
}

export default favorits;