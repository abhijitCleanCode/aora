import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {cards, logo, path} from '../assets';
import {CustomButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useGlobalContext} from '../context/GlobalProvider';

const OnBoarding = () => {
  const navigation = useNavigation();
  const {isLoading, isLogged} = useGlobalContext();

  if (!isLoading && isLogged) navigation.navigate('Tabs');

  return (
    <SafeAreaProvider className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image
            source={logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Aoro</Text>
            </Text>

            <Image
              source={path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>

          <Text className="text-sm font-medium text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey with
            limitless exploration with Aora
          </Text>

          <CustomButton
            btnTitle="Continue with email"
            handlePress={() => {
              navigation.navigate('Login');
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default OnBoarding;
