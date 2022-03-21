import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';

let TouchComp = TouchableOpacity;

if(Platform.OS === 'android'){
    TouchComp = TouchableNativeFeedback
}

const CategoryGridTile = props => {
    return (
        <View style={styles.gridItem}>
        <TouchComp
            
            onPress={props.onSelect}>
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                <Text style={styles.title} numberOfLines={2}>
                    {props.title}
                </Text>
            </View>
        </TouchComp>
        </View>


    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius:20,
        overflow:'hidden',
    

    },
    container: {
        flex: 1,
        borderRadius: 20,
        elevation: 3, //for andriod
        shadowColor: 'black',//for ios
        shadowOffset: { width: 0, hight: 2 }, //for ios
        shadowOpacity: 0.26,// for ios
        shadowRadius: 10, // for ios
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'


    },
    title: {
        fontSize: 25,
        textAlign: 'right'
    }

});

export default CategoryGridTile;