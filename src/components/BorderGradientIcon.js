import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgAsset from './SvgAsset';

const BorderGradientIcon = ({iconName}) => {
  return (
    <LinearGradient
      colors={['#006CF4', '#666666']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.linearGradient}>
      <View style={styles.innerContainer}>
        <SvgAsset
          name={iconName}
          style={styles.iconStyle}
          color={'white'}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 110,
    width: 110,
    borderRadius: 30,
  },
  innerContainer: {
    borderRadius: 30,
    flex: 1,
    margin: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: 'white',
  },
});

export default BorderGradientIcon;
