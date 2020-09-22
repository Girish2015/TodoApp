import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {addNewTodo} from '../Redux/appState';
import TaskList from './TaskList';

class Home extends React.Component {
  toggleTodoStatus = (todo) => {
    const todoData = this.props.todoData;
    const newTodoList = _.map(todoData.todos, (item) => {
      if (todo.id === item.id)
        return {
          ...todo,
          completed: !todo.completed,
        };

      return item;
    });

    this.setState({
      todoData: {
        ...todoData,
        todos: newTodoList,
      },
    });
  };

  navigateCreateScreen = () => {
    this.props.navigation.navigate('CreateTodo', {
      addNewTodo: this.addNewTodo,
    });
  };

  addNewTodo = (title, details) => {
    let todo = {
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

export default connect(mapStateToProps, {addNewTodo})(Home);
