// DATE:13 APRIL 2023
// NAME: GANESH AHER
// WORK:
// 1.Add Header
// 2.Design Birds Insights
// 3.Add parot ScrollView

import React, { useState, useEffect } from "react";
import InsightsCard from "../../components/InsightsCard";
import Header from "../../components/Header";
import HeaderInsight from "../../components/HeaderInsight";
import { Avatar } from "react-native-paper";
import ParotComponent from "../../components/ParotComponent";
import { ScrollView, StyleSheet, Text, FlatList, View } from "react-native";
// import ParotComponent from '../../components/ParotComponent'
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils/Utils";
import CustomCard from "../../components/CustomCard";
import Loader from "../../components/Loader";

//Import API CALLS
import { getHierarchy } from "../../services/StatsService";

export default function BirdsInsight() {
  const navigation = useNavigation();
  const route = useRoute();

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showOrder, setShowOrder] = useState(false);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);

  // Full Name
  const [fullName, setFullName] = useState("");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getHierarchy({
      zoo_id: zooID,
      type: "order",
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        setOrderHierchyData(res.data);
        setShowOrder(true);
        setFullName(res.data.classification_list[0].complete_name);
        setLoading(false);
        // console.log('THIS IS THE RESPONSE: ', res.data.classification_list[0].complete_name);
      })
      .catch((err) => {
        console.log("Stats Err", err);
        setLoading(false);
      })
      .finally(()=>{
        setLoading(false)
      })
  }, []);

  // if (!showOrder) {
  //   return null;
  // }

  return (
    <>
      <Loader visible={Loading} /> 
        <View style={{ flex: 1, backgroundColor: "#DAE7DF" }}>
          
          <Header
            title="Collections"
            noIcon={true}
            style={{ paddingBottom: 20 }}
          />   
          <ScrollView
            style={{ marginHorizontal: 14 }}
            showsVerticalScrollIndicator={false}
          >         
            <InsightsCard
              title={"Insights"}
              middlelabel={198}
              middlabel={437}
              lastlabel={290}
            />
            <View style={{ flex: 1, marginBottom: 40 }}>        
              
              <FlatList
                data={orderHierchyData.classification_list}
                keyExtractor={(item) => item.tsn_id}
                renderItem={({ item }) => {
                  return (
                    <CustomCard
                      title={
                        item?.common_name
                          ? capitalize(item?.common_name)
                          : capitalize(item?.complete_name)
                      }
                      tsn_id={item.tsn_id}
                      onPress={() =>
                        navigation.navigate("FamilyHierarchy", {
                          tsn_id: item?.tsn_id ?? 0,
                          title: item?.common_name,
                        })
                      }
                      count={item.animal_count}
                    />

                    // <ParotComponent
                    //     title={item?.common_name ? capitalize(item?.common_name) : capitalize(item?.complete_name)}
                    //     screenName={"FamilyHierarchy"}
                    //     onPress={() => navigation.navigate("FamilyHierarchy", { tsn_id: item?.tsn_id ?? 0, title: item?.common_name })}
                    //     //   subtitle={`(${item?.complete_name ?? ''})`}
                    //     tsn_id={item.tsn_id}
                    //     RightContent={() => (
                    //         <Text style={{ marginRight: 10, fontSize: 24, color: "#006D35" }}>{item.animal_count}</Text>
                    //     )}
                    //     LeftContent={() => (

                    //         <Avatar.Image
                    //             size={48}
                    //             source={require("../../assets/parrot.jpeg")}

                    //         />
                    //     )}
                    // />
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#DAE7DF",
  },
  header: {
    backgroundColor: "#DAE7DF",
  },
});
