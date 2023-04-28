import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Animated,
  Text,
  FlatList,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
// import ParotComponent from '../../components/ParotComponent'
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils/Utils";
//Import API CALLS
import { getHierarchy } from "../../services/StatsService";
// import Loader from "../../components/Loader";
import { Avatar, Card, Chip } from "react-native-paper";
import CustomCard from "../../components/CustomCard";
import { Entypo } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ImageHeader from "../../components/ImageHeader";
import Loader from "../../components/Loader";

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

const OverlayContent = (props) => {
  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <ImageHeader title="Parrot" />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.title ? (
            <View
              style={{
                height: "38%",
                width: "50%",
                justifyContent: "center",
                backgroundColor: "#00000066",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                {props.title}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};
const FamilyHierarchy = () => {
  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Maximum_Height = 200;
  //Max Height of the Header
  const Header_Minimum_Height = 50;
  //Min Height of the Header

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: ["#4286F4", "#fff"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: [Header_Maximum_Height, 50],
    extrapolate: "clamp",
  });

  const navigation = useNavigation();
  const route = useRoute();

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showOrder, setShowOrder] = useState(false);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getHierarchy({
      zoo_id: zooID,
      type: "family",
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        setOrderHierchyData(res.data);
        setShowOrder(true);
        setLoading(false);
        console.log("data>>>>>>>>>>>>>>>>>>", res.data);
      })
      .catch((err) => console.log("Stats Err", err))
      .finally(() => {
        setLoading(false);
      })
  }, []);

  // if (!showOrder) {
  //   return null;
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={Loading} />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackgroundColor,
            },
          ]}
        >
          <View style={styles.headerContainer}>
            <ImageBackground
              style={styles.bgImage}
              source={require("../../assets/image.png")}
            >
              <View>
                <OverlayContent
                  navigation={navigation}
                  title={capitalize(route.params.title)}
                />
              </View>
            </ImageBackground>
          </View>
        </Animated.View>
        <View style={{ backgroundColor: "#DAE7DF" }}>
          <Card style={styles.cardContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.cardTitle}>All Time Data</Text>

              <Entypo
                name="chevron-small-down"
                size={24}
                color="#006D35"
                style={{ marginTop: 15, right: 10 }}
              />
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.dataRow}>
                <Text style={styles.cardNumber}>46</Text>
                <Text style={styles.cardNumberTitle}>Population</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.cardNumber}>12</Text>
                <Text style={styles.cardNumberTitle}>Birth</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.cardNumber}>5</Text>
                <Text style={styles.cardNumberTitle}>Mortality</Text>
              </View>
            </View>
          </Card>
        </View>
        <ScrollView
          scrollEventThrottle={16}
          style={{ backgroundColor: "#DAE7DF" }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: AnimatedHeaderValue },
                },
              },
            ],
            { useNativeDriver: false }
          )}
        >
          {/* <View style={{ height: "100%", backgroundColor: "#DAE7DF" }}> */}
          <FlatList
            data={orderHierchyData.classification_list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ marginHorizontal: 14 }}>
                  <CustomCard
                    title={item.common_name}
                    subtitle={
                      item.common_name
                        ? `(${item?.complete_name ?? ""})`
                        : item?.complete_name
                    }
                    tsn_id={item.tsn_id}
                    onPress={() =>
                      navigation.navigate("GenusHierarchy", {
                        tsn_id: item?.tsn_id ?? 0,
                        title: item?.common_name,
                      })
                    }
                    count={item.animal_count}
                  />
                </View>
              );
            }}
          />
          {/* </View> */}
          {/* Put all your Component here inside the ScrollView */}
          {/* {dummyData.map((item, index) => (
            <Text style={styles.textStyle} key={index}>
              {item}
            </Text>
          ))} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FamilyHierarchy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // flex: 1,
    height: "100%",
    width: "100%",
  },
  bgImage: {
    height: "100%",
    width: "100%",
  },
  row: {
    paddingTop: "4%",
    paddingBottom: "4%",
    marginHorizontal: "8%",
    flexDirection: "row",
  },
  title: {
    color: "slategrey",
    fontSize: 12,
  },
  cardContainer: {
    marginHorizontal: 14,
    marginVertical: 10,
    height: 129,
    backgroundColor: "#F2FFF8",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 10,
  },
  dataRow: {
    alignItems: "center",
  },
  cardTitle: {
    color: "#006D35",
    fontWeight: "600",
    fontSize: 15,
    margin: 15,
  },
  cardNumber: {
    fontSize: 36,
    fontWeight: "600",
    color: "#1F515B",
  },
  cardNumberTitle: {
    color: "#666666",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    padding: 20,
  },
});
