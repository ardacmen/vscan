import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '../Typography';
import {COLOR, GRADIENT} from '../../theme';
import {toHeight, toWidth} from '../../theme/helpers';
import {useIAPContext} from '../../context/IAPContext';
import SvgAsset from '../SvgAsset';
import LinearGradient from 'react-native-linear-gradient';

const PremiumButton = () => {
  const {showSubscriptionModal, isPremium} = useIAPContext();

  return (
    <LinearGradient {...GRADIENT.featuresBlue} style={{borderRadius: 100}}>
      <TouchableOpacity
        onPress={() => showSubscriptionModal()}
        disabled={isPremium}
        style={styles.button}>
        <SvgAsset
          name={isPremium ? 'star3' : 'energy2'}
          style={styles.icon}
          color={COLOR.white}
        />
        <Typography color={COLOR.white} size={14} weight="700" center>
          {isPremium ? 'PRO Active' : 'PRO'}
        </Typography>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PremiumButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: toWidth(12),
    paddingVertical: toHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: toWidth(4),
    width: toWidth(16),
    height: toWidth(16),
    flexShrink: 0,
  },
});
