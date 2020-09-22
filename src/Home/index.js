import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {addNewTodo, toggleTodoStatus} from '../Redux/appState';
import TaskList from './TaskList';

class Home extends React.Component {
  navigateCreateScreen = () => {
    this.props.navigation.navigate('CreateTodo', {
      addNewTodo: this.addNewTodo,
    });
  };

  toggleTodoStatus = (todo) => {
    this.props.toggleTodoStatus(todo.id);
  };

  addNewTodo = (title, details) => {
    let todo = {
      id: moment().toISOString(),
      title: title,
      details: details,
      completed: false,
      createDatetime: moment().toISOString(),
    };

    this.props.addNewTodo(todo);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TaskList
          list={this.props.todoData}
          toggleTodoStatus={this.toggleTodoStatus}
          navigateCreateScreen={this.navigateCreateScreen}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoData: state.app,
  };
}

export default connect(mapStateToProps, {addNewTodo, toggleTodoStatus})(Home);
