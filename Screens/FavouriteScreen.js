import React from 'react';
import {View ,Text , StyleSheet} from 'react-native';
 
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';




const FavouriteScreen = props => {

    const favMeal = useSelector(state => state.meals.favouriteMeals);
    if (favMeal.length === 0 || !favMeal) {
        return (
            <View style={styles.content}>
                <Text style={styles.font}>No favurite meals added. Start adding some!</Text>
            </View>
        );
    }

    return <MealList listData={favMeal} navigation={props.navigation} />;
};

FavouriteScreen.navigationOptions = (navData) => {
    return {

        headerTitle: 'Your Favourites',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName='ios-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    content :{
        flex:1,
        justifyContent: 'center',
        alignItems :'center' 
    },
    font : {
        fontSize :17,
        fontWeight: '100'
    }
});

export default FavouriteScreen;