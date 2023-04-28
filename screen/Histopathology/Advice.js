import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { Container } from "native-base";
import globalStyles from "../../config/Styles";
import { Header } from "../../component";
import Colors from "../../config/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Data from "./Advice.json";

const Advice = (props) => {
  const navigation = useNavigation();
  const [selectRecommendeNames, setSelectRecommendedNames] = useState([]);
  const [toggleSaveBtn, setToggleBtn] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleSelectRecomended = (name) => {
    let item = selectRecommendeNames.find((item) => item === name);
    if (item) {
      setSelectRecommendedNames(
        selectRecommendeNames.filter((item) => item !== name)
      );
    } else {
      setSelectRecommendedNames([...selectRecommendeNames, name]);
    }
  };

  const handleClickSaveTemp = () => {
    setToggleBtn(true);
  };

  const changeAdvice = (e) => {
    let arr = [];
    arr = e.split(",");
    setSelectRecommendedNames(arr);
  };

  const selectedItemsColor = (name) => {
    let item = selectRecommendeNames.find((item) => item === name);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  const handleClearAll = () => {
    setSelectRecommendedNames([]);
  };

  const handleSelectFromTemplate = (item) => {
    const saveTempValue = item.value;
    for (let index = 0; index < saveTempValue.length; index++) {
      if (!selectRecommendeNames.includes(saveTempValue[index])) {
        selectRecommendeNames.push(saveTempValue[index]);
        setToggle(!toggle);
      }
    }
  };

  useEffect(() => {}, [toggle, selectRecommendeNames]);

  const handleSave = () => {
    setToggleBtn(false);
    if (templateName) {
      setTemplates([
        ...templates,
        {
          ...("name" && { ["name"]: templateName }),
          ...("value" && { ["value"]: selectRecommendeNames }),
        },
      ]);
    }
  };

  return (
    <Container style={[globalStyles.container, styles.center]}>
      <Header
        leftIconName={"arrow-back"}
        title={"Advice"}
        leftIconShow={true}
        rightIconShow={false}
        leftButtonFunc={() => {
          props.navigation.goBack();
        }}
      />

      {/* Load prev & Clear all  */}
      {selectRecommendeNames.length >= 1 ? (
        <TouchableOpacity style={{ width: "100%" }} onPress={handleClearAll}>
          <Text style={globalStyles.clrAll}>Clear All</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.prevLabel}>Load Prev.</Text>
        </View>
      )}

      {/* Advice Input Box */}
      <View style={[globalStyles.adviceContainer, { margin: 10 }]}>
        <View style={globalStyles.histopathologyAdviceBox}>
          <TextInput
            multiline={true}
            autoCompleteType="off"
            placeholder="Type Advice"
            placeholderTextColor={Colors.mediumGrey}
            style={globalStyles.histopathologySearchField}
            onChangeText={(e) => changeAdvice(e)}
            maxLength={500}
            defaultValue={String(
              selectRecommendeNames.map((item) => {
                return item;
              })
            )}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {/* Save Button */}
        {toggleSaveBtn ? (
          <>
            {selectRecommendeNames.length > 1 ? (
              <View style={styles.saveBtnCover}>
                <TextInput
                  onChangeText={(e) => setTemplateName(e)}
                  style={styles.inputTemp}
                  placeholder={"Type Template Name (Eg: Drink Water)"}
                />
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={handleSave}
                >
                  <Ionicons
                    name="save-outline"
                    size={20}
                    color={Colors.mediumGrey}
                  />
                  <Text style={[globalStyles.saveTemp]}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {selectRecommendeNames.length > 1 ? (
              <TouchableOpacity
                onPress={handleClickSaveTemp}
                style={styles.saveBtn}
              >
                <Ionicons
                  name="save-outline"
                  size={20}
                  color={Colors.mediumGrey}
                />
                <Text style={[globalStyles.saveTemp]}>Save as Template</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </>
        )}
        <View
          style={[
            globalStyles.rowContainer,
            {
              marginHorizontal: 20,
            },
          ]}
        >
          {/* Template List */}
          {templates.length >= 1 ? (
            <>
              <Text style={globalStyles.searchSuggestionTitle}>
                Your Template
              </Text>
              <View style={styles.commonListStyle}>
                {templates.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => handleSelectFromTemplate(item)}
                        style={[globalStyles.recentlyUsedbtnCover]}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <></>
          )}

          {/* Recommende List */}
          <Text style={[globalStyles.searchSuggestionTitle, { marginTop: 10 }]}>
            Recommended
          </Text>
          <View style={styles.commonListStyle}>
            {Data.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={
                      selectedItemsColor(item.name)
                        ? globalStyles.activeSearchSgBtnCover
                        : globalStyles.searchSuggestionbtnCover
                    }
                    onPress={() => handleSelectRecomended(item.name)}
                  >
                    <Text style={globalStyles.caseTypeBtnTxt}>
                      {item.name.length > 10
                        ? item.name.slice(0, 10) + "..."
                        : item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={[globalStyles.bottomPreviewBtnCover]}>
          <Text style={globalStyles.bottomPreviewBtnTxt}>Preview Rx</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.bottomBtnCover]}>
          <Text style={globalStyles.bottomBtnTxt}>
            Test Requested
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={Colors.white}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Advice;

const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
  scrollContainer: {
    width: "100%",
    backgroundColor: "#f7f9f9",
    marginTop: 25,
    paddingTop: 10,
  },
  saveBtnCover: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputTemp: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    width: "60%",
    marginRight: 2,
  },
  saveBtn: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  commonListStyle: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
});
