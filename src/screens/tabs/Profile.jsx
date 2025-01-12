import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {useGlobalContext} from '../../context/GlobalProvider';
import useAppwrite from '../../lib/useAppwrite';
import {getUserPosts, signOut} from '../../lib/appwrite';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EmptyState, InfoBox, VideoCard} from '../../components';
import {logout as logoutIcon} from '../../assets';

const Profile = () => {
  const {user, setUser, setIsLogged} = useGlobalContext();
  const {data: posts} = useAppwrite(() => getUserPosts(user.$id));
  const navigation = useNavigation();

  console.log(user);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaProvider className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={item => item.$id}
        renderItem={({item}) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="flex w-full items-end mb-10"
              onPress={logout}>
              <Image
                source={logoutIcon}
                resizeMode="contain"
                className="w-6 h-6"
                tintColor="#FF8E01"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{uri: user?.avatar}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaProvider>
  );
};

export default Profile;
