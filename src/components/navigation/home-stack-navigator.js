import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from 'components/screens/home-screen';
import ShowDetailsScreen from 'components/screens/show-details-screen';
import LoginScreen from 'components/screens/login-screen';

const HomeStackNavigator = StackNavigator(
	{
		Main: {screen: HomeScreen},
		ShowDetails: {screen: ShowDetailsScreen },
		Login: { screen: LoginScreen},
	},
	{
		initialRouteName: 'Main',
		headerMode: 'none',
	},
);

export default HomeStackNavigator;