import {View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useOnboardingContext} from '../../context/OnboardingContext';

export default function OnboardingView({children, style = {}, scrollViewRef}) {
  const {setPosition, setElement, onboardingStep} = useOnboardingContext();

  const cardRef = useRef(null);

  useEffect(() => {
    setElement(children);
  }, []);

  return (
    <View
      style={style}
      ref={cardRef}
      onLayout={e => {
        setElement(children);
        let layoutY = e?.nativeEvent?.layout?.y;
        cardRef.current.measureInWindow((x, y) => {
          setPosition({x, y: scrollViewRef?.current ? layoutY : y});
        });
      }}>
      {onboardingStep === 3 ? null : children}
    </View>
  );
}
