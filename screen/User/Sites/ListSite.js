
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import FloatingButton from '../../../components/FloatingButton';
import Loader from '../../../components/Loader';
import Header from '../../../components/Header';
import { useNavigation } from "@react-navigation/native";
import { deletesite, getZooSite } from "../../../services/AddSiteService";
import ListComponent from "../../../components/ListComponent";
import { useSelector } from "react-redux";



const ListSite = () => {

    const [siteData, setSiteData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const zooID = useSelector((state) => state.UserAuth.zoo_id);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getRefreshData();
        });
        return unsubscribe;
    }, [navigation])

    const getRefreshData = () => {
        setRefreshing(true)
        setIsLoading(true);
        getZooSite(zooID).then((res) => {
            setSiteData(res.data)
        }).catch((err) => {
            console.log('error', err);
        }).finally(() => {
            setRefreshing(false)
            setIsLoading(false)
        })
    }

    const deleteSite = (item) => {
        setIsLoading(true);
        let obj = {
            id: item.id,
        }
        deletesite(obj).then((res) => {
            if (!res.success) {
                alert("Something went wrong!!");
            } else {
                alert("Deleted Successfully");
            }
        }).catch((err) => {
            console.log(err);
            alert("Something went wrong!!");
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const InnerComponent = ({ item }) => {
        const { id, site_name, user_id, full_access, active, created_at, modified_at } = item.item;
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Id:</Text>
                    <Text style={styles.idNumber}>{id}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Site Name:</Text>
                    <Text style={styles.idNumber}>{site_name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>User Id:</Text>
                    <Text style={styles.idNumber}>{user_id}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Full Access :</Text>
                    <Text style={styles.idNumber}>{full_access}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Active :</Text>
                    <Text style={styles.idNumber}>{active}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Created_at:</Text>
                    <Text style={styles.idNumber}>{created_at}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Modified_at:</Text>
                    <Text style={styles.idNumber}>{modified_at}</Text>
                </View>
            </View>
        )
    }

    const editExperienceData = ({ item }) => {
        navigation.navigate('CreateSite', { item })
    }

    return (
        <>
            {
                isLoading ? <Loader loaderSize={'lg'} /> :
                    <View style={styles.container}>
                        <Header noIcon={true} title={'ListSite'} />
                        <View style={styles.listSection}>
                            <FlatList
                                data={siteData}
                                renderItem={(item) => <ListComponent item={item}
                                    onPressDelete={(item) => deleteSite(item)}
                                    onPressEdit={() => editExperienceData(item)} ><InnerComponent item={item} /></ListComponent>}
                                showsVerticalScrollIndicator={false}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshData}/>}
                            />

                            <FloatingButton
                               icon="plus-circle-outline"
                                backgroundColor="#eeeeee"
                                borderWidth={0}
                                borderColor="#aaaaaa"
                                borderRadius={50}
                                linkTo=""
                                floaterStyle={{ height: 60, width: 60 }}
                                onPress={() => navigation.navigate("CreateSite")}
                            />
                        </View>
                    </View>
            }
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
        // backgroundColor:'red'
    }
})

export default ListSite;
