import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { now } from "lodash";
import Colors from "../../configs/Colors";
import styles from "../../configs/Styles";

const HistopathologyList = () => {
  const navigation = useNavigation();
  const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());

  const showDatePicker = (mode) => {
    setMode(mode);
    setDatePickerVisibility(true);
  };

  const handleConfirm = (selectDate) => {
    setDate(selectDate);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.rowContainer}>
            <View style={[styles.row, { height: "auto" }]}>
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Case # </Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Primary VAT : </Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </View>
            <View style={[styles.fieldBox]}>
              <View style={styles.rowLeftDateFeild}>
                <Text style={styles.labelName}>Open Date : </Text>
              </View>
              <View style={styles.rowRightDateFeild}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.centerItmW50}
                  onPress={() => {
                    showDatePicker("date");
                  }}
                >
                  <Text style={styles.dateField}>
                    {date.toDateString()}
                  </Text>
                  <AntDesign name="calendar" color={Colors.primary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.row]}
              onPress={() => navigation.navigate("CaseType")}
            >
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Case Type</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row]}
              onPress={() => navigation.navigate("Complaints")}
            >
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Complaint</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row]}
              onPress={() => navigation.navigate("Diagnosis")}
            >
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Initial Diagnosis</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.row]}>
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Affected Parts</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.row]}
              onPress={() => navigation.navigate("Rx")}
            >
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Rx</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row]}
              onPress={() => navigation.navigate("Advice")}
            >
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Advice</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.row]}>
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Lab Reports</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </View>
            <View style={[styles.fieldBox]}>
              <View style={styles.rowLeftDateFeild}>
                <Text style={styles.labelName}>Follow Up Date : </Text>
              </View>
              <View style={styles.rowRightDateFeild}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.centerItmW50}
                  onPress={() => {
                    showDatePicker("date");
                  }}
                >
                  <Text style={styles.dateField}>
                    {date.toDateString()}
                  </Text>
                  <AntDesign name="calendar" color={Colors.primary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.row]}>
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Notes : +</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </View>
            <View style={[styles.fieldBox]}>
              <View style={styles.rowLeftDateFeild}>
                <Text style={styles.labelName}>Close Date :</Text>
              </View>
              <View style={styles.rowRightDateFeild}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.centerItmW50}
                  onPress={() => {
                    showDatePicker("date");
                  }}
                >
                  <Text style={styles.dateField}>
                    {date.toDateString()}
                  </Text>
                  <AntDesign name="calendar" color={Colors.primary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.row, styles.bbw0]}>
              <View style={styles.rowLeft}>
                <Text style={[styles.labelName]}>Close By :</Text>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.textfield}></Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={[styles.modalBtnCover]}>
          <Text style={styles.bottomBtnTxt}>Save & Preview</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        mode={mode}
        display={
          Platform.OS == "ios" && mode == "date"
            ? "inline"
            : Platform.OS == "ios" && mode == "time"
            ? "spinner"
            : "default"
        }
        isVisible={isDateTimePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default HistopathologyList;

// const styles = StyleSheet.create({
//   centerItmW50: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "50%",
//   },
// });
