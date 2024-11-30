import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {byWidth, toHeight, toWidth} from '../../theme/helpers';
import {COLOR} from '../../theme';
import SvgAsset from '../SvgAsset';
import Typography from '../Typography';
import {GENERATION_STATUS, SOUND_TYPES} from '../../constants/constants';

const LibrarCard = ({data, onPress}) => {
  const {title, poster, duration, type, status} = data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(data, type)}
      disabled={data.status !== GENERATION_STATUS.DONE}>
      <View style={[styles.row, {gap: toWidth(16)}]}>
        <View style={styles.coverContainer}>
          {status !== GENERATION_STATUS.DONE ? (
            <View
              style={[styles.playBadge, {backgroundColor: COLOR.cardOrange}]}>
              <SvgAsset
                name="hourglass"
                style={styles.icon}
                color={COLOR.white}
              />
            </View>
          ) : type === SOUND_TYPES.COVER ? (
            <Image
              source={{
                uri: poster,
              }}
              style={styles.image}
            />
          ) : (
            <View style={styles.playBadge}>
              <SvgAsset name="play2" style={styles.icon} color={COLOR.white} />
            </View>
          )}
        </View>
        <View style={{gap: toHeight(4)}}>
          <Typography
            color={COLOR.white}
            size={16}
            weight="600"
            numberOfLines={1}>
            {title?.length > 35 ? title.slice(0, 35) + '...' : title}
          </Typography>
          <Typography color={COLOR.textGray} size={16} weight="500">
            {duration} seconds
          </Typography>
        </View>
      </View>
      {/* <TouchableOpacity
        style={styles.buton}
        onPress={() => setIsModalOpen(!isModalOpen)}>
        <SvgAsset name="settings2" style={styles.icon} color={COLOR.white} />
      </TouchableOpacity> */}
      {/* {isModalOpen && (
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton}>
            <Typography color={COLOR.textDark} size={15} weight="500">
              Share
            </Typography>
            <SvgAsset name="share2" style={styles.icon20} color={COLOR.white} />
          </TouchableOpacity>

          <View style={styles.break} />
          <TouchableOpacity style={styles.modalButton}>
            <Typography color={COLOR.red} size={15} weight="500">
              Delete
            </Typography>
            <SvgAsset
              name="trashVoice"
              style={styles.icon20}
              color={COLOR.red}
            />
          </TouchableOpacity>
        </View>
      )} */}
    </TouchableOpacity>
  );
};

export default LibrarCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coverContainer: {
    width: toWidth(60),
    height: toWidth(60),
    borderRadius: toWidth(12),
    overflow: 'hidden',
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    flexShrink: 0,
  },
  progressImage: {
    width: '50%',
    height: '50%',
    flexShrink: 0,
  },
  icon: {
    width: toWidth(24),
    height: toWidth(24),
    flexShrink: 0,
  },
  icon20: {
    width: toWidth(20),
    height: toWidth(20),
    flexShrink: 0,
  },

  playBadge: {
    width: toWidth(32),
    height: toWidth(32),
    backgroundColor: COLOR.pink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: toWidth(100),
  },
  buton: {
    width: toWidth(32),
    height: toWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    position: 'absolute',
    right: toWidth(40),
    top: toHeight(0),
    width: byWidth(50),
    backgroundColor: COLOR.borderGray3,
    borderRadius: toWidth(12),
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: toWidth(16),
    height: toHeight(40),
  },
  break: {
    width: '100%',
    backgroundColor: COLOR.borderGray2,
    height: 1,
  },
});
