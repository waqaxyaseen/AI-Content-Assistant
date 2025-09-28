import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/main/HomeScreen';
import ContentScreen from '../screens/main/ContentScreen';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import CreateContentScreen from '../screens/main/CreateContentScreen';
import ContentEditorScreen from '../screens/main/ContentEditorScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import { theme } from '../styles/theme';

export type MainTabParamList = {
  Home: undefined;
  Content: undefined;
  Analytics: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  CreateContent: undefined;
  ContentEditor: { contentId?: string };
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<MainStackParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Content':
              iconName = focused ? 'article' : 'article';
              break;
            case 'Analytics':
              iconName = focused ? 'analytics' : 'analytics';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Content"
        component={ContentScreen}
        options={{ tabBarLabel: 'Content' }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="CreateContent"
        component={CreateContentScreen}
        options={{
          presentation: 'modal',
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="ContentEditor"
        component={ContentEditorScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;