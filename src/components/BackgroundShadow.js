import {View} from 'react-native';
import React from 'react';
import {byWidth, toWidth} from '../theme/helpers';

export default function BackgroundShadow() {
  return (
    <>
      <View
        style={{
          backgroundColor: '#4979FF',
          width: byWidth(240),
          height: byWidth(240),
          borderRadius: byWidth(240 / 2),
          shadowColor: '#4979FF',
          position: 'absolute',
          left: -byWidth(240),
          top: -byWidth(120),
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: toWidth(300),
          elevation: 10,
        }}></View>
      <View
        style={{
          backgroundColor: '#4979FF',
          width: byWidth(240),
          height: byWidth(240),
          borderRadius: byWidth(240 / 2),
          shadowColor: '#4979FF',
          position: 'absolute',
          right: -byWidth(240),
          top: -byWidth(200),
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: toWidth(300),
          elevation: 10,
        }}></View>
    </>
  );
}
