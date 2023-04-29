import React, { useState } from "react";
import {
    Touchable,
    View,
    StyleSheet,
    Text
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomForm from "../../components/CustomForm";
import AddMedicalRecordCard from "./AddMedicalRecordCard";
import Colors from "../../configs/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";



const MedicalRecord = (props) => {
    console.log("<<<<<<<<<<<<<<$$$$$$$4", props?.route?.params)
    const [Show, setShow] = useState()
    const [DataCase, setDataCase] = useState("")
    const [idCase, setIdCase] = useState("")
    const navigation = useNavigation()
    const CaseType = () => {
        navigation.navigate("ChooseCaseType",{idCase:idCase,data:DataCase})
    }
    useEffect(() => {
        setIdCase(props?.route?.params?.ID ?? "")
        setDataCase(props?.route?.params?.Names ?? "")
    }, [props])
    // console.log(">>>>>>>>>>>>>>&*&*", idCase)
    return (
        <>
            {Show == true ? <>
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
                                            Nanday Conure
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.subtitle}>
                                                A000093
                                            </Text>
                                            <Text style={styles.MBox}>
                                                M
                                            </Text>
                                            <Text style={styles.BBox}>
                                                B
                                            </Text>
                                        </View>
                                        <Text style={styles.subtitle}>
                                            Enclosure Name,Section Name
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
                                        <Text style={styles.title}>Complaints</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", margin: wp(1.5) }}>
                                        <Text style={styles.painbox}>
                                            Pain
                                        </Text>
                                        <Text style={styles.RestLessness}>
                                            Restlessness
                                        </Text>
                                        <Text style={styles.Bleeding}>
                                            Bleeding
                                        </Text>
                                    </View>
                                </>
                            }
                            backgroundColor={"#37BD69"}
                            image={true}
                            imagePath={require('../../assets/Medical/Medical/health_metrics.png')}
                            rightIcon={true}
                        />
                    </View>
                    <View>
                        <AddMedicalRecordCard
                            children={
                                <>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={styles.title}>Daignosis</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", margin: wp(1.5) }}>
                                        <Text style={[styles.painbox, { backgroundColor: "#FFD3D3" }]}>
                                            Covid
                                        </Text>
                                        <Text style={[styles.RestLessness, { backgroundColor: "#52F990" }]}>
                                            Fatigue
                                        </Text>
                                        <Text style={[styles.Bleeding, { backgroundColor: "#FFBDA8" }]}>
                                            Infection
                                        </Text>
                                    </View>
                                </>
                            }
                            backgroundColor={"#37BD69"}
                            image={true}
                            imagePath={require('../../assets/Medical/Medical/stethoscope.png')}
                            rightIcon={true}


                        />
                    </View>
                    <View>
                        <AddMedicalRecordCard
                            children={
                                <>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={styles.title}>Lab Test Request</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", margin: wp(1.5) }}>
                                        <Text style={styles.painbox}>
                                            RBS
                                        </Text>
                                        <Text style={styles.RestLessness}>
                                            Lipid Profile
                                        </Text>
                                    </View>
                                </>
                            }
                            backgroundColor={"#37BD69"}
                            imagePath={require('../../assets/Medical/Medical/labs.png')}
                            image={true}
                            rightIcon={true}

                        />
                    </View>
                    <View>
                        <AddMedicalRecordCard
                            children={
                                <>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={styles.title}>Prescription</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", margin: wp(1.5) }}>
                                        <Text style={styles.painbox}>
                                            Pantocid
                                        </Text>
                                        <Text style={styles.RestLessness}>
                                            Omnacortil 1.5 mg
                                        </Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", margin: wp(1.5) }}>
                                        <Text style={styles.painbox}>
                                            Perdmet 1% Eye Drop
                                        </Text>
                                    </View>
                                </>
                            }
                            backgroundColor={"#37BD69"}
                            image={true}
                            imagePath={require('../../assets/Medical/Medical/prescriptions.png')}
                            rightIcon={true}

                        />
                    </View>
                    <View>
                        <AddMedicalRecordCard
                            title={"Follow Up Date"}
                            children={
                                <>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={styles.title}>Follow Up Date</Text>
                                    </View>
                                    <Text style={styles.subtitle}>
                                        28 April 2023
                                    </Text>
                                </>
                            }
                            backgroundColor={"#37BD69"}
                            image={true}
                            imagePath={require('../../assets/Medical/Medical/event_repeat.png')}
                            rightIcon={true}

                        />
                    </View>
                    <View>
                        <AddMedicalRecordCard

                            children={
                                <>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={styles.title}>Advice</Text>
                                    </View>
                                    <Text style={styles.subtitle}>
                                        ------
                                    </Text>
                                </>
                            }
                            backgroundColor={"#37BD69"}
                            image={true}
                            imagePath={require('../../assets/Medical/record_voice_over.png')}
                            rightIcon={true}

                        />
                    </View>
                </CustomForm>

            </> : <CustomForm
                header={true}
                title={"Add Medical Record"}
            // onPress={onSubmit}
            // marginBottom={50}
            >
                <View >
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Select Section,Encloure</Text>
                                </View>
                            </>
                        }
                        onPress={() => setShow(true)}
                        backgroundColor={"#D9D9D9"}
                        image={true}
                        imagePath={require('../../assets/Medical/done.png')}
                        rightIcon={true}

                    />
                </View>
                {DataCase != "" ? <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Case Type</Text>
                                </View>
                                <Text style={styles.subtitle}>
                                    {DataCase}
                                </Text>

                            </>
                        }
                        image={true}
                        onPress={() => CaseType()}
                        imagePath={require('../../assets/Medical/Medical/ecg_heart.png')}
                        backgroundColor={"#FA6140"}
                        rightIcon={true}

                    />
                </View> : <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Case Type</Text>
                                </View>
                            </>
                        }
                        backgroundColor={"#D9D9D9"}
                        onPress={() => CaseType()}
                        image={true}
                        imagePath={require('../../assets/Medical/ecg_heart.png')}
                        rightIcon={true}
                    />
                </View>}

                <View>
                    <AddMedicalRecordCard

                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Complaints</Text>
                                </View>
                            </>
                        }
                        backgroundColor={"#D9D9D9"}
                        image={true}
                        imagePath={require('../../assets/Medical/sentiment_sad.png')}
                        rightIcon={true}
                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Daignosis</Text>
                                </View>
                            </>
                        }
                        backgroundColor={"#D9D9D9"}
                        image={true}
                        imagePath={require('../../assets/Medical/stethoscope.png')}
                        rightIcon={true}

                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Lab Test Request</Text>
                                </View>
                            </>
                        }
                        backgroundColor={"#D9D9D9"}
                        image={true}
                        imagePath={require('../../assets/Medical/labs.png')}
                        rightIcon={true}
                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Prescription</Text>
                                </View>
                            </>
                        }
                        backgroundColor={"#D9D9D9"}
                        image={true}
                        imagePath={require('../../assets/Medical/prescriptions.png')}
                        rightIcon={true}
                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Follow Up Date</Text>
                                </View>
                            </>
                        }
                        backgroundColor={"#D9D9D9"}
                        image={true}
                        imagePath={require('../../assets/Medical/event_repeat.png')}
                        rightIcon={true}
                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Advice</Text>
                                </View>
                            </>
                        }
                        image={true}
                        imagePath={require('../../assets/Medical/record_voice_over.png')}
                        backgroundColor={"#D9D9D9"}
                        rightIcon={true}
                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Health Status</Text>
                                </View>
                            </>
                        }
                        image={true}
                        imagePath={require('../../assets/Medical/health_metrics.png')}
                        backgroundColor={"#D9D9D9"}
                        rightIcon={true}
                    />
                </View>
                <View>
                    <AddMedicalRecordCard
                        children={
                            <>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={styles.title}>Notes</Text>
                                </View>
                            </>
                        }
                        image={true}
                        imagePath={require('../../assets/Medical/description.png')}
                        backgroundColor={"#D9D9D9"}
                        rightIcon={true}
                    />
                </View>
            </CustomForm>}
        </>
    )
}
export default MedicalRecord;

