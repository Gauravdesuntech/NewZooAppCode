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
import { Checkbox } from "../../component";
import { Container } from "native-base";
import globalStyles from "../../config/Styles";
import Colors from "../../config/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Data from "./SearchItems.json";

const CommonSearch = (props) => {
  const navigation = useNavigation();
  const [selectedCheckedBox, setSelectedCheckBox] = useState([]);
  const [selectCount, setSelectCount] = useState(0);
  const [toggleSelectedList, setToggleSelectedList] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchInput, setSearchInput] = useState(
    props.route.params.itemName ? props.route.params.itemName : ""
  );
  const [toggleSelectedModal, setToggleSelectedModal] = useState(false);
  const [selectItemName, setSelectItemName] = useState("");
  const [durationNo, setDurationNo] = useState("");
  const [durationType, setDurationType] = useState("");
  const [detailsReport, setDetailsReport] = useState({
    dosage: "",
    duration: "",
    when: "",
    quantity: 0,
    note: "",
  });

  console.log("dsgydgydssduhdshu", props.route.params);
  const selectAction = (e) => {
    if (selectedCheckedBox.includes(e.id)) {
      setSelectedCheckBox(selectedCheckedBox.filter((item) => item !== e.id));
      setSelectedItems(selectedItems.filter((item) => item.name !== e.name));
      setSelectCount(selectCount - 1);
      if (props.route.params.name === "Rx") {
        setToggleSelectedModal(false);
        setSelectItemName(e.name);
      }
    } else {
      setSelectedCheckBox([...selectedCheckedBox, e.id]);
      setSelectedItems([
        ...selectedItems,
        {
          ...("name" && { ["name"]: e.name }),
          ...("value" && { ["value"]: {} }),
        },
      ]);
      setSelectCount(selectCount + 1);
      if (props.route.params.name === "Rx") {
        setToggleSelectedModal(true);
        setSelectItemName(e.name);
      }
    }
  };

  const handleToggleCommDropdown = (item) => {
    if (toggleSelectedModal) {
      setToggleSelectedModal(!toggleSelectedModal);
      setDetailsReport({
        dosage: "",
        duration: "",
        when: "",
        quantity: 0,
        note: "",
      });
    }
  };

  const handleDosageSelect = (d) => {
    setDetailsReport({ ...detailsReport, dosage: d });
  };

  const handleWhenSelect = (name) => {
    setDetailsReport({ ...detailsReport, when: name });
  };

  const handleQuantitySelect = (no) => {
    setDetailsReport({ ...detailsReport, quantity: no });
  };

  const handleNote = (e) => {
    setDetailsReport({ ...detailsReport, note: e });
  };

  const handleDurationSelect = (type) => {
    setDurationType(type);
    if (durationNo !== "") {
      setDetailsReport({
        ...detailsReport,
        duration: `${durationNo} ${type}`,
      });
    }
  };
  const handleDurationInptSelect = (no) => {
    setDurationNo(no);
  };

  useEffect(() => {
    let str1 = detailsReport.dosage.replace(/[^\d.]/g, "");
    let str2 = Array.from(String(str1), Number);
    const totalDosePerDay = str2.reduce((partialSum, a) => partialSum + a, 0);

    if (durationType == "Days") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo,
      });
    } else if (durationType == "Weeks") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo * 7,
      });
    } else if (durationType == "Months") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo * 30,
      });
    } else if (durationType == "Years") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo * 365,
      });
    }
  }, [durationType, durationNo, detailsReport.dosage]);

  const handleDetailsSubmit = (name) => {
    const index = selectedItems.findIndex((item) => item.name === name);
    const compareObj = {
      dosage:
        detailsReport.dosage === ""
          ? selectedItems[index].value.dosage
          : detailsReport.dosage,
      duration:
        detailsReport.duration === ""
          ? selectedItems[index].value.duration
          : detailsReport.duration,
      when:
        detailsReport.when === ""
          ? selectedItems[index].value.when
          : detailsReport.when,
      quantity:
        detailsReport.quantity === 0
          ? selectedItems[index].value.quantity
          : detailsReport.quantity,
      note:
        detailsReport.note === ""
          ? selectedItems[index].value.note
          : detailsReport.note,
    };
    setSelectedItems([
      ...selectedItems.slice(0, index),
      {
        ...selectedItems[index],
        ["name"]: name,
        ["value"]: compareObj,
      },
      ...selectedItems.slice(index + 1),
    ]);
    handleToggleCommDropdown();
  };

  const back = () => {
    props.route.params.onGoBack(selectedItems), props.navigation.goBack();
  };

  return (
    <>
      <Container style={[globalStyles.container, styles.center]}>
        {/* Header */}
        <View style={styles.headContainerView}>
          <View style={styles.dirRowCenter}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors.mediumGrey}
              />
            </TouchableOpacity>
            <Text style={globalStyles.searchHeading}>
              {selectCount !== 0 ? selectCount : "No"} {props.route.params.name}{" "}
              Selected
            </Text>
            {selectCount !== 0 ? (
              <TouchableOpacity
                onPress={() => setToggleSelectedList(!toggleSelectedList)}
              >
                <Ionicons
                  name={
                    toggleSelectedList
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={30}
                  color={Colors.mediumGrey}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <>
            {selectCount !== 0 ? (
              <>
                <Ionicons
                  name="checkmark-circle"
                  size={30}
                  color={Colors.primary}
                  onPress={back}
                />
              </>
            ) : (
              <>
                <Ionicons
                  name="checkmark-circle"
                  size={30}
                  color={Colors.mediumGrey}
                />
              </>
            )}
          </>
        </View>

        {/* Selected Item List */}
        {toggleSelectedList && selectCount !== 0 ? (
          <View style={styles.selectedListItem}>
            <ScrollView style={{ width: "80%" }}>
              {selectedItems.map((item, index) => {
                return (
                  <View key={index} style={styles.dirRowCenter}>
                    <Text style={{ fontSize: 25, marginRight: 8 }}>•</Text>
                    <Text style={{ fontSize: 15 }}>{item.name}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <></>
        )}

        {/* Search Field */}
        <View style={[globalStyles.searchContainer, { margin: 5 }]}>
          <View style={globalStyles.histopathologySearchBox}>
            <TextInput
              autoCompleteType="off"
              placeholder={`Search ${props.route.params.name}`}
              placeholderTextColor={Colors.mediumGrey}
              style={globalStyles.histopathologySearchField}
              defaultValue={props.route.params?.itemName}
              onChangeText={(e) => setSearchInput(e)}
            />
          </View>
        </View>

        {/* Search Text & Select */}
        <View
          style={[
            styles.inputTextAddField,
            { display: searchInput === "" ? "none" : "flex" },
          ]}
        >
          <Text style={{ fontSize: 17, color: Colors.mediumGrey }}>
            Add & Select:{" "}
            <Text style={{ color: Colors.black }}>{searchInput}</Text>
          </Text>
          <Ionicons
            name="add-outline"
            size={30}
            color={Colors.mediumGrey}
            style={{ marginRight: 12 }}
          />
        </View>

        {/* Search List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "85%" }}
        >
          {Data.map((item, index) => {
            return (
              <View key={index} style={styles.searchItemList}>
                <Text style={[globalStyles.searchItemName]}>{item.name}</Text>
                <TouchableOpacity>
                  <Checkbox
                    key={item.id}
                    activeOpacity={1}
                    iconSize={25}
                    checked={selectedCheckedBox.includes(item.id)}
                    checkedColor={Colors.green}
                    uncheckedColor={Colors.lightGrey}
                    onChange={() => selectAction(item)}
                    labelStyle={[globalStyles.labelName, globalStyles.mb0]}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Modal Dropdown */}
        {toggleSelectedModal === true ? (
          <Modal
            animationType="none"
            transparent={true}
            statusBarTranslucent={true}
            visible={true}
          >
            <View style={[styles.modalOverlay]}>
              <View>
                <View style={styles.modalContainer}>
                  {/* Modal Head */}
                  <View style={styles.modalHeader}>
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Colors.black,
                        }}
                      >
                        {selectItemName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.closeBtn}
                      // onPress={handleToggleCommDropdown}
                    >
                      <Ionicons
                        name="close"
                        size={28}
                        color={Colors.mediumGrey}
                        onPress={handleToggleCommDropdown}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Modal Body */}
                  <View style={styles.modalBody}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View>
                        <Text style={[globalStyles.searchSuggestionTitle]}>
                          Dosage
                        </Text>
                        <View style={styles.commonListStyle}>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-0-0"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-0-0")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              1-0-0
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "0-0-1"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("0-0-1")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              0-0-1
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-0-1"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-0-1")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              1-0-1
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-1-1"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-1-1")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              1-1-1
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-1-0"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-1-0")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              1-1-0
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={globalStyles.modalCommonBtnCover}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Custom
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            globalStyles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          Duration
                        </Text>
                        <View style={[styles.commonListStyle, styles.center]}>
                          <TextInput
                            autoCompleteType="off"
                            style={globalStyles.durationInput}
                            onChangeText={(e) => handleDurationInptSelect(e)}
                          />
                          <TouchableOpacity
                            style={
                              detailsReport.duration === `${durationNo} Days`
                                ? globalStyles.actvModalDurationBtnCover
                                : globalStyles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Days")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Days
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.duration === `${durationNo} Weeks`
                                ? globalStyles.actvModalDurationBtnCover
                                : globalStyles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Weeks")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Weeks
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.duration === `${durationNo} Months`
                                ? globalStyles.actvModalDurationBtnCover
                                : globalStyles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Months")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Months
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.duration == `${durationNo} Years`
                                ? globalStyles.actvModalDurationBtnCover
                                : globalStyles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Years")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Years
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            globalStyles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          When
                        </Text>
                        <View style={styles.commonListStyle}>
                          <TouchableOpacity
                            style={
                              detailsReport.when === "Before food"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleWhenSelect("Before food")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Before Food
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.when === "After Food"
                                ? globalStyles.actvModalCommonBtnCover
                                : globalStyles.modalCommonBtnCover
                            }
                            onPress={() => handleWhenSelect("After Food")}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              After Food
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.commonListStyle,
                            {
                              marginTop: 20,
                            },
                          ]}
                        >
                          <TouchableOpacity
                            style={globalStyles.modalCustomBtnCover}
                          >
                            <Text style={globalStyles.caseTypeBtnTxt}>
                              Custom
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            globalStyles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          Quantity
                        </Text>
                        <View style={styles.inputBox}>
                          <View style={globalStyles.histopathologySearchBox}>
                            <TextInput
                              autoCompleteType="off"
                              style={globalStyles.histopathologySearchField}
                              onChangeText={(no) => handleQuantitySelect(no)}
                              value={detailsReport.quantity.toString()}
                            />
                          </View>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            globalStyles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          Notes (Optional)
                        </Text>
                        <View style={styles.inputBox}>
                          <View style={globalStyles.histopathologySearchBox}>
                            <TextInput
                              autoCompleteType="off"
                              placeholder="Type note"
                              placeholderTextColor={Colors.mediumGrey}
                              style={globalStyles.histopathologySearchField}
                              onChangeText={(e) => handleNote(e)}
                            />
                          </View>
                        </View>
                      </View>
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.addMedBtn}>
                      <TouchableOpacity
                        onPress={() => handleDetailsSubmit(selectItemName)}
                      >
                        <Text style={globalStyles.bottomBtnTxt}>
                          Add Medicine
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
      </Container>
    </>
  );
};
export default CommonSearch;

const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  headContainerView: {
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: { justifyContent: "center", alignItems: "center" },
  dirRowCenter: { flexDirection: "row", alignItems: "center" },
  selectedListItem: {
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    width: "100%",
    maxHeight: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    backgroundColor: "#fff",
    zIndex: 99,
  },
  inputTextAddField: {
    width: "85%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  searchItemList: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commonListStyle: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  addMedBtn: {
    width: "95%",
    height: 40,
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginBottom: 50,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: "100%",
    height: 40,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labelName: {
    color: Colors.textColor,
    fontSize: 14,
  },
  textfield: {
    height: 40,
    fontSize: 12,
    color: Colors.textColor,
    padding: 5,
  },
  modalOverlay: {
    height: windowHeight,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: Math.floor(windowHeight * 0.65),
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
    flex: 1,
    width: "90%",
  },
});
