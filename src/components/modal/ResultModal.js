import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import BottomSheet from '../bottom-sheet';
import LoadingModal from '../LoadingModal';
import FastImage from 'react-native-fast-image';
import Typography from '../Typography';
import {byHeight, byWidth, toHeight, toWidth} from '../../theme/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SvgAsset from '../SvgAsset';
import {COLOR, SHADOW} from '../../theme';
import SoundPlayer from '../player/SoundPlayer';
import SocialMediaCard from '../cards/SocialMediaCard';
import {ScrollView} from 'react-native-gesture-handler';
import {SOUND_TYPES} from '../../constants/constants';
import BackgroundShadow from '../BackgroundShadow';

const ResultModal = ({close, sound}) => {
  const [isLoading] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet>
      {isLoading && <LoadingModal />}
      <BackgroundShadow />
      <View style={[styles.container, {marginTop: insets.top}]}>
        <TouchableOpacity style={styles.backButton} onPress={close}>
          <SvgAsset
            name="chevron_left"
            style={styles.close}
            color={COLOR.white}
          />
        </TouchableOpacity>
        <ScrollView>
          {sound?.type === SOUND_TYPES.COVER ? (
            <FastImage
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: sound.poster,
              }}
            />
          ) : (
            <View style={styles.musicContainer}>
              <SvgAsset name="music2" style={styles.icon} color={COLOR.white} />
            </View>
          )}

          <SoundPlayer clean={() => {}} voice={sound} shouldStop={false} />

          <SocialMediaCard
            extraStyle={{marginTop: toHeight(20)}}
            url={sound?.output_audio}
            title={sound?.text}
          />
          {sound?.type === SOUND_TYPES.MUSIC && (
            <>
              <Typography
                size={24}
                weight="700"
                color={COLOR.white}
                style={{marginTop: toHeight(24)}}>
                Prompt
              </Typography>

              <View style={styles.promptContainer}>
                <Typography size={17} weight="400" color={COLOR.white}>
                  {sound?.text}
                </Typography>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: byHeight(40),
    borderRadius: toWidth(20),
    marginTop: toWidth(12),
  },
  container: {
    flex: 1,
    paddingHorizontal: toWidth(16),
  },
  close: {
    width: toWidth(28),
    height: toWidth(28),
    flexShrink: 0,
  },
  backButton: {
    width: toWidth(32),
    height: toWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientWithRadius: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: toWidth(32),
  },
  musicContainer: {
    width: byWidth(50),
    height: byHeight(22),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.primary,
    borderRadius: toWidth(20),
    alignSelf: 'center',
    marginTop: toHeight(20),
    ...SHADOW.modal,
  },
  icon: {
    width: byWidth(25),
    height: byHeight(11),
    flexShrink: 0,
  },
  promptContainer: {
    backgroundColor: COLOR.borderGray2,
    padding: toWidth(20),
    borderRadius: toWidth(16),
    marginTop: toHeight(8),
    minHeight: byHeight(15),
  },
});
