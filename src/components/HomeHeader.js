import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import PremiumButton from './button/PremiumButton';
import {COLOR} from '../theme';
import SvgAsset from './SvgAsset';
import Typography from './Typography';
import {toHeight, toWidth} from '../theme/helpers';

const HomeHeader = ({title, navigation}) => {
  return (
    <View
      style={[
        styles.row,
        {paddingHorizontal: toWidth(20), paddingBottom: toHeight(10)},
      ]}>
      <Typography color={COLOR.white} size={22} weight="700">
        {title}
      </Typography>

      <View style={[styles.row, {gap: toWidth(12)}]}>
        <PremiumButton />
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <SvgAsset name="gear2" style={styles.icon} color={COLOR.grayDark2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: toWidth(28),
    height: toWidth(28),
    flexShrink: 0,
  },
});
