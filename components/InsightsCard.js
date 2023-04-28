import { Entypo } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Text, View } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {shortenNumber} from '../utils/Utils';


const InsightsCard = ({ title, insightData, ...props }) => {
  console.log(Dimensions.get("window").width);

  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState();
  const data = [
    {
      id: 1,
      name: "1W",
    },
    {
      id: 2,
      name: "1M",
    },
    {
      id: 3,
      name: "3M",
    },
    {
      id: 4,
      name: "6M",
    },
    {
      id: 5,
      name: "1Y",
    },
    {
      id: 6,
      name: "5Y",
    },
    {
      id: 7,
      name: "ALL",
    },
  ];

  const Item = ({ item, onPress }) => (
    <View style={{}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.item,
          { backgroundColor: item.id == selectedId ? "#37BD69" : null },
        ]}
      >
        <Text
          style={[
            styles.itemText,
            { color: item.id == selectedId ? "#FFFFFF" : "#1F515B" },
          ]}
        >
          {" "}
          {` ${item.name}`}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    // const backgroundColor = index === selectedId ? '#37BD69' : 'grey';

    // const colors=backgroundColor ? "white" : "black"

    return (
      <Item
        style={[styles.itemContainer]}
        item={item}
        onPress={() => setSelectedId(item.id)}

        // backgroundColor={backgroundColor}

        // colors={backgroundColor}
      />
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#F2FFF8",
        borderRadius: wp(3),
       
      }}
    >
      <Card.Title
      style={{ marginVertical : hp(1)}}
        title={title}
        subtitle="Last Updateed Today 7:00 AM"
        titleStyle={{
          fontWeight: "400",
          fontSize: hp(2),
          color: "#000",
          left: wp(3),
          
        }}
        subtitleStyle={{
          fontWeight: "400",
          fontSize: 11.5,
          color: "#839D8D",
          left: wp(3),
          marginTop : hp(-0.5)
        }}
        left={(props) => (
          <View
            style={{
              borderRadius: wp(30),
              height: wp(12),
              width: hp(6),
              backgroundColor: "#FFBDA8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require("../assets/insights.png")} />
          </View>
        )}
      />
      <Entypo
        name="dots-three-vertical"
        size={wp(5)}
        style={{
          color: "#717970",
          alignSelf: "flex-end",
          top: hp(3.5),
          right: wp(5),
          position: "absolute",
        }}
      />

      <FlatList
        data={data}
        horizontal={true}
        renderItem={renderItem}
        extraData={selectedId}
        contentContainerStyle={{ marginLeft: wp("4%"), marginTop: wp(1) }}
      />
      <Feather
        name="calendar"
        size={wp(5)}
        color="#1F515B"
        onPress={props.onPress}
        style={{
          color: "#717970",
          alignSelf: "flex-end",
          right: wp(8),
          bottom: wp(7.2),
        
        }}
      />

      {/* First Uline */}
      <View style={{ marginHorizontal : wp(6) ,marginBottom : wp(2),marginTop : -12 }}>
        <Divider bold={true} />
      </View>

      <Text
        style={{
          width: "90%",
          left: wp(5.2),
          fontWeight: "700",
          fontSize: hp(1.5),
          color: "#006D35",
        }}
      >
        {" "}
        4 Apr 2023 - 11 Apr 2023{" "}
      </Text>

      {/* last Uline */}

      <View style={{ marginHorizontal : wp(6),marginVertical : wp(2)}}>
        <Divider bold={true}/>
      </View>
      {/* fifth div */}

      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          margin: wp(3),
        }}
      >
        <View style={{alignItems : "center"}}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(1.5),
              color: "#E93353",
            }}
          >
            +23%
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(6),
              lineHeight: hp(7),
              color: "#1F515B",
            }}
          >
            {shortenNumber(27)}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: hp(2),
              color: "#666666"
            }}
          >
            Species
          </Text>
        </View>

        <View style={{alignItems: "center"}}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(1.5),
              color: "#E93353",
            }}
          >
            -3%
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(6),
              lineHeight: hp(7),
              color: "#1F515B",
            }}
          >
           {shortenNumber(133)} 
            
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: hp(2),
              color: "#666666"
            }}
          >
            Population
          </Text>
        </View>
      </View>

      {/* last div */}
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          marginTop: hp(1.5),
          alignItems : "center"
        }}
      >
        <View style={styles.parent}>
          <Text style={styles.firstNum}>-18%</Text>
          <Text style={styles.firstDiv}> {shortenNumber(props.middlelabel)}</Text>
          <Text style={styles.textStyle}>Accession</Text>
        </View>

        <View style={styles.parent}>
          <Text style={styles.firstNum}>-13%</Text>
          <Text style={styles.firstDiv}> {shortenNumber(props.middlabel)}</Text>
          <Text style={styles.textStyle}>Birth</Text>
        </View>

        <View style={styles.parent}>
          <Text style={styles.firstNum}>+13%</Text>
          <Text style={styles.firstDiv}> {shortenNumber(props.lastlabel)} </Text>
          <Text style={styles.textStyle}>Mortality</Text>
        </View>
      </View>

      {/* Send the Props  */}

      {insightData != "birds" ? (
        <View style={styles.main}>
          <View style={{alignItems : "center"}}>
            <Text style={styles.firstNum}>-3%</Text>
            <Text style={styles.firstDiv}>{shortenNumber(877)}</Text>
            <Text style={styles.textStyle}>Egg</Text>
          </View>

          <View style={{alignItems : "center"}}>
            <Text style={styles.firstNum}>-3%</Text>
            <Text style={styles.firstDiv}>{shortenNumber(425)}</Text>
            <Text style={styles.textStyle}>Incubation</Text>
          </View>

          <View style={{alignItems : "center"}}>
            <Text style={styles.firstNum}>+13%</Text>
            <Text style={styles.firstDiv}> {shortenNumber(455)}</Text>
            <Text style={styles.textStyle}>Hand Raised</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default InsightsCard;

const styles = StyleSheet.create({
  itemText: {
    fontSize: hp(1.5),
    color: "#1F515B",
    fontWeight: "400",
  },
  item: {
    width: wp(10),
    height: hp(4),
    justifyContent: "center",
    marginHorizontal: wp(0),
  },
  main: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: wp(4),
    marginBottom: wp(7),
    alignItems : "center",
  },
  parent: {
    alignItems: "center",
  },
  firstDiv: {
    fontWeight: "600",
    fontSize: hp(5),
    color: "#1F515B",
  },
  firstNum: {
    fontWeight: "600",
    fontSize: hp(1.5),
    color: "#E93353",
  },
  textStyle: {
    fontWeight: "400",
    fontSize: hp(2),
    color: "#666666"
  },
});
