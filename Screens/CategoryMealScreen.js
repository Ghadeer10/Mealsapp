import React from 'react';
import {View , Text , StyleSheet} from 'react-native';

import { useSelector} from 'react-redux';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import CategoriesScreen from './CategoriesScreen';
//import MealItem from '../components/MealItem';
import MealList from '../components/MealList'; 



const CategoryMealScreen = props => {

    const availableMeals = useSelector (state => state.meals.filteredMeals)

    const catId = props.navigation.getParam('categoryId');

    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0 );

    if(displayMeals.length === 0){
        return(
            <View style={styles.content}>
                <Text style ={styles.font}>No meals found. Check your filters!</Text>
            </View>
        );
    }

    return <MealList listData={displayMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData =>{
   const catId= navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return{
                headerTitle: selectedCategory.title,
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

export default CategoryMealScreen;