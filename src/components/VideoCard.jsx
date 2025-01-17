import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {options, play as playIcon} from '../assets';

//* in case of videos we don't want to play every video right of the background
//* thus create a state variable to check if video is playing or not

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    // user: {username = 'Velvet', avatar},
    avatar,
    username = 'Velvet',
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{
                uri: 'https://cloud.appwrite.io/v1/avatars/initials/?name=Velvet%20echoes&project=677f841b001962f1a88b&name=Velvet%20echoes&project=677f841b001962f1a88b',
              }}
              className="w-full h-full rounded-lg"
              resizemode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-semibold text-sm text-white"
              numberOfLines={1}>
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}>
              {username}
            </Text>
          </View>

          <View className="pt-2">
            <Image
              source={options}
              className="w-5 h-5"
              resizemode="contain"
              tintColor="#FF9C01"
            />
          </View>
        </View>

        {play ? (
          <Text></Text>
        ) : (
          <TouchableOpacity
            className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
            activeOpacity={0.7}
            onPress={() => setPlay(true)}>
            <Image
              source={{
                uri: 'https://cloud.appwrite.io/v1/storage/buckets/677f8d920028434aa4f4/files/6786393a002c0b3d2870/preview/?width=2000&height=2000&gravity=top&quality=100&project=677f841b001962f1a88b&width=2000&height=2000&gravity=top&quality=100&project=677f841b001962f1a88b',
              }}
              className="w-full h-full mt-3 rounded-lg"
              resizeMode="cover"
            />
            <Image
              source={playIcon}
              className="w-12 h-12 absolute"
              resizemode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