const styles = StyleSheet.create({
    title: {
        fontSize: wp(4.8),
        fontWeight: '300',
        color: Colors.subtitle,
        // backgroundColor:'yellow',
        width: '100%'
    },
    subtitle: {
        fontSize: wp(4.5),
        color: Colors.subtitle,
        fontWeight: "600",
        fontStyle: "italic",
    },
    painbox: {
        borderWidth: 0.5,
        padding: wp(2),
        paddingTop: wp(0.5),
        height: hp(3.8),
        borderRadius: 2,
        borderColor: "grey",
        fontSize: wp(4.5),
        fontWeight: "600",
        fontStyle: "italic",
        color: Colors.subtitle,
        backgroundColor: "#AFEFEB"
    },
    RestLessness: {
        borderWidth: 0.5,
        padding: wp(1),
        paddingTop: wp(0.5),
        height: hp(3.8),
        marginLeft: wp(1),
        borderRadius: 2,
        borderColor: "grey",
        fontSize: wp(4.5),
        fontWeight: "600",
        fontStyle: "italic",
        color: Colors.subtitle,
        backgroundColor: "#AFEFEB"
    },
    Bleeding: {
        borderWidth: 0.5,
        padding: wp(1),
        paddingTop: wp(0.5),
        height: hp(3.8),
        marginLeft: wp(1),
        borderRadius: 2,
        borderColor: "grey",
        fontSize: wp(4.5),
        fontWeight: "600",
        fontStyle: "italic",
        color: Colors.subtitle,
        backgroundColor: "#AFEFEB"
    },
    MBox: {
        //  borderWidth:0.5,
        marginLeft: wp(1),
        paddingTop: wp(0.3),
        padding: wp(1),
        height: hp(3),
        backgroundColor: "#DAE7DF"

    },
    BBox: {
        //  borderWidth:0.5,
        marginLeft: wp(1),
        paddingTop: wp(0.3),
        padding: wp(1),
        height: hp(2.9),
        backgroundColor: "#00D6C9"
    }
})