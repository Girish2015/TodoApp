import moment from 'moment';

const ADD_NEW_TODO = 'ADD_NEW_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';
const DELETE_TODO = 'DELETE_TODO';

export const initialState = {
  title: 'My Todos',
  todos: [
    {
      id: moment().toISOString(),
      title: 'You first task',
      details:
        'This is a sample todo. Create new todos using the plus icon on the top. 😀',
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

export function editTodo(id, title, details) {
  return (dispatch) => {
    dispatch({
      type: EDIT_TODO,
      payload: {id, title, details},
    });
  };
}

export function deleteTodo(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_TODO,
      payload: id,
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
  const todos = state.todos;
  let newTodos = [];

  switch (action.type) {
    case ADD_NEW_TODO:
      return Object.assign({}, state, {
        ...state,
        todos: [action.payload, ...state.todos],
      });

    case EDIT_TODO:
      const {id, title, details} = action.payload;
      newTodos = todos.map((todo) =>
        todo.id === id ? {...todo, title, details} : todo,
      );
      return Object.assign({}, state, {
        ...state,
        todos: newTodos,
      });

    case DELETE_TODO:
      newTodos = todos.filter((todo) => todo.id !== action.payload);
      return Object.assign({}, state, {
        ...state,
        todos: newTodos,
      });

    case TOGGLE_TODO_STATUS:
      const todoID = action.payload;
      newTodos = todos.map((todo) =>
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
