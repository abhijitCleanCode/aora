import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({
  btnTitle,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${
        containerStyles || ''
      } ${isLoading ? 'opacity-50' : ''}`}
      activeOpacity={0.7}
      disabled={isLoading}>
      <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
        {isLoading ? 'Loading...' : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
