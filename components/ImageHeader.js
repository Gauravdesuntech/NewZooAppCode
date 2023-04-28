import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ImageHeader = (props) => {
  const navigation = useNavigation();

  const gotoBack = () => navigation.goBack();

  return (
    <>
      <View
        style={{
          margin: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={gotoBack}
          style={{
            left: 12,
            height: "100%",
          }}
        >
          <Ionicons name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, color: "#fff" }}>{props.title}</Text>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={32}
          color="white"
          style={{
            right: 12,
            height: "100%",
          }}
        />
      </View>
    </>
  );
};

export default ImageHeader;
