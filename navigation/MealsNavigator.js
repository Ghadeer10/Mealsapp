import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealScreen from '../Screens/CategoryMealScreen';
import MealDetailsScreen from '../Screens/MealDetailsScreen';
import FavouriteScreen from '../Screens/FavouriteScreen';
import FilterScreen from '../Screens/FilterScreen';

import Color from '../constants/Color';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primaryColor : '',

    },
   // headerTitleStyle : {fontFamily : 'OpenSans-Italic'},
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primaryColor
}


const MealNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealScreen,

    },
    MealDetail: MealDetailsScreen,
},
    {
        defaultNavigationOptions: defaultNavOptions
    });

const FavNavigator = createStackNavigator({
    Favourites: FavouriteScreen,
    MealDetail: MealDetailsScreen,
},{defaultNavigationOptions: defaultNavOptions});

const MealsFavTabNavigator = createBottomTabNavigator(
    {
        Meals: {
            screen: MealNavigator, navigationOptions: {

                tabBarIcon: (tabInfo) => {
                    return <Icon name='ios-restaurant' size={32} color={tabInfo.tintColor} />
                }

            }
        },
        Favourites: {
            screen: FavNavigator, navigationOptions: {

                tabBarIcon: (tabInfo) => {
                    return <Icon name='ios-star' size={32} color={tabInfo.tintColor} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: Color.accentColor
        }
    }

);

const FilterNavigator = createStackNavigator({
    Filtters: FilterScreen,
}, {defaultNavigationOptions:defaultNavOptions,
    //navigationOptions: {
///drawerLabel: 'Filters!!!!',}
});

const MainDrawerNavigator = createDrawerNavigator({
    MealsFav: { screen:MealsFavTabNavigator, navigationOptions :{drawerLabel :'Meals'}},
    Filter: FilterNavigator,
},{
contentOptions :{
    activeTintColor:Color.accentColor,
   // labelStyle:{
   //     fontFamily:
   // }
}});


export default createAppContainer(MainDrawerNavigator);