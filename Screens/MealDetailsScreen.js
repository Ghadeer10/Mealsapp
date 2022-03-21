import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderTitle } from 'react-navigation-stack';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import Icon from 'react-native-vector-icons/Ionicons';

import { toggleFavourite } from '../store/action/meal';


import { useSelector, useDispatch } from 'react-redux';

const ListItem = props => {

    return (
        <View style={styles.list}>
            <Text>{props.children}</Text>
        </View>
    )
};




const MealDetailsScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals)
    const mealId = props.navigation.getParam('mealId');

    const currebtFavMeals = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggelFavHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggelFav: toggelFavHandler });
    }, [toggelFavHandler]
    );

    useEffect(() => {
        props.navigation.setParams ({isFav : currebtFavMeals});
    } , [currebtFavMeals]);

     useEffect(() => {props.navigation.setParams({mealTitle : selectedMeal.title})}, [selectedMeal] );
    return (

        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>                                      
                <ListItem>{selectedMeal.duration}m</ListItem>
                <ListItem>{selectedMeal.complexity.toUpperCase()}</ListItem>
                <ListItem>{selectedMeal.affordability.toUpperCase()}</ListItem>
            </View>
            <Text style={styles.title}>Ingrediants</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>))}
        </ScrollView>
    );
};



MealDetailsScreen.navigationOptions = navigationData => {
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealtitle = navigationData.navigation.getParam('mealTitle');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    const myFavFunction = navigationData.navigation.getParam('toggelFav');

    const isMyFavourite = navigationData.navigation.getParam ('isFav');

    return {
        headerTitle: mealtitle,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title='FF'
                    iconName={isMyFavourite ? 'ios-star' : 'ios-star-outline'}
                    onPress={myFavFunction} />
            </HeaderButtons>

    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        textAlign: 'center'
    },
    list: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15
    }


});

export default MealDetailsScreen;