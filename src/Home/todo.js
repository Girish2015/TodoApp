import LottieView from 'lottie-react-native';
import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../colors';
import fonts from '../fonts';
import images from '../images';

export default class Todo extends React.Component {
  state = {
    playAnimation: false,
  };

  onCheckboxPress = () => {
    this.setState({
      playAnimation: true,
    });
  };

  navigateEditScreen = () => {
    this.props.navigateEditScreen(this.props.todo);
  };

  renderCheckbox = (todo) => {
    if (todo.completed)
      return (
        <Pressable
          hitSlop={10}
          onPress={() => this.props.toggleTodoStatus(todo)}>
          <Image style={styles.checkmark} source={images.rightCheckmark} />
        </Pressable>
      );
    if (this.state.playAnimation)
      return (
        <LottieView
          autoPlay={true}
          loop={false}
          source={require('../../assets/animations/checkmark.json')}
          style={styles.lottieAnimation}
          onAnimationFinish={() => this.props.toggleTodoStatus(todo)}
          speed={0.8}
        />
      );

    return (
      <Pressable
        hitSlop={10}
        style={styles.checkbox}
        onPress={this.onCheckboxPress}
      />
    );
  };

  render() {
    const todo = this.props.todo;
    return (
      <Pressable style={styles.container} onPress={this.navigateEditScreen}>
        <View style={styles.checkboxContainer}>
          {this.renderCheckbox(todo)}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={styles.todoTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {todo.title}
          </Text>
          {todo.details ? (
            <Text
              style={styles.todoDetails}
              numberOfLines={2}
              ellipsizeMode={'tail'}>
              {todo.details}
            </Text>
          ) : null}
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxContainer: {
    width: 60,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'flex-start',
    // marginTop: 5,
  },
  checkbox: {
    backgroundColor: '#fff',
    borderRadius: 100,
    borderColor: colors.lightGray,
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  lottieAnimation: {
    width: 60,
    height: 60,
  },
  textContainer: {
    marginRight: 20,
  },
  todoTitle: {
    fontSize: 18,
    fontFamily: fonts.OpenSansRegular,
    width: 300,
  },
  todoDetails: {
    fontSize: 13,
    fontFamily: fonts.OpenSansRegular,
    width: 300,
    marginTop: 10,
  },
  checkmark: {
    width: 20,
    height: 14,
    tintColor: colors.primary,
  },
});
