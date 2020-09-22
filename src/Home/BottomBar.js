import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../colors';
import images from '../images';

export default function BottomBar() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'transparent']}
        style={styles.linearGradient}
      />
      <View style={styles.logoRowContainer}>
        <View>
          <Image source={images.hamburgerMenu} style={styles.hamburgerMenu} />
        </View>
        <View style={styles.plusIconContainer}>
          <Image source={images.plus} style={styles.plusIcon} />
        </View>
        <View>
          <Image source={images.threeDots} style={styles.threeDots} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  linearGradient: {
    left: 0,
    right: 0,
    height: 2,
  },
  logoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 8,
  },
  hamburgerMenu: {
    width: 23,
    height: 23,
    tintColor: colors.lightGray,
  },
  plusIconContainer: {
    marginVertical: 0,
    elevation: 3,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 100,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: colors.lightGray,
  },
  threeDots: {
    width: 20,
    height: 20,
    tintColor: colors.lightGray,
  },
});
