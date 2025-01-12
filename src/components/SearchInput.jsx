import {View, TouchableOpacity, TextInput, Image} from 'react-native';
import React from 'react';
import {search} from '../assets';

const SearchInput = () => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white font-medium flex-1"
        value="Search..."
        // onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image source={search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
