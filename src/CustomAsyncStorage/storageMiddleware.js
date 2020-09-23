import CustomAsyncStorage from './customAsyncStorage';

// Middelware to store the application state whenever it changes

export default customStorageMiddelware = (store) => (next) => (action) => {
  let result = next(action);

  // Store the new state
  const newState = JSON.stringify(store.getState());
  CustomAsyncStorage.storeAppState(newState);

  return result;
};
