import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import useSound from '../../hooks/useSound';
import SvgAsset from '../SvgAsset';
import {toHeight, toWidth} from '../../theme/helpers';
import {COLOR} from '../../theme';
import Button from '../Button';
import Typography from '../Typography';
import Slider from '@react-native-community/slider';
import {convertMsToTime, convertSecondsToTime} from '../../services/helper';
import {RECORD_TYPES, SOUND_TYPES} from '../../constants/constants';

export default function SoundPlayer({voice, shouldStop}) {
  const [loop, setLoop] = useState(false);
  const {sound, status, handlePlayback, seekToPlayer, cleanAudio, isPrepared} =
    useSound(voice?.output_audio, loop);

  useFocusEffect(
    useCallback(() => {
      return () => {
        cleanAudio();
      };
    }, []),
  );

  useEffect(() => {
    if (shouldStop) {
      pausePlayer();
    }
  }, [shouldStop]);

  const sliderRef = useRef(null);

  const onSliderValueChange = async value => {
    seekToPlayer(value);
  };

  const step = sound.currentPositionSec > 600 ? 10 : 1;

  return (
    <View style={styles.wrapper}>
      <View>
        <View style={styles.buttonContainer}>
          {sound?.type === SOUND_TYPES.COVER ? (
            <Typography
              size={24}
              weight="700"
              color={COLOR.white}
              center>
              Sponge Bob
            </Typography>
          ) : (
            <Button
              style={[
                styles.loopBadgeContainer,
                {backgroundColor: loop ? COLOR.green : COLOR.borderGray2},
              ]}
              onPress={() => setLoop(!loop)}>
              <SvgAsset
                name="loop"
                color={COLOR.white}
                style={styles.icon}
              />
              <Typography
                size={16}
                weight="400"
                color={COLOR.white}
                center>
                Loop
              </Typography>
            </Button>
          )}

          <Button
            onPress={handlePlayback}
            disabled={!voice?.output_audio || !isPrepared}
            style={styles.playButton}>
            {isPrepared ? (
              <SvgAsset
                name={`${status === RECORD_TYPES.playing ? 'pause' : 'player'}`}
                color={COLOR.white}
                style={styles.playIcon}
              />
            ) : (
              <ActivityIndicator
                size="large"
                color={COLOR.white}
              />
            )}
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <Slider
          style={{width: '100%'}}
          minimumValue={0}
          maximumValue={voice.duration * 1000}
          value={sound.currentPositionSec}
          onValueChange={onSliderValueChange}
          minimumTrackTintColor={COLOR.enabledButton}
          maximumTrackTintColor={COLOR.white05}
          step={step}
          ref={sliderRef}
        />
        <View style={styles.timeContainer}>
          <Typography
            color={COLOR.white}
            size={20}
            weight="600"
            center>
            {sound.playTime <= 0
              ? '00:00'
              : convertMsToTime(Math.floor(sound.playTime))}
          </Typography>
          <Typography
            color={COLOR.white}
            size={20}
            weight="600"
            family="ProximaNova"
            center>
            {convertSecondsToTime(Math.floor(voice.duration))}
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: toHeight(20),
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: toHeight(8),
  },

  playButton: {
    borderRadius: toWidth(999),
    backgroundColor: COLOR.pink,
    width: toWidth(50),
    height: toWidth(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: toWidth(20),
    paddingVertical: toHeight(16),
    width: '100%',
  },

  playIcon: {
    width: toWidth(24),
    height: toWidth(24),
    flexShrink: 0,
  },
  icon: {
    width: toWidth(20),
    height: toWidth(20),
    flexShrink: 0,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: toHeight(10),
  },
  infoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateY: toHeight(20)}],
    paddingVertical: toHeight(8),
  },
  info: {
    backgroundColor: COLOR.pink,
    paddingVertical: toHeight(4),
    paddingHorizontal: toWidth(20),
    borderRadius: toWidth(100),
  },
  loopBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: toWidth(16),
    paddingVertical: toHeight(8),
    gap: toWidth(8),
    borderRadius: toWidth(12),
  },
});
