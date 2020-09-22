import * as React from 'react';
import {View} from 'react-native';
import BottomBar from './BottomBar';
import TaskList from './TaskList';
import _ from 'lodash';

const testData = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: 'My Tasks',
    todos: [
      {
        id: 1,
        title: 'Finish the today',
        details: `You will have to finish all the functionality today so that rest of
        the days can be spent of other features`,
        completed: false,
      },
    ],
  },
];

export default class Home extends React.Component {
  state = {
    todoList: testData,
    selectedTodoList: testData[0],
  };

  toggleTodoStatus = (todo) => {
    const selectedTodoList = this.state.selectedTodoList;
    const newTodoList = _.map(selectedTodoList.todos, (item) => {
      if (todo.id === item.id)
        return {
          ...todo,
          completed: !todo.completed,
        };

      return item;
    });

    this.setState({
      selectedTodoList: {
        ...selectedTodoList,
        todos: newTodoList,
      },
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TaskList
          list={this.state.selectedTodoList}
          toggleTodoStatus={this.toggleTodoStatus}
        />
        <BottomBar />
      </View>
    );
  }
}
