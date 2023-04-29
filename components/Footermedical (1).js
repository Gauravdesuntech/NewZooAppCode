// created By: Wasim Akram;
// Created at: 27/04/2023


import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Footermedical = ({
    firstlabel ,
    lastlabel ,
    Names,
    ID
}) => {
    const navigation=useNavigation()
    const goback=()=>{
         navigation.navigate("MedicalRecord",{Names:Names,ID:ID})
    }
    // console.log(">>>>>>>>>>>>>###############",ID)
    return (
        <View style={styles.content}>
            <LinearGradient
            colors={['#E8F4ED', '#E8F4ED', ]}
            >
            <View style={styles.mainbox}>
                <TouchableOpacity
                    style={styles.firstbutton}
                    onPress={() => console.log("first one pressed")}
                >
                    <Ionicons name="ios-arrow-back-outline" size={24} color="black" style={{ marginTop: heightPercentageToDP(2.3) }} />
                    <Text style={[styles.textstyleOne, { marginRight: widthPercentageToDP(10) }]}>{firstlabel}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondbutton}
                    onPress={() => goback()}
                >
                    <Text style={[styles.textstyleSecond]}>Done</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.thirdbutton}
                    onPress={() => console.log("last one pressed")}
                >
                    <Text style={styles.textstyleOne}>{lastlabel}</Text>
                    <Ionicons name="ios-arrow-forward-sharp" size={24} color="black" style={{ marginTop: heightPercentageToDP(2.2) }} />
                </TouchableOpacity>
            </View>
            </LinearGradient>
        </View>
    )
}

export default Footermedical;
const styles = StyleSheet.create({
    content: {
        // flex: 1,
    },
    mainbox: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(14)
    },
    firstbutton: {
        flexDirection: "row",
        justifyContent: "space-around",
        // borderWidth:1,
        width: widthPercentageToDP(32),
        height: heightPercentageToDP(8),
        backgroundColor: "transparent"
    },
    secondbutton: {
        borderRadius: 8,
        // borderWidth:1,
        width: widthPercentageToDP(27),
        height: heightPercentageToDP(7),
        backgroundColor: "#37BD69"
    },
    thirdbutton: {
        flexDirection: "row",
        justifyContent: "space-around",
        // borderWidth:1,
        width: widthPercentageToDP(32),
        height: heightPercentageToDP(8),
        backgroundColor: "transparent"
    },
    textstyleOne: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        paddingTop: heightPercentageToDP(2.5)
    },
    textstyleSecond: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        paddingTop: heightPercentageToDP(1.5),
        color: "white"
    }

})