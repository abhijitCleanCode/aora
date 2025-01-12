import {View, Text, Image} from 'react-native';
import React from 'react';
import {empty} from '../assets';
import CustomButton from './CustomButton';

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />
      <Text className="text-sm font-medium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-semibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        btnTitle="Go Home"
        handlePress={() => navigation.navigate('Tabs')}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
