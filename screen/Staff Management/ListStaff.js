import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl ,} from "react-native";
import ListComponent from "../../components/ListComponent";
import { useNavigation } from "@react-navigation/native";
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import { getStaffList } from "../../services/staffManagement/addPersonalDetails";
import { useSelector } from "react-redux";

const ListStaff = () => {
    const navigation = useNavigation();
    const [staff, setstaff] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const zooID = useSelector((state) => state.UserAuth.zoo_id);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });
        return unsubscribe;
    }, [navigation])

    const loadData = () => {
        setRefreshing(true)
        setIsLoading(true)
        let postData = {
            'zoo_id': zooID
        }
            getStaffList(postData).then((res) => {
                setstaff(res.data);
                setIsLoading(false)
            }).finally(() => {
                setRefreshing(false)
                setIsLoading(false)
            })
    }
   
    const InnerList = ({ item }) => {
        const { user_id, user_first_name, user_last_name, user_email, user_mobile_number, qr_image } = item.item;
        return (
            <View style={{ flex: 1, }}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>User id : </Text>
                        <Text style={styles.idNumber}>#{user_id}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Name : </Text>
                    <Text style={styles.idNumber}>{user_first_name} {user_last_name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Email : </Text>
                    <Text style={styles.idNumber}>{user_email}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Mobile : </Text>
                    <Text style={styles.idNumber}>{user_mobile_number}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            {
                isLoading || refreshing ? <Loader /> :

                    <View style={styles.container}>
                        <Header title={"Staff"} noIcon={true} />
                        <View style={styles.listSection}>
                            <FlatList
                                data={staff}
                                renderItem={item =>
                                    <ListComponent item={item}
                                        onPress={() => navigation.navigate("UserDetails", {
                                            user_id : item.item.user_id
                                        })}
                                        onPressDelete={() => console.log("Delete")}
                                        onPressEdit={() => console.log("Edit")}
                                    >
                                        <InnerList item={item} />
                                    </ListComponent>}
                                keyExtractor={staff.id}
                                showsVerticalScrollIndicator={false}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
                            />

                            <FloatingButton
                               icon="plus-circle-outline"
                                backgroundColor="#eeeeee"
                                borderWidth={0}
                                borderColor="#aaaaaa"
                                borderRadius={50}
                                linkTo=""
                                floaterStyle={{ height: 60, width: 60 }}
                                onPress={() => navigation.navigate("AddStaff")}
                            />
                        </View>
                    </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingBottom: 8
    },
    listSection: {
        flex: 1,
    },

})

export default ListStaff;