import * as React from 'react';
import {View} from 'react-native';
import TaskList from './TaskList';
import _ from 'lodash';
import {connect} from 'react-redux';
import {addNewTodo} from '../Redux/appState';

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

  createTodo = () => {
    this.props.navigation.navigate('CreateTodo');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TaskList
          list={this.props.todoData}
          toggleTodoStatus={this.toggleTodoStatus}
          createTodo={this.createTodo}
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
