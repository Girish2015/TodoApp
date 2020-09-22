const ADD_NEW_TODO = 'ADD_NEW_TODO';

export const initialState = {
  title: 'My Todos',
  todos: [
    {
      id: 1,
      title: 'You first todo',
      details: 'This is your fist sample todo',
      completed: false,
    },
  ],
};

export function addNewTodo(todo) {
  return (dispatch) => {
    dispatch({
      type: ADD_NEW_TODO,
      payload: todo,
    });
  };
}

export default function AppStateReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TODO:
      return Object.assign({}, state, {
        ...state,
        todos: [...state.todos, action.payload],
      });

    default:
      return state;
  }
}
