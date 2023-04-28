import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../configs/Colors";
import { capitalize } from "../utils/Utils";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { shortenNumber } from '../utils/Utils';

const Card = ({
  title,
  subtitle,
  tags,
  count,
  imageSource,
  onPress,
  checkbox,
  rightIcon,
  chips,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={props.CardStyle?props.CardStyle:styles.cardContainer}>
        {checkbox ? checkbox : null}
        <Image
          style={styles.image}
          source={require("../assets/parrot.jpeg")} // Pass the image source as a prop
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <View style={styles.middleSection}>
            {title ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={props.TitleStyle ? props.TitleStyle : styles.title}>{title}</Text>
                {chips}
              </View>
            ) : null}
            {subtitle ? (
              <Text style={props.subtitleStyle ? props.subtitleStyle : styles.subtitle}>
                {subtitle}
              </Text>
            ) : null}

            <View style={{ height: 10 }}></View>

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
          {count ? (
            <View style={styles.rightSection}>
              <Text style={styles.count}>{shortenNumber(count)}</Text>
            </View>
          ) : (
            <View>{rightIcon}</View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: widthPercentageToDP("2%"),
    marginVertical: widthPercentageToDP("2%"),

    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 5,
  },
  contentContainer: {
    flexDirection: "row",
  },
  leftSection: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    justifyContent: "center",
    width: "35%",
    paddingRight: 30,
  },
  count: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-end",
    color: Colors.count,
  },
  middleSection: {
    width: "60%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.subtitle,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.subtitle,
    fontWeight: "400",
    fontStyle: "italic",
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 4,
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
});

export default Card;
