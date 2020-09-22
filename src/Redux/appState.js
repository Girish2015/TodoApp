import moment from 'moment';

const ADD_NEW_TODO = 'ADD_NEW_TODO';
const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';

export const initialState = {
  title: 'My Todos',
  todos: [
    {
      id: moment().toISOString(),
      title: 'You first todo',
      details: 'This is your fist sample todo',
      completed: false,
      createDatetime: moment().toISOString(),
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

export function toggleTodoStatus(todoID) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TODO_STATUS,
      payload: todoID,
    });
  };
}

export default function AppStateReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TODO:
      return Object.assign({}, state, {
        ...state,
        todos: [action.payload, ...state.todos],
      });

    case TOGGLE_TODO_STATUS:
      const todoID = action.payload;
      const todos = state.todos;
      const newTodos = todos.map((todo) =>
        todo.id === todoID ? {...todo, completed: !todo.completed} : todo,
      );
      return Object.assign({}, state, {
        ...state,
        todos: newTodos,
      });

    default:
      return state;
  }
}
