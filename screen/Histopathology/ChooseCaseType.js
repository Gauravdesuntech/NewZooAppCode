import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { widthPercentageToDP, heightPercentageToDP, } from 'react-native-responsive-screen'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Footermedical from "../../components/Footermedical (1)";
import { useState } from 'react';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MedicalHeader from "../../components/MedicalHeader";

const arr = [
    { id: 1, title: "Standard", backgroundColor: "rgba(55, 189, 105, 1)" },
    { id: 2, title: "Quarantine", backgroundColor: "rgba(250, 97, 64, 1)" },
    { id: 3, title: "Pre Shipment", backgroundColor: "rgba(0, 214, 201, 1)" },
    { id: 4, title: "Routine", backgroundColor: "rgba(55, 189, 105, 1)" },
]
  
const ChooseCaseType = (props) => {
    // console.log("**************&&&&&&&&&&",props?.route?.params)
    const [itmid, setItmeid] = useState("")
    const [name, setNames] = useState()
    const[caseId,setCaseID]=useState()
    const clickFun = (id) => {
        // console.log("THIS IS ID>>>>>>",id)
        setItmeid(id)
        // localStorage.setItem("id",id)
    }
    useEffect(()=>{
        setCaseID(props?.route?.params?.idCase ??"")
    },[props])
    //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>**************&&&&&&&&&&",caseId)
    return (
        <>

            <MedicalHeader title="Choose Case Type" noIcon={true} style={{ paddingBottom: heightPercentageToDP("4%"), paddingTop: widthPercentageToDP("2%") }} />
            {/* { console.log("THIS IS ID",itmid)} */}
            <ScrollView style={{ backgroundColor: "white", }}>

                {
                    arr.map((item, i) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => [clickFun(item.id), setNames(item.title)]}>
                                <View style={[styles.cont, { backgroundColor: item.id !== itmid || caseId==itmid? "rgba(242, 255, 248, 1)" : "rgba(175, 239, 235, 1)" }]}>
                                    <View style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "2%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ width: "70%", display: "flex", flexDirection: "row", }}>
                                            <View style={{ width: 64, height: 64, borderRadius: 50, backgroundColor: item.backgroundColor }}>
                                                <Image
                                                    style={styles.image}
                                                    // source={require("../assets/ecg_heart(3).png")}
                                                    source={require('../../assets/Medical/Medical/ecg_heart.png')} // Pass the image source as a prop
                                                    resizeMode="stretch"
                                                />
                                            </View>
                                            <View style={{ marginLeft: "8%", justifyContent: "center" }}>
                                                <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center", color: "rgba(68, 84, 74, 1)" }}>{item.title}</Text>
                                            </View>
                                        </View>

                                        {item.id == itmid || caseId==itmid? <View style={{ alignItems: "center", justifyContent: "center", paddingRight: "3%" }}>
                                            <AntDesign name="check" size={24} color="rgba(31, 81, 91, 1)" />
                                        </View> : ""}

                                    </View>

                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }





            </ScrollView>
            <View style={{}}>
                <Footermedical firstlabel={"Select Animal"} Names={name} ID={itmid} lastlabel={"Complaints"} />
            </View>

        </>
    )
}

export default ChooseCaseType

const styles = StyleSheet.create({
    cont: {

        borderRadius: widthPercentageToDP("2%"),
        marginVertical: widthPercentageToDP("2%"),
        marginHorizontal: widthPercentageToDP("2"),
        // elevation: 2, // for shadow on Android
        shadowColor: "#000", // for shadow on iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginBottom: "2%",
        borderWidth: 1,
        borderColor: "rgba(195, 206, 199, 1)"

        // display:"flex",
        // flexDirection:"row",
        // justifyContent:"space-between"
    },
    image: {
        width: 34,
        height: 34,
        alignSelf: "center",
        alignItems: "center",
        marginTop: "24%",
        borderWidth: 1,
    },

    image11: {
        width: 30,
        height: 30,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: "rgba(242, 255, 248, 1)",
        alignItems: "center",
        paddingTop: "3%",
        marginRight: "3%"
    }


})