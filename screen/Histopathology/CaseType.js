import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Container } from "native-base";
import globalStyles from "../../config/Styles";
import { Header } from "../../component";
import Colors from "../../config/colors";
import Data from "./CaseType.json";

const CaseType = (props) => {
  const [selectedCaseType, setSelectedCaseType] = useState([]);

  const handleSelectedCaseType = (name) => {
    let item = selectedCaseType.find((item) => item === name);
    if (item) {
      setSelectedCaseType(selectedCaseType.filter((item) => item !== name));
    } else {
      setSelectedCaseType([...selectedCaseType, name]);
    }
  };
  return (
    <Container style={globalStyles.container}>
      <Header
        leftIconName={"arrow-back"}
        title={"Case Type"}
        leftIconShow={true}
        rightIconShow={false}
        leftButtonFunc={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            globalStyles.rowContainer,
            {
              marginVertical: 40,
              marginHorizontal: 20,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    globalStyles.caseTypebtnCover,
                    {
                      backgroundColor: !selectedCaseType.includes(item.name)
                        ? Colors.white
                        : Colors.lightGreen,
                    },
                  ]}
                  onPress={() => handleSelectedCaseType(item.name)}
                >
                  <Text style={globalStyles.caseTypeBtnTxt}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default CaseType;
