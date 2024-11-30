import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLOR} from '../theme';
import {toHeight, toWidth} from '../theme/helpers';
import SvgAsset from './SvgAsset';
import Typography from './Typography';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';

export default function Header({
  color = COLOR.main,
  titleIcon,
  title = 'Celebrity AI',
  renderLeft,
  renderRight,
  withBack = false,
  style = {},
}) {
  const navigation = useNavigation();

  return (
    <View style={{...styles.container, ...style}}>
      <View style={{width: '20%'}}>
        {renderLeft ? (
          renderLeft()
        ) : withBack ? (
          <Button
            style={{...styles.iconWrapper, marginLeft: toWidth(16)}}
            onPress={() => navigation?.goBack()}>
            <SvgAsset
              name="angle_left"
              color={COLOR.white}
              style={styles.icon}
            />
          </Button>
        ) : (
          <View style={{width: toWidth(20), height: toWidth(20)}} />
        )}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {titleIcon && (
          <SvgAsset name={titleIcon} color={color} style={styles.titleIcon} />
        )}
        <Typography weight="600" size={18} color={color}>
          {title}
        </Typography>
      </View>
      <View style={{width: '20%'}}>
        {renderRight ? renderRight() : <View style={{width: toWidth(20)}} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },

  icon: {width: toWidth(16), height: toWidth(16)},
  titleIcon: {
    width: toWidth(20),
    height: toWidth(20),
    marginRight: toWidth(10),
  },
  iconWrapper: {
    backgroundColor: COLOR.surfaceSolid,
    borderRadius: toWidth(12),
    padding: toWidth(10),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
