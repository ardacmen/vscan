import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {toHeight, toWidth} from '../../theme/helpers';
import {COLOR} from '../../theme';

export default function GenerationButton({
  style = {},
  children,
  disabled,
  onPress = () => {},
}) {
  const buttonStyle = useMemo(() => {
    if (disabled) return {...style, backgroundColor: COLOR.textGray2};
    return style;
  }, [style, disabled]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => (disabled ? () => {} : onPress())}
      style={[styles.button, buttonStyle]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: toWidth(32),
    paddingHorizontal: toWidth(12),
    paddingVertical: toHeight(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.primary,
    width: '100%',
  },
});
