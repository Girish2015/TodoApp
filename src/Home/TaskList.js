import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../colors';
import fonts from '../fonts';
import images from '../images';
import Todo from './Todo';

export default class TaskList extends React.Component {
  state = {
    completedSectionExpanded: false,
  };

  toggleCompletedSection = () => {
    this.setState({
      completedSectionExpanded: !this.state.completedSectionExpanded,
    });
  };

  render() {
    const list = this.props.list;
    const activeTodos = [];
    const completedTodos = [];
    list.todos.forEach((todo) => {
      if (todo.completed) completedTodos.push(todo);
      else activeTodos.push(todo);
    });

    return (
      <>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{list.title}</Text>
          <View style={styles.iconContainer}>
            <Pressable onPress={this.props.navigateCreateScreen}>
              <Image source={images.plus} style={styles.plusIcon} />
            </Pressable>

            <Pressable onPress={this.props.navigateCreateScreen}>
              <Image source={images.search} style={styles.searchIcon} />
            </Pressable>
          </View>
        </View>

        {/* Active todo */}
        {activeTodos.map((activeTodo) => (
          <Todo
            key={activeTodo.createDatetime}
            todo={activeTodo}
            toggleTodoStatus={this.props.toggleTodoStatus}
            navigateEditScreen={this.props.navigateEditScreen}
          />
        ))}

        {/* Completed todo, show only when there is more than one completed todo */}
        {completedTodos.length != 0 && (
          <>
            <View style={styles.seperator} />
            <Pressable
              android_ripple={{color: colors.seperator}}
              style={styles.completedTextContainer}
              onPress={this.toggleCompletedSection}>
              <Text style={styles.completedText}>
                Completed ({completedTodos.length})
              </Text>
              <View>
                <Image
                  source={
                    this.state.completedSectionExpanded
                      ? images.arrowUp
                      : images.arrowDown
                  }
                  style={styles.arrow}
                />
              </View>
            </Pressable>

            {this.state.completedSectionExpanded &&
              completedTodos.map((completedTodo) => (
                <Todo
                  key={completedTodo.createDatetime}
                  todo={completedTodo}
                  toggleTodoStatus={this.props.toggleTodoStatus}
                  navigateEditScreen={this.props.navigateEditScreen}
                />
              ))}
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    marginLeft: 60,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 30,
    fontFamily: fonts.OpenSansSemiBold,
  },
  completedTextContainer: {
    paddingLeft: 60,
    paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  completedText: {
    fontSize: 18,
    fontFamily: fonts.OpenSansSemiBold,
  },
  seperator: {
    borderTopWidth: 1,
    borderTopColor: colors.seperator,
    marginTop: 40,
  },
  arrow: {
    width: 17,
    height: 17,
    tintColor: colors.lightGray,
    marginBottom: 5,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
    marginLeft: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
