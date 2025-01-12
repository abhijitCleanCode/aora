import {View, Text, FlatList, Image, RefreshControl, Alert} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {logo_small} from '../../assets';
import {EmptyState, SearchInput, Trending, VideoCard} from '../../components';
import {getAllPosts, getLatestPosts} from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import {useGlobalContext} from '../../context/GlobalProvider';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {data: posts, loading, refetch} = useAppwrite(getAllPosts);
  const {data: latestPosts} = useAppwrite(getLatestPosts);
  const {user, setUser, setIsLogged} = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaProvider className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={item => item.$id}
        renderItem={({item}) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Welcome back,
                </Text>
                <Text className="font-semibold text-2xl text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={logo_small}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-normal mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first to add a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaProvider>
  );
};

export default Home;
