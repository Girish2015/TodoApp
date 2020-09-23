import * as React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import colors from '../colors';
import fonts from '../fonts';
import images from '../images';
import Todo from './todo';

export default class TaskList extends React.Component {
  state = {
    completedSectionExpanded: false,
    searchMode: false,
    searchText: '',
  };

  toggleCompletedSection = () => {
    this.setState({
      completedSectionExpanded: !this.state.completedSectionExpanded,
    });
  };

  toggleSearchMode = () => {
    this.setState({searchMode: !this.state.searchMode, searchText: ''});
  };

  searchTextChange = (searchText) => {
    this.setState({searchText: searchText.toLowerCase()});
  };

  todoSearchMatch = (todo) => {
    if (!this.state.searchMode) return true;
    if (todo.title && todo.title.toLowerCase().includes(this.state.searchText))
      return true;
    if (
      todo.details &&
      todo.details.toLowerCase().includes(this.state.searchText)
    )
      return true;

    return false;
  };

  renderHeader = () => {
    if (this.state.searchMode)
      return (
        <View style={styles.headingContainer}>
          <TextInput
            placeholder={'Search Todos'}
            onChangeText={this.searchTextChange}
            style={styles.searchInput}
            autoFocus={true}
          />
          <View style={styles.closeIconContainer}>
            <Pressable hitSlop={10} onPress={this.toggleSearchMode}>
              <Image source={images.close} style={styles.closeIcon} />
            </Pressable>
          </View>
        </View>
      );

    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{this.props.list.title}</Text>
        <View style={styles.iconContainer}>
          <Pressable hitSlop={10} onPress={this.props.navigateCreateScreen}>
            <Image source={images.plus} style={styles.plusIcon} />
          </Pressable>

          <View style={styles.searchIconContainer}>
            <Pressable hitSlop={10} onPress={this.toggleSearchMode}>
              <Image source={images.search} style={styles.searchIcon} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const activeTodos = [];
    const completedTodos = [];
    list.todos.forEach((todo) => {
      // Apply the search condition
      if (this.todoSearchMatch(todo))
        if (todo.completed)
          // Split the data into active and completed arrays
          completedTodos.push(todo);
        else activeTodos.push(todo);
    });

    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        {this.renderHeader()}

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
      </ScrollView>
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
  searchIconContainer: {
    marginLeft: 30,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 18,
    height: 18,
    tintColor: colors.lightGray,
  },
  searchInput: {
    fontSize: 18,
    fontFamily: fonts.OpenSansRegular,
    width: '80%',
  },
});
