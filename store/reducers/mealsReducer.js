import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVOURITE ,SET_FILTERS } from '../action/meal';

const initialState = {
    meals: MEALS,
    favouriteMeals: [],
    filteredMeals: MEALS
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            const existingIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [ ...state.favouriteMeals ];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favouriteMeals: updatedFavMeals };
            }
            else {

                const meal = state.meals.find(meal => meal.id === action.mealId);

                return { ...state, favouriteMeals: state.favouriteMeals.concat(meal) };
            }
            case SET_FILTERS :
                const appliedfilters = action.filters ;
                const updatedFilteredMeals = state.meals.filter (meal=>{
                    if(appliedfilters.glutenFree && !meal.isGlutenFree){
                        return false;
                    }
                    if(appliedfilters.lactoseFrer && !meal.isLactoseFree){
                        return false;
                    }
                    if(appliedfilters.vegetarian && !meal.isVegetarian){
                        return false;
                    }
                    if(appliedfilters.vegan && !meal.isVegan){
                        return false;
                    }
                    return true;
                    
                });
                return {...state , filteredMeals :updatedFilteredMeals};

        default:
            return state;
    }
}

export default mealsReducer;