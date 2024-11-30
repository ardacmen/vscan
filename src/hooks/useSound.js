import {useEffect, useMemo, useState} from 'react';
import {Player} from '@react-native-community/audio-toolkit';
import {DEFAULT_SOUND, RECORD_TYPES} from '../constants/constants';

const useSound = (uri, loop) => {
  const [sound, setSound] = useState({
    ...DEFAULT_SOUND,
    playTime: 0,
    duration: 0,
  });
  const [status, setStatus] = useState(RECORD_TYPES.notStarted);
  const [player] = useMemo(() => {
    const player = new Player(uri, {
      continuesToPlayInBackground: true,
      autoDestroy: false,
    });
    player.looping = true;

    return [player];
  }, [uri]);
  const [isPrepared, setIsPrepared] = useState(false);

  useEffect(() => {
    player.on('ended', () => {
      setStatus(RECORD_TYPES.finished);
    });

    return () => {
      if (!player.looping) {
        player.stop();
        player.destroy();
      }
    };
  }, [uri]);

  useEffect(() => {
    const preparePlayers = async () => {
      player.prepare();
    };
    if (!player.isPrepared && !isPrepared && status !== RECORD_TYPES.playing) {
      preparePlayers();
    }
    if (player.isPrepared) {
      setIsPrepared(true);
    }
  }, [player?.isPrepared]);

  useEffect(() => {
    if (uri) {
      const timer = setInterval(() => {
        updateProgress();
      }, 100);
      return () => clearInterval(timer);
    }
  }, [player]);

  const updateProgress = () => {
    setSound(prevSound => ({
      ...prevSound,
      currentPositionSec: player.currentTime,
      currentDurationSec: player.duration,
      playTime: player.currentTime,
      duration: player.duration,
    }));
  };

  const seekToPlayer = value => {
    player.seek(value);
  };

  const cleanAudio = () => {
    player.stop();
    setSound(DEFAULT_SOUND);
    setStatus(RECORD_TYPES.notStarted);
  };

  const handlePlayback = () => {
    if ([RECORD_TYPES.notStarted, RECORD_TYPES.finished].includes(status)) {
      player.play();
      setStatus(RECORD_TYPES.playing);
    } else if (status === RECORD_TYPES.playing) {
      player.pause();
      setStatus(RECORD_TYPES.paused);
    } else if (status === RECORD_TYPES.paused) {
      player.play();
      setStatus(RECORD_TYPES.playing);
    }
  };

  const pausePlayer = () => {
    player.pause();
    setStatus(RECORD_TYPES.paused);
  };

  return {
    sound,
    status,
    handlePlayback,
    cleanAudio,
    seekToPlayer,
    pausePlayer,
    player,
    isPrepared,
  };
};

export default useSound;
