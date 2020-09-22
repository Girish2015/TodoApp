import * as React from 'react';
import {View} from 'react-native';
import TaskList from './TaskList';
import _ from 'lodash';

const testData = {
  title: 'My Tasks',
  todos: [
    {
      id: 1,
      title: 'Finish the functionality',
      details: `You will have to finish all the stuff`,
      completed: false,
    },
    {
      id: 2,
      title: 'Finish the functionality today',
      details: `You will have to finish all the functionality today so that rest of
        the days can be spent of other features`,
      completed: false,
    },
    {
      id: 3,
      title: 'Basic setup done',
      completed: false,
    },
  ],
};

export default class Home extends React.Component {
  state = {
    todoData: testData,
  };

  toggleTodoStatus = (todo) => {
    const todoData = this.state.todoData;
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
          list={this.state.todoData}
          toggleTodoStatus={this.toggleTodoStatus}
          createTodo={this.createTodo}
        />
      </View>
    );
  }
}
