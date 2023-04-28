import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Header from "../../components/Header";
const DATA = [
  {
    id: "1",
    title: "ADD DESIGNATION ",
    screen: "CreateDesignation",
  },
  {
    id: "2",
    title: "ADD DEPARTMENT",
    screen: "empDepartment",
  },
  {
    id: "3",
    title: "ADD ID PROOFS",
    screen: "ClientIdproof",
  },
  {
    id: "4",
    title: "EDUCATION TYPE",
    screen: "Education",
  },
  // {
  //   id: "6",
  //   title: "ADD FEED LOG",
  //   screen: "AddFeedLog",
  // },
  // {
  //   id: "7",
  //   title: "EGGS",
  //   screen: "EggLists",
  // },
  {
    id: "8",
    title: "CHANGE ENCLOSURE",
    screen: "changeEnclosure",
  },
  {
    id: "9",
    title: "Medical Record",
    screen: "HistopathologyList",
  },
  {
    id: "10",
    title: "Add Medical Record",
    screen: "MedicalRecord",
  },
];

const Item = ({ title, screen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <Text onPress={() => navigation.navigate(`${screen}`)}>{title}</Text>
    </View>
  );
};

export default function Master() {
  const renderItem = ({ item }) => (
    <Item title={item.title} screen={item.screen} />
  );
  return (
    <>
      <Header title="Masters" noIcon={true} />
        <View style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
    flex:1
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
