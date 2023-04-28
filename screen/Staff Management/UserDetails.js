import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../configs/Colors";
import { AntDesign } from '@expo/vector-icons';
import { getStaffDetails } from "../../services/staffManagement/addPersonalDetails";

const { width, height } = Dimensions.get("window");


const UserDetails = ({ route }) => {
    const navigation = useNavigation();
    const [user_id, setUser_id] = useState(route.params?.user_id ?? 0);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
			getData();
		});
		return unsubscribe;
    }, [navigation]);

    const getData = () =>{
        setIsLoading(true)
        getStaffDetails({ id: user_id }).then((res) => {
            console.log(res);
            setData(res.data);
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            {isLoading ? (
                <Loader loaderSize={"lg"} />
            ) : (
                <View style={styles.container}>
                    {!data ? (
                        <View>
                            <Text>No data Found</Text>
                        </View>
                    ) : (
                        <View>
                            <Header title="User Details" noIcon={true} />
                            <View style={styles.innerContainer}>
                                <View style={styles.row}>
                                    <Text style={{ marginHorizontal: 5 }}>
                                        Name :
                                    </Text>
                                    <Text>{data.user_first_name} {data.user_last_name}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ marginHorizontal: 5 }}>
                                        Email :
                                    </Text>
                                    <Text>{data.user_email}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ marginHorizontal: 5 }}>
                                        Mobile :
                                    </Text>
                                    <Text>{data.user_mobile_number}</Text>
                                </View>
                                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{
                                        uri: data.qr_image
                                    }}
                                        style={{ height: 100, width: 100 }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            // if (data.user_details.personal_details === null) {
                                navigation.navigate("PersonalDetails", { user_id:user_id, item: data.user_details.personal_details })
                            // } else {
                                // navigation.navigate("ShowPersonalDetails", { item: data })
                            // }
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Personal Details
                        </Text>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            if (data.user_details.user_education.length > 0) {
                                navigation.navigate("Listeducation", { item: data })
                            } else {
                                navigation.navigate("CreateEducation", { item: data })
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>
                        Education Details
                        </Text>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            if (data.user_details.user_id_proofs.length > 0) {
                                navigation.navigate("GetId", { item: data })
                            } else {
                                navigation.navigate("AddIdProof", { item: data })
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>
                        Id Proofs
                        </Text>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            if (data.user_details.user_experience.length > 0) {
                                navigation.navigate("GetExperience", { item: data })
                            } else {
                                navigation.navigate("AddExperience", { item: data })
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>
                        Work Experience
                        </Text>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                                navigation.navigate("AssignUserSite", { item: data })
                        }}
                    >
                        <Text style={styles.buttonText}>
                        Site Access
                        </Text>
                        <AntDesign name="right" size={20} color="black" />
                    </TouchableOpacity>
                    
                </View>

            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },

    innerContainer: {
        backgroundColor: "rgba(100,100,100,0.2)",
        alignItems: "center",
        marginHorizontal: "10%",
        width: width * 0.9,
        height: "60%",
        justifyContent: "space-evenly",
        borderRadius: 12,
    },
    row: {
        flexDirection: "row",
        width: width * 0.8,
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: Colors.mediumGrey,
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 15
    }
});

export default UserDetails;