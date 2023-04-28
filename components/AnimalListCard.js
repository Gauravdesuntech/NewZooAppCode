// Name: Ganesh Aher 
// Date:24 April
// work: Design FlatListCard component

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Colors from '../configs/Colors';
import { capitalize } from '../utils/Utils'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';


const AnimalListCard = ({ UserEnclosureName, title, subtitle, onPress, checkbox, }) => {

    // console.log('THESE ARE TEH RECEIVED SEX DATA: ', tags);

    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View style={styles.cardContainer}>
                <Image
                    style={styles.image}
                    source={require("../assets/parrot.jpeg")} // Pass the image source as a prop
                    resizeMode="cover"
                />

                <View style={styles.contentContainer}>

                    <View style={styles.middleSection}>

                        {
                            title ? <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={styles.title}>{title}</Text>
                                {/* {chips} */}
                            </View> : null}

                        {
                            subtitle ?
                                <Text style={title ? styles.subtitle : styles.title}>{subtitle}</Text>
                                : null}

                    </View>

                    <View style={styles.enclosure}>
                        <Text style={styles.enclosureName}>{UserEnclosureName}</Text>
                    </View>
                </View>
                <View style={styles.rightSection}>
                    <View
                        style={{
                            marginHorizontal: widthPercentageToDP(10),
                            marginVertical: widthPercentageToDP(6.5),
                        }}
                    >
                        <AntDesign name="right" size={14} color="black" />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    enclosureName: {

        margin: '2%',
        paddingLeft: '3%',
        fontSize: 13,

    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: widthPercentageToDP("2%"),
        marginVertical: widthPercentageToDP("2%"),

        elevation: 2, // for shadow on Android
        shadowColor: '#000', // for shadow on iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    rightSection: {
        justifyContent: "center",
        width: "35%",
        paddingRight: 30,
    },
    image: {
        width: 44,
        height: 44,
        borderRadius: 50,
        alignSelf: 'center',
        marginRight: 10,
        marginLeft: 5
    },
    contentContainer: {
        // flexDirection: 'row',
        // backgroundColor:'teal'
    },

    middleSection: {
        width: "70%",
        paddingLeft: 10,
        justifyContent: 'center',

    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: Colors.subtitle,
        // backgroundColor:'yellow',
        width: '100%'
    },
    subtitle: {
        fontSize: 13,
        color: Colors.subtitle,
        fontWeight: '400',
        width: '100%',
        // backgroundColor:'red'

    },

    // tag: {
    //     backgroundColor: '#f0f0f0',
    //     borderRadius: 8,
    //     paddingVertical: 4,
    //     paddingHorizontal: 8,
    //     marginRight: 8,
    // },


});

export default AnimalListCard;