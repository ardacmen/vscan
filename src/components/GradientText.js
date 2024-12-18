import React from 'react';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Typography from './Typography';
export const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[props.color1, props.color2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text
          {...props}
          style={[props.style, {opacity: 0}]}
        />
      </LinearGradient>
    </MaskedView>
  );
};
