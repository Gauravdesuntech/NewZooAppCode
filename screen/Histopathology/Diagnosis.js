import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from "react-native";
import { Container } from "native-base";
import globalStyles from "../../config/Styles";
import { Header, InputDropdown } from "../../component";
import Colors from "../../config/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Data from "./Demo.json";

const Diagnosis = (props) => {
  const navigation = useNavigation();
  const [selectedCommonNames, setSelectedCommonNames] = useState([]);
  const [toggleSaveBtn, setToggleBtn] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleCommNameDropdown, setToogleCommNameDropdown] = useState(false);
  const [selectCommonModalName, setSelectCommonModalName] = useState("");
  const [durationNo, setDurationNo] = useState("");
  const [detailsReport, setDetailsReport] = useState({
    severity: "",
    frequency: "",
    duration: "",
  });

  const handleSelectCommon = (name) => {
    let item = selectedCommonNames.find((item) => item.name === name);
    if (item) {
      setSelectedCommonNames(
        selectedCommonNames.filter((item) => item.name !== name)
      );
    } else {
      setSelectedCommonNames([
        ...selectedCommonNames,
        {
          ...("name" && { ["name"]: name }),
          ...("value" && { ["value"]: {} }),
        },
      ]);
    }
  };

  const selectedItemsColor = (name) => {
    let item = selectedCommonNames.find((item) => item.name === name);
    if (item) {
      return true;
    } else {
      return false;
    }
  };
  const handleClearAll = () => {
    setSelectedCommonNames([]);
  };

  const handleDeleteName = (name) => {
    setSelectedCommonNames(selectedCommonNames.filter((item) => item !== name));
  };

  const handleClickSaveTemp = () => {
    setToggleBtn(true);
  };
  const handleToggleCommDropdown = (item) => {
    setToogleCommNameDropdown(!toggleCommNameDropdown);
    if (toggleCommNameDropdown) {
      setSelectCommonModalName(item);
      setDetailsReport({
        severity: "",
        frequency: "",
        duration: "",
      });
    } else {
      setSelectCommonModalName(item);
    }
  };

  const handleSave = () => {
    setToggleBtn(false);
    if (templateName) {
      setTemplates([
        ...templates,
        {
          ...("name" && { ["name"]: templateName }),
          ...("value" && { ["value"]: selectedCommonNames }),
        },
      ]);
    }
  };

  const handleSelectFromTemplate = (item) => {
    const saveTempValue = item.value;
    for (let index = 0; index < saveTempValue.length; index++) {
      const item = selectedCommonNames.find(
        (item) => item.name === saveTempValue[index].name
      );
      if (!item) {
        selectedCommonNames.push(saveTempValue[index]);
        setToggle(!toggle);
      }
    }
  };
  useEffect(() => {}, [toggle, selectedCommonNames]);

  const handleSeveritySelect = (name) => {
    setDetailsReport({ ...detailsReport, severity: name });
  };
  const handleFrequencySelect = (frequency) => {
    setDetailsReport({ ...detailsReport, frequency: frequency });
  };
  const handleDurationSelect = (duration) => {
    if (durationNo !== "") {
      setDetailsReport({ ...detailsReport, duration: duration });
    }
  };
  const handleDurationInptSelect = (no) => {
    setDurationNo(no);
  };

  const handleDetailsSubmit = (name) => {
    const index = selectedCommonNames.findIndex((item) => item.name === name);
    const compareObj = {
      severity:
        detailsReport.severity === ""
          ? selectedCommonNames[index].value.severity
          : detailsReport.severity,
      frequency:
        detailsReport.frequency === ""
          ? selectedCommonNames[index].value.frequency
          : detailsReport.frequency,
      duration:
        detailsReport.duration === ""
          ? selectedCommonNames[index].value.duration
          : detailsReport.duration,
    };
    setSelectedCommonNames([
      ...selectedCommonNames.slice(0, index),
      {
        ...selectedCommonNames[index],
        ["name"]: name,
        ["value"]: compareObj,
      },
      ...selectedCommonNames.slice(index + 1),
    ]);
    handleToggleCommDropdown();
  };

  const searchSelectData = (data) => {
    for (let index = 0; index < data.length; index++) {
      const item = selectedCommonNames.find(
        (item) => item.name === data[index].name
      );
      if (!item) {
        selectedCommonNames.push(data[index]);
        setToggle(!toggle);
      }
    }
  };

  return (
    <Container
      style={[
        globalStyles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Header
        leftIconName={"arrow-back"}
        title={"Diagnosis"}
        leftIconShow={true}
        rightIconShow={false}
        leftButtonFunc={() => {
          props.navigation.goBack();
        }}
      />

      {/* Load prev & Clear All button */}
      {selectedCommonNames.length >= 1 ? (
        <TouchableOpacity style={{ width: "100%" }} onPress={handleClearAll}>
          <Text style={globalStyles.clrAll}>Clear All</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.prevLabel}>Load Prev.</Text>
        </View>
      )}

      {/* Search  */}
      <View style={[globalStyles.searchContainer, { margin: 5 }]}>
        <View style={globalStyles.histopathologySearchBox}>
          <TextInput
            autoCompleteType="off"
            placeholder="Search Diagnosis"
            placeholderTextColor={Colors.mediumGrey}
            style={globalStyles.histopathologySearchField}
            onFocus={() =>
              navigation.navigate("CommonSearch", {
                name: "Diagnosis",
                onGoBack: (e) => searchSelectData(e),
              })
            }
          />
        </View>
      </View>

      {/* Common Name List */}
      {selectedCommonNames.map((item, index) => {
        return (
          <View key={index} style={styles.commonNameList}>
            <TouchableOpacity
              style={{ width: "85%" }}
              onPress={() => handleToggleCommDropdown(item.name)}
            >
              <Text style={[globalStyles.selectedName]}>{item.name}</Text>
              <View
                style={[
                  styles.caseReportDetails,
                  { display: item.value.duration ? "flex" : "none" },
                ]}
              >
                <View style={styles.caseReportItem}>
                  <Ionicons
                    name="alarm-outline"
                    size={16}
                    color={Colors.green}
                  />
                  <Text style={[globalStyles.detailsReportTitle]}>
                    {item.value?.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteName(item)}>
              <Ionicons
                name="close-outline"
                size={30}
                color={Colors.mediumGrey}
                style={{ marginTop: -2 }}
              />
            </TouchableOpacity>
          </View>
        );
      })}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {/* Save Template */}
        {toggleSaveBtn ? (
          <>
            {selectedCommonNames.length > 1 ? (
              <View style={styles.saveBtnContainer}>
                <TextInput
                  onChangeText={(e) => setTemplateName(e)}
                  style={styles.saveTempInput}
                  placeholder={"Type Template Name (Eg: Seasonal Flu)"}
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
            {selectedCommonNames.length > 1 ? (
              <TouchableOpacity
                onPress={handleClickSaveTemp}
                style={styles.saveAsTempBtn}
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
                Recently Used
              </Text>
              <View style={styles.commBtnContainer}>
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

          {/* Common Button */}
          <Text style={[globalStyles.searchSuggestionTitle, { marginTop: 10 }]}>
            Most Common
          </Text>
          <View style={styles.commBtnContainer}>
            {Data.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={
                      selectedItemsColor(item.name)
                        ? globalStyles.activeSearchSgBtnCover
                        : globalStyles.searchSuggestionbtnCover
                    }
                    onPress={() => handleSelectCommon(item.name)}
                  >
                    <Text style={globalStyles.caseTypeBtnTxt}>{item.name}</Text>
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
        <TouchableOpacity
          style={[globalStyles.bottomBtnCover]}
          onPress={() => navigation.navigate("Rx")}
        >
          <Text style={globalStyles.bottomBtnTxt}>
            Rx
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={Colors.white}
            />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Dropdown */}
      {toggleCommNameDropdown ? (
        <Modal
          animationType="none"
          transparent={true}
          statusBarTranslucent={true}
          visible={true}
        >
          <View style={[styles.modalOverlay]}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.black,
                      }}
                    >
                      {selectCommonModalName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.closeBtn}
                    onPress={handleToggleCommDropdown}
                  >
                    <Ionicons
                      name="close"
                      size={28}
                      color={Colors.mediumGrey}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  {/* <View style={{ height: "18%" }}>
                    <Text
                      style={[
                        globalStyles.searchSuggestionTitle,
                        { marginTop: 10 },
                      ]}
                    >
                      Severity
                    </Text>
                    <View style={styles.commBtnContainer}>
                      <TouchableOpacity
                        style={
                          detailsReport.severity === "Mild"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleSeveritySelect("Mild")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Mild</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.severity === "Moderate"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleSeveritySelect("Moderate")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>
                          Moderate
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.severity === "High"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleSeveritySelect("High")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>High</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.severity === "Extreme"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleSeveritySelect("Extreme")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Extreme</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ height: "30%" }}>
                    <Text style={[globalStyles.searchSuggestionTitle]}>
                      Frequency
                    </Text>
                    <View style={styles.commBtnContainer}>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "5 Min"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("5 Min")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>5 Min</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "10 Min"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("10 Min")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>10 Min</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "15 Min"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("15 Min")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>15 Min</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "20 Min"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("20 Min")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>20 Min</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "30 Min"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("30 Min")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>30 Min</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "45 Min"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("45 Min")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>45 Min</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "1 Hour"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("1 Hour")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>1 Hour</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.frequency === "Immediately"
                            ? globalStyles.actvModalCommonBtnCover
                            : globalStyles.modalCommonBtnCover
                        }
                        onPress={() => handleFrequencySelect("Immediately")}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>
                          Immediately
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={globalStyles.modalCommonBtnCover}
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Custom</Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}
                  <View style={{ height: "18%" }}>
                    <Text
                      style={[
                        globalStyles.searchSuggestionTitle,
                        { marginTop: 30 },
                      ]}
                    >
                      Duration
                    </Text>
                    <View
                      style={[
                        styles.commBtnContainer,
                        {
                          justifyContent: "center",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <TextInput
                        autoCompleteType="off"
                        style={globalStyles.durationInput}
                        onChangeText={(e) => handleDurationInptSelect(e)}
                        keyboardType="numeric"
                      />
                      <TouchableOpacity
                        style={
                          detailsReport.duration === `${durationNo} Days`
                            ? globalStyles.actvModalDurationBtnCover
                            : globalStyles.modalDurationBtnCover
                        }
                        onPress={() =>
                          handleDurationSelect(`${durationNo} Days`)
                        }
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Days</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.duration === `${durationNo} Weeks`
                            ? globalStyles.actvModalDurationBtnCover
                            : globalStyles.modalDurationBtnCover
                        }
                        onPress={() =>
                          handleDurationSelect(`${durationNo} Weeks`)
                        }
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Weeks</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.duration === `${durationNo} Months`
                            ? globalStyles.actvModalDurationBtnCover
                            : globalStyles.modalDurationBtnCover
                        }
                        onPress={() =>
                          handleDurationSelect(`${durationNo} Months`)
                        }
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Months</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          detailsReport.duration == `${durationNo} Years`
                            ? globalStyles.actvModalDurationBtnCover
                            : globalStyles.modalDurationBtnCover
                        }
                        onPress={() =>
                          handleDurationSelect(`${durationNo} Years`)
                        }
                      >
                        <Text style={globalStyles.caseTypeBtnTxt}>Years</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 100,
                    }}
                  >
                    <TouchableOpacity
                      style={[globalStyles.modalBtnCover]}
                      onPress={() => handleDetailsSubmit(selectCommonModalName)}
                    >
                      <Text style={globalStyles.bottomBtnTxt}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      ) : null}
    </Container>
  );
};
export default Diagnosis;

const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  commonNameList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginTop: 10,
    marginLeft: 5,
  },
  caseReportDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  caseReportItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    backgroundColor: "#f7f9f9",
    marginTop: 25,
    paddingTop: 10,
  },
  saveBtnContainer: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  saveTempInput: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    width: "60%",
    marginRight: 2,
  },
  saveAsTempBtn: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  commBtnContainer: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
  labelName: {
    color: Colors.textColor,
    fontSize: 14,
  },
  textfield: {
    height: 40,
    fontSize: 12,
    color: Colors.textColor,
    // width: "100%",
    padding: 5,
  },
  modalOverlay: {
    height: windowHeight,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: Math.floor(windowHeight * 0.4),
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    height: 50,
    width: "90%",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  modalBody: {
    height: "100%",
    flex: 1,
    // paddingVertical: 8,
    width: "90%",
    // backgroundColor: "red",
  },
});
