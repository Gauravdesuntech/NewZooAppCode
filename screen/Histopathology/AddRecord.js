import React, { useState } from "react";
import { Text, View } from "react-native";
import Card from "../../components/CustomCard";
import CustomForm from "../../components/CustomForm";
import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import AddMedicalRecordCard from "./AddMedicalRecordCard";
import Colors from "../../configs/Colors";

const AddRecord = () => {
    return (
        <>
            <CustomForm
                header={true}
                title={"Add Medical Record"}
            >
                <View>
                    <View>
                        <AddMedicalRecordCard
                            children={
                                <>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={styles.title}>Select Animals</Text>
                                    </View>
                                    <Text style={styles.subtitle}>
                                     
                                    </Text>
                                </>
                            }
                            imgPath={require('../../assets/Medical/Ellipse.png')}
                            rightIcon={true}
                        />
                    </View>
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>YFYFYFIYFFIYF</Text>
                                </View>
                                <Text style={styles.subtitle}>
                                    ghhkjhh
                                </Text>
                            </>
                        }
                        image={true}
                        imagePath={require('../../assets/Medical/Medical/ecg_heart.png')}
                        backgroundColor={"#FA6140"}
                        rightIcon={true}

                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        title={"Complaints"}
                        backgroundColor={"#37BD69"}
                        image={true}
                        imagePath={require('../../assets/Medical/Medical/health_metrics.png')}
                        rightIcon={true}

                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        title={"Daignosis"}
                        backgroundColor={"#37BD69"}
                        image={true}
                        imagePath={require('../../assets/Medical/Medical/stethoscope.png')}
                        rightIcon={true}


                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        title={"Lab Test Request"}
                        backgroundColor={"#37BD69"}
                        imagePath={require('../../assets/Medical/Medical/labs.png')}
                        image={true}
                        rightIcon={true}

                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        title={"Prescription"}
                        backgroundColor={"#37BD69"}
                        image={true}
                        imagePath={require('../../assets/Medical/Medical/prescriptions.png')}
                        rightIcon={true}

                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        title={"Follow Up Date"}
                        backgroundColor={"#37BD69"}
                        image={true}
                        imagePath={require('../../assets/Medical/Medical/event_repeat.png')}
                        rightIcon={true}

                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        title={"Advice"}
                        backgroundColor={"#37BD69"}
                        image={true}
                        imagePath={require('../../assets/Medical/record_voice_over.png')}
                        rightIcon={true}

                    />
                </View>
            </CustomForm>

        </>
    )
}

const styles = StyleSheet.create({
    CardStyle: {
        backgroundColor: "#F2FFF8",
        borderRadius: wp("2%"),
        marginVertical: wp("2%"),

        elevation: 2, // for shadow on Android
        shadowColor: "#000", // for shadow on iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: wp(4),
        fontWeight: '330',
        marginBottom: 4,
        color: Colors.subtitle,
        // backgroundColor:'yellow',
        width: '100%'
    },
    subtitle: {
        fontSize: wp(4),
        color: Colors.subtitle,
        fontWeight: "400",
        fontStyle: "italic",
    },
});

export default AddRecord;


