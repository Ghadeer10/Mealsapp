import React, { useState , useEffect ,useCallback} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux' ;

import HeaderButton from '../components/HeaderButton';
import Color from '../constants/Color';
import {setFilters} from '../store/action/meal';



const FlatItem = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.label}>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: Color.primaryColor, false: '#ccc' }}
                thumbColor={Color.primaryColor}

            />
        </View>
    );
};

const FilterScreen = props => {
 
    const {navigation} = props; //explantion on notebook and in video num40 in module6

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const dispatch = useDispatch();
    const saveFilters = useCallback( () => {
        const appliedfilters = {
            gulteenFree :isGlutenFree,
            lactoseFrer: isLactoseFree,
            vegetarian:isVegetarian,
            vegan : isVegan,
        };
        dispatch(setFilters (appliedfilters));
    }, [isGlutenFree,isLactoseFree,isVegan,isVegetarian, dispatch]);

    useEffect(()=>{
        navigation.setParams({save : saveFilters})
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>the Filters Options:</Text>

            <FlatItem
                label='Gluten Free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />

            <FlatItem
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />

            <FlatItem
                label='Vegan '
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />

            <FlatItem
                label='Lactose Free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />


        </View>
    );
};

FilterScreen.navigationOptions = (navData) => {
    return {

        headerTitle: 'FilterScreen',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName='ios-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='save'
                    iconName='ios-save'
                    onPress={ navData.navigation.getParam('save')}
                />
            </HeaderButtons>


    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,

        alignItems: 'center',
    },
    title: {
        fontSize: 23,
        fontStyle: 'italic',
        margin: 20,
        textAlign: 'center',
        fontWeight: 'bold'

    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold'
    }


});

export default FilterScreen;