import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';
import Login from './Login';
import Signup from './Signup';
import HomeScreen from './Home';
import MapScreen from "./Maps";
import { ScannerScreen, QRScreen, TransactionScreen } from './Scanner';
import BloodBankScreen from './BBNear';

const BottomBar = createBottomTabNavigator (
  {
    Home: HomeScreen,
    Maps: MapScreen,
    Transaction: TransactionScreen,
    Bloodbanks: BloodBankScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Maps') {
          iconName = `ios-cloud${focused ? '' : '-outline'}`;
        } else if (routeName === 'Transaction')
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        BottomBar: {
          screen: BottomBar
        },
        Scanner: ScannerScreen,
        QR: QRScreen,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login'
    }
);
  
export default createAppContainer(AppNavigator);