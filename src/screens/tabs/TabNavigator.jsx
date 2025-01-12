import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {bookmark, home, plus, user} from '../../assets';
import {
  Home as HomeScreen,
  Profile as ProfileScreen,
  Create as CreateScreen,
  Bookmark as BookmarkScreen,
} from '../index';

const Tabs = createBottomTabNavigator();

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2 w-24 my-auto">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? 'font-bold' : 'font-medium'} text-xs`}
        style={{color: color}}>
        {name}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon icon={home} color={color} name="Home" focused={focused} />
          ),
        }}
        component={HomeScreen}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          ),
        }}
        component={BookmarkScreen}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
        component={CreateScreen}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={user}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
