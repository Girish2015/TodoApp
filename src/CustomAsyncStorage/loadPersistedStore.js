import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import CustomAsyncStorage from './customAsyncStorage';

// This will load the persisted store from storage and update the redux store
// Will prevent loading the app untill the store is retrived
export default class LoadPersistedStore extends React.Component {
  state = {
    persistedStoreLoaded: false,
  };

  componentDidMount() {
    CustomAsyncStorage.getAppState(this.storeCallback);
  }

  storeCallback = (persistedStore) => {
    const persistedStoreJson = JSON.parse(persistedStore);
    if (persistedStoreJson)
      this.props.store.dispatch({
        type: 'REFRESH_FROM_STORAGE',
        payload: persistedStoreJson.app,
      });
    this.setState({persistedStoreLoaded: true});
  };

  render() {
    if (this.state.persistedStoreLoaded) return this.props.children;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
