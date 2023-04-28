import React, { useState, useEffect } from "react";
import {
  ScrollView,
    StyleSheet,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import FloatingButton from "../../components/FloatingButton"
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils/Utils";
//Import API CALLS
import { getHierarchy, getSpeciesAnimals } from "../../services/StatsService";
import { Avatar, Card, Checkbox, Chip } from "react-native-paper";
import CustomCard from "../../components/CustomCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ImageHeader from "../../components/ImageHeader";
import StatsBlock from "../../components/StatsBlock";
import Loader from "../../components/Loader";

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
        <ImageHeader title={props.title} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>
    </>
  );
};

export default function ComonNameDetails() {
  
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
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [Loading, setLoading] = React.useState(false);

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showOrder, setShowOrder] = useState(false);
  const [tags, setTags] = useState(route.params.tags);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);
  const handleCheck = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== Anims));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  useEffect(() => {
    setLoading(true);
    console.log(route.params.title);
    getSpeciesAnimals({
      zoo_id: zooID,
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        setOrderHierchyData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log("Stats Err", err));
  }, []);

  return (
    <>
    <Loader visible={Loading} />
      <SafeAreaView style={styles.container}>
      
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
      {/* <StatusBar /> */}
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
      {Loading ? null : (
        <View style={{ backgroundColor: "#DAE7DF" }}>
          <Card style={styles.cardContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: heightPercentageToDP(1),
              }}
            >
              <StatsBlock
                insightData={orderHierchyData?.total_animals ?? 0}
                label="Total"
                borderColor="#37BD69"
                borderWidth={2}
                backgroundColor={"white"}
              />
              <StatsBlock
                insightData={orderHierchyData?.total_sections ?? 0}
                label="Sections"
                borderColor="#1F515B"
                borderWidth={1}
              />
              <StatsBlock
                insightData={orderHierchyData?.total_enclosure ?? 0}
                label="Enclosures"
                borderColor="#1F515B"
                borderWidth={1}
              />
            </View>
            <View
              style={{
                padding: 12,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <View>
                  {tags ? (
                    <View>
                      <View
                        style={styles.tagsContainer}
                        onStartShouldSetResponder={() => true}
                      >
                        {Object.keys(tags).map((key) => (
                          <View
                            key={key}
                            style={
                              key == "male"
                                ? styles.malechip
                                : key == "female"
                                ? styles.femalechip
                                : key == "undetermined"
                                ? styles.undeterminedChip
                                : key == "indetermined"
                                ? styles.indeterminedChip
                                : {}
                            }
                          >
                            <Text
                              style={
                                key == "male"
                                  ? styles.malechipText
                                  : key == "female"
                                  ? styles.femalechipText
                                  : key == "undetermined"
                                  ? styles.undeterminedText
                                  : key == "indetermined"
                                  ? styles.indeterminedText
                                  : {}
                              }
                            >
                              {key == "male"
                                ? `M - ${tags[key]}`
                                : key == "female"
                                ? `F - ${tags[key]}`
                                : key == "undetermined"
                                ? `UD - ${tags[key]}`
                                : key == "indetermined"
                                ? `ID - ${tags[key]}`
                                : null}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
              <View
                style={[styles.tagsContainer]}
                onStartShouldSetResponder={() => true}
              >
                {Object.keys(tags).map((key) => (
                  <View
                    key={key}
                    style={
                      key == "undetermined"
                        ? styles.undeterminedChipB1
                        : key == "indetermined"
                        ? styles.indeterminedChipE1
                        : {}
                    }
                  >
                    <Text
                      style={
                        key == "undetermined"
                          ? styles.undeterminedText
                          : key == "indetermined"
                          ? styles.indeterminedText
                          : {}
                      }
                    >
                      {key == "undetermined"
                        ? `B-1`
                        : key == "indetermined"
                        ? `E-1`
                        : null}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </View>
      )}
         <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: "#DAE7DF" }}
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
      {/* <View style={{ flex: 1, height: "100%", backgroundColor: "#DAE7DF" }}> */}
        <FlatList
          data={orderHierchyData.animals}
          // showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 14 }}>
                <CustomCard
                  title={item.user_enclosure_name}
                  chips={
                    <View>
                      {tags ? (
                        <View>
                          <View
                            style={styles.tagsContainer}
                            onStartShouldSetResponder={() => true}
                          >
                            {Object.keys(tags).map((key) => (
                              <View
                                key={key}
                                style={
                                  key == "male"
                                    ? styles.malechipM
                                    : key == "female"
                                    ? styles.femalechipF
                                    : {}
                                }
                              >
                                <Text
                                  style={
                                    key == "male"
                                      ? styles.malechipText
                                      : key == "female"
                                      ? styles.femalechipText
                                      : {}
                                  }
                                >
                                  {key == "male"
                                    ? `M `
                                    : key == "female"
                                    ? `F `
                                    : null}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      ) : null}
                    </View>
                  }
                  subtitle={
                    "Enclosure ID: " +
                    item.enclosure_code +
                    "\nSection - " +
                    item.section_name
                  }
                  checkbox={
                    <View
                      style={{
                        marginHorizontal: widthPercentageToDP(1),
                        marginVertical: widthPercentageToDP(4),
                      }}
                    >
                      <Checkbox
                        value={checkedItems.includes(item.animal_id)}
                        onValueChange={() => handleCheck(item.animal_id)}
                      />
                    </View>
                  }
                  rightIcon={
                    <View
                      style={{
                        marginHorizontal: widthPercentageToDP(10),
                        marginVertical: widthPercentageToDP(6.5),
                      }}
                    >
                      <AntDesign name="right" size={14} color="black" />
                    </View>
                  }
                  sex={item.sex}
                  count={item.animal_count}
                />
              </View>
            );
          }}
        />
        </ScrollView>
      </View>
      <FloatingButton
          icon={"plus-circle-outline"}
          onPress={() => {
            navigation.navigate("AnimalAddDynamicForm");
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header Container
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
    marginVertical: 8,
    marginTop: 12,
    height: heightPercentageToDP(17),
    backgroundColor: "#F2FFF8",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 10,
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
  dataRow: {
    alignItems: "center",
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    // paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },

  malechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#DAE7DF",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  femalechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#DAE7DF",
    fontWeight: 500,
    marginLeft: 5,
  },
  undeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#FFD3D3",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  indeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#F0F4FE",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  malechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  femalechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  undeterminedText: {
    fontSize: 12,
    color: "#1F515B",
  },
  indeterminedText: {
    fontSize: 12,
    color: "#1F515B",
  },
  undeterminedChipB1: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  indeterminedChipE1: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#52F990",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  malechipM: {
    backgroundColor: "#DAE7DF",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 500,
  },
  femalechipF: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    fontWeight: 500,
    marginLeft: 5,
  },
});