import * as React from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import colors from '../colors';
import fonts from '../fonts';
import images from '../images';

const numberOfLines = 9;

export default class CreateTodo extends React.Component {
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
          <Pressable onPress={() => this.props.navigation.goBack()}>
            <Image source={images.androidBack} style={styles.androidBack} />
          </Pressable>
          <View style={styles.headerRightContainer}>
            <Pressable
              onPress={() => {}}
              style={styles.rightCheckmarkContainer}>
              <Image
                source={images.rightCheckmark}
                style={styles.rightCheckmark}
              />
            </Pressable>
            <Image source={images.delete} style={styles.delete} />
          </View>
        </View>

        {/* Todo */}
        <View style={styles.todoContainer}>
          <TextInput
            placeholder={'Title'}
            onChangeText={(title) => this.setState({title})}
            style={styles.titleInput}
            autoFocus={true}
          />
          <View style={styles.todoDetails}>
            <View style={styles.detailsInputRightLine} />
            <View style={styles.detailsInputLinesContainer}>
              {this.renderLines()}
            </View>
            <TextInput
              placeholder={'Details'}
              onChangeText={(details) => this.setState({details})}
              style={styles.detailsInput}
              multiline={true}
              numberOfLines={10}
              defaultValue={' '}
            />
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
    marginRight: 30,
    marginTop: 3,
  },
  rightCheckmark: {
    width: 22,
    height: 16,
    tintColor: colors.lightGray,
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
    fontSize: 18,
    fontFamily: fonts.OpenSansSemiBold,
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
    // fontFamily: fonts.OpenSansRegular,
    position: 'absolute',
    top: 0,
    left: 30,
    width: '100%',
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
  detailsInputLinesContainer: {
    position: 'absolute',
    top: 3,
    left: 0,
    height: '100%',
    width: '100%',
  },
  detailsInputLines: {
    height: 36,
    width: '100%',
    borderBottomColor: colors.seperator,
    borderBottomWidth: 1,
  },
});
