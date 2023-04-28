import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Container } from "native-base";
import globalStyles from "../../config/Styles";
import { Header } from "../../component";
import Colors from "../../config/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Data from "./Rx.json";

const Rx = (props) => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const [selectedCommonNames, setSelectedCommonNames] = useState([]);
  const [selectItemName, setSelectItemName] = useState("");
  const [toggleSelectedModal, setToggleSelectedModal] = useState(false);
  const [durationType, setDurationType] = useState("");
  const [durationNo, setDurationNo] = useState("");
  const [toggleSaveBtn, setToggleBtn] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [detailsReport, setDetailsReport] = useState({
    dosage: "",
    duration: "",
    when: "",
    quantity: 0,
    note: "",
  });

  useEffect(() => {}, [toggle, selectedCommonNames]);
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

  const handleToggleCommDropdown = (item) => {
    setToggleSelectedModal(!toggleSelectedModal);
    if (toggleSelectedModal) {
      setDetailsReport({
        dosage: "",
        duration: "",
        when: "",
        quantity: 0,
        note: "",
      });
    } else {
      setSelectItemName(item);
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

  const handleClearAll = () => {
    setSelectedCommonNames([]);
  };

  const handleDeleteName = (name) => {
    setSelectedCommonNames(selectedCommonNames.filter((item) => item !== name));
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
  const handleClickSaveTemp = () => {
    setToggleBtn(true);
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
    const index = selectedCommonNames.findIndex((item) => item.name === name);
    const compareObj = {
      dosage:
        detailsReport.dosage === ""
          ? selectedCommonNames[index].value.dosage
          : detailsReport.dosage,
      duration:
        detailsReport.duration === ""
          ? selectedCommonNames[index].value.duration
          : detailsReport.duration,
      when:
        detailsReport.when === ""
          ? selectedCommonNames[index].value.when
          : detailsReport.when,
      quantity:
        detailsReport.quantity === 0
          ? selectedCommonNames[index].value.quantity
          : detailsReport.quantity,
      note:
        detailsReport.note === ""
          ? selectedCommonNames[index].value.note
          : detailsReport.note,
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

  return (
    <Container style={[globalStyles.container, styles.center]}>
      <Header
        leftIconName={"arrow-back"}
        title={"Rx"}
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
      <View style={[globalStyles.searchContainer, { margin: 10 }]}>
        <View style={globalStyles.histopathologySearchBox}>
          <TextInput
            autoCompleteType="off"
            placeholder="Search Rx"
            placeholderTextColor={Colors.mediumGrey}
            style={globalStyles.histopathologySearchField}
            onFocus={() =>
              navigation.navigate("CommonSearch", {
                name: "Rx",
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
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={() => handleToggleCommDropdown(item.name)}
            >
              <View>
                <Text style={[globalStyles.selectedName]}>{item.name}</Text>
                <View style={[styles.caseReportDetails]}>
                  <View
                    style={[
                      styles.caseReportItem,
                      { display: item.value.duration ? "flex" : "none" },
                    ]}
                  >
                    <Ionicons
                      name="alarm-outline"
                      size={16}
                      color={Colors.green}
                    />
                    <Text style={[globalStyles.detailsReportTitle]}>
                      {item.value?.duration}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.caseReportItem,
                      { display: item.value.when ? "flex" : "none" },
                    ]}
                  >
                    <Ionicons
                      name="restaurant-outline"
                      size={16}
                      color={Colors.chocolate}
                    />
                    <Text style={[globalStyles.detailsReportTitle]}>
                      {item.value?.when}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.caseReportItem,
                      { display: item.value.quantity ? "flex" : "none" },
                    ]}
                  >
                    <Ionicons
                      name="bandage-outline"
                      size={16}
                      color={Colors.blueBg}
                    />
                    <Text style={[globalStyles.detailsReportTitle]}>
                      {item.value?.quantity}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.caseReportItem,
                    { display: item.value.note ? "flex" : "none" },
                  ]}
                >
                  <Text style={[globalStyles.detailsReportTitle]}>
                    Note: {item.value?.note}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[globalStyles.selectedName]}>
                  {item.value.dosage}
                </Text>
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
        <View
          style={[
            globalStyles.rowContainer,
            {
              marginHorizontal: 20,
            },
          ]}
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

            <Text
              style={[globalStyles.searchSuggestionTitle, { marginTop: 10 }]}
            >
              Most Common
            </Text>
            <View style={styles.rxCommonBtnCvr}>
              {/* Common Button List */}
              {Data.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      style={globalStyles.searchSuggestionbtnCover}
                      onPress={() =>
                        navigation.navigate("CommonSearch", {
                          name: "Rx",
                          itemName: item.name,
                          onGoBack: (e) => searchSelectData(e),
                        })
                      }
                    >
                      <Text style={globalStyles.caseTypeBtnTxt}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
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
          onPress={() => navigation.navigate("Advice")}
        >
          <Text style={globalStyles.bottomBtnTxt}>
            Advice
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={Colors.white}
            />
          </Text>
        </TouchableOpacity>
      </View>

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
                          <Text style={globalStyles.caseTypeBtnTxt}>1-0-0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.dosage === "0-0-1"
                              ? globalStyles.actvModalCommonBtnCover
                              : globalStyles.modalCommonBtnCover
                          }
                          onPress={() => handleDosageSelect("0-0-1")}
                        >
                          <Text style={globalStyles.caseTypeBtnTxt}>0-0-1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.dosage === "1-0-1"
                              ? globalStyles.actvModalCommonBtnCover
                              : globalStyles.modalCommonBtnCover
                          }
                          onPress={() => handleDosageSelect("1-0-1")}
                        >
                          <Text style={globalStyles.caseTypeBtnTxt}>1-0-1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.dosage === "1-1-1"
                              ? globalStyles.actvModalCommonBtnCover
                              : globalStyles.modalCommonBtnCover
                          }
                          onPress={() => handleDosageSelect("1-1-1")}
                        >
                          <Text style={globalStyles.caseTypeBtnTxt}>1-1-1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.dosage === "1-1-0"
                              ? globalStyles.actvModalCommonBtnCover
                              : globalStyles.modalCommonBtnCover
                          }
                          onPress={() => handleDosageSelect("1-1-0")}
                        >
                          <Text style={globalStyles.caseTypeBtnTxt}>1-1-0</Text>
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
                          <Text style={globalStyles.caseTypeBtnTxt}>Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.duration === `${durationNo} Weeks`
                              ? globalStyles.actvModalDurationBtnCover
                              : globalStyles.modalDurationBtnCover
                          }
                          onPress={() => handleDurationSelect("Weeks")}
                        >
                          <Text style={globalStyles.caseTypeBtnTxt}>Weeks</Text>
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
                          <Text style={globalStyles.caseTypeBtnTxt}>Years</Text>
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
  );
};

export default Rx;

const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
  scrollContainer: {
    width: "110%",
    backgroundColor: "#f7f9f9",
    marginTop: 25,
    paddingTop: 10,
    paddingBottom: 20,
  },
  rxCommonBtnCvr: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
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
    width: "85%",
    marginTop: 3,
  },
  caseReportItem: {
    flexDirection: "row",
    alignItems: "center",
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
});
