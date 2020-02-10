import React from "react";
import {View, Text,StyleSheet} from "react-native";
import {Icon} from 'native-base';

export default function Header({navigation, title }){

    const openMenu = () => {
        navigation.openDrawer();
    }
  
    return (
        
        <View style = {styles.header}> 
            <Icon name="ios-menu" style={styles.icon} onPress={openMenu} />
            <View>
    
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
            
    );  
}

const styles = StyleSheet.create({
    header:{
       
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#91D000',
        paddingTop: 20

    },
    headerText: {
        fontSize: 25,
        color: "#333",
        letterSpacing: 1,
    },

    icon:{
        position: 'absolute',
        left: 16,
        paddingTop: 20
    }
});
