import * as React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import colors from '../colors';
import fonts from '../fonts';
import images from '../images';

const numberOfLines = 100;

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props);

    const {todo} = props.route.params;
    if (todo)
      this.state = {
        editMode: true,
        todo,
        title: todo.title,
        details: todo.details,
      };
    else this.state = {};
  }

  checkmarkTouch = () => {
    if (this.state.editMode) this.editTodo();
    else this.addNewTodo();
  };

  editTodo = () => {
    const {todo, title, details} = this.state;
    const {editTodo} = this.props.route.params;

    editTodo(todo.id, title, details);
    this.props.navigation.goBack();
  };

  deleteTouch = () => {
    Alert.alert('Sure you want to delete this?', 'This cannot be undone', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: this.deleteTodo},
    ]);
  };

  deleteTodo = () => {
    const {deleteTodo} = this.props.route.params;
    const {todo} = this.state;

    deleteTodo(todo.id);
    this.props.navigation.goBack();
  };

  addNewTodo = () => {
    const {title, details} = this.state;
    if (!title) {
      ToastAndroid.show('Enter title', ToastAndroid.LONG);
      return;
    }
    const {addNewTodo} = this.props.route.params;
    addNewTodo(title, details);
    this.props.navigation.goBack();
  };

  renderLines = () => {
    let lines = [];
    for (let i = 0; i < numberOfLines; ++i) {
      lines.push(<View key={i} style={styles.detailsInputLines} />);
    }
    return lines;
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Pressable
            hitSlop={10}
            onPress={() => this.props.navigation.goBack()}>
            <Image source={images.androidBack} style={styles.androidBack} />
          </Pressable>
          <View style={styles.headerRightContainer}>
            <Pressable
              hitSlop={10}
              onPress={this.checkmarkTouch}
              style={styles.rightCheckmarkContainer}>
              <Image
                source={images.rightCheckmark}
                style={styles.rightCheckmark}
              />
            </Pressable>
            {this.state.editMode && (
              <Pressable
                hitSlop={10}
                onPress={this.deleteTouch}
                style={styles.deleteContainer}>
                <Image source={images.delete} style={styles.delete} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Todo */}
        <View style={styles.todoContainer}>
          <TextInput
            placeholder={'Title'}
            onChangeText={(title) => this.setState({title})}
            style={styles.titleInput}
            autoFocus={true}
            defaultValue={this.state.title}
          />
          <View style={styles.todoDetails}>
            <View style={styles.detailsInputRightLine} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}>
              {this.renderLines()}
              <TextInput
                placeholder={'Details'}
                onChangeText={(details) => this.setState({details})}
                style={styles.detailsInput}
                multiline={true}
                defaultValue={this.state.details}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
  },
  androidBack: {
    width: 20,
    height: 20,
    tintColor: colors.lightGray,
  },
  rightCheckmarkContainer: {
    marginTop: 3,
  },
  rightCheckmark: {
    width: 22,
    height: 16,
    tintColor: colors.lightGray,
  },
  deleteContainer: {
    marginLeft: 30,
  },
  delete: {
    width: 20,
    height: 20,
    tintColor: colors.lightGray,
  },
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoContainer: {
    marginTop: 30,
  },
  titleInput: {
    fontSize: 25,
    fontFamily: fonts.OpenSansRegular,
    marginHorizontal: 40,
  },
  todoDetails: {
    marginTop: 30,
    height: 360,
    marginRight: 40,
    marginLeft: 10,
  },
  detailsInput: {
    fontSize: 18,
    fontFamily: fonts.OpenSansRegular,
    position: 'absolute',
    top: 0,
    left: 30,
    width: '90%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
    lineHeight: 36,
  },
  detailsInputBackground: {
    height: 360,
  },
  detailsInputRightLine: {
    borderLeftWidth: 2,
    borderLeftColor: 'rgb(252,204,51)',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 20,
  },
  detailsInputLines: {
    height: 36,
    width: '100%',
    borderBottomColor: colors.seperator,
    borderBottomWidth: 1,
  },
  scrollView: {
    margin: 0,
    padding: 0,
    paddingTop: 1,
  },
});
