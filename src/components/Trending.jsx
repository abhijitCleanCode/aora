import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';

import {play as playIcon} from '../assets';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({activeItem, item}) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {play ? (
        <Text>Playing...</Text>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>
          <ImageBackground
            source={{uri: item.thumbnail}}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={playIcon}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  // enlarge item while scrolling horizontally
  const viewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  };

  return (
    <FlatList
      data={posts}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.$id}
      renderItem={({item}) => <TrendingItem />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{x: 170}}
    />
  );
};

export default Trending;
