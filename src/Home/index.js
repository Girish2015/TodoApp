import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {addNewTodo, toggleTodoStatus, editTodo} from '../Redux/appState';
import TaskList from './TaskList';

class Home extends React.Component {
  navigateCreateScreen = () => {
    this.props.navigation.navigate('CreateTodo', {
      addNewTodo: this.addNewTodo,
    });
  };

  navigateEditScreen = (todo) => {
    this.props.navigation.navigate('CreateTodo', {
      todo,
      editTodo: this.editTodo,
    });
  };

  toggleTodoStatus = (todo) => {
    this.props.toggleTodoStatus(todo.id);
  };

  editTodo = (id, title, details) => {
    this.props.editTodo(id, title, details);
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
          navigateEditScreen={this.navigateEditScreen}
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

export default connect(mapStateToProps, {
  addNewTodo,
  toggleTodoStatus,
  editTodo,
})(Home);
