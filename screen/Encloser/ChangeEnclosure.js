import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { List } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import InputBox from "../../components/InputBox";
import CustomForm from "../../components/CustomForm";
import {
  getEnclosurebySection,
  getSection,
} from "../../services/staffManagement/getEducationType";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Category from "../../components/DropDownBox";
import { getEnclosureService } from "../../services/SettingEnclosure";
import Modal from "react-native-modal";
import { useWindowDimensions } from "react-native";
import { getParentEnclosure } from "../../services/EggsService";
import { getStaffList } from "../../services/staffManagement/addPersonalDetails";
import { ChangeEnclosureRequest } from "../../services/FormEnclosureServices";
import { useNavigation } from "@react-navigation/native";

const ChangeEnclosure = (props) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  const [isFromSectionMenuOpen, setIsFromSectionMenuOpen] = useState(false);
  const [sectionFormData, setSectionFormData] = useState([]);
  const [fromSection, setfromSection] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [fromsectionId, setfromSectionId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [isFromEnclosureMenuOpen, setIsFromEnclosureMenuOpen] = useState(false);
  const [EnclosureFormData, seEnclosureFormData] = useState([]);
  const [fromEnclosure, setfromEnclosure] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [fromEnclosureId, setfromEnclosureId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [isentityMenuOpen, setIsentityMenuOpen] = useState(false);
  const [entity, setentity] = useState(props.route.params?.item?.data ?? "");
  const [entityData, setentityData] = useState([]);
  const [entityId, setentityId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [isToSectionMenuOpen, setIsToSectionMenuOpen] = useState(false);
  const [toSection, settoSection] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [sectionToData, setSectionToData] = useState([]);
  const [tosectionId, settoSectionId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [istoEnclosureMenuOpen, setIstoEnclosureMenuOpen] = useState(false);
  const [toEnclosure, settoEnclosure] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [EnclosureToData, seEnclosureToData] = useState([]);
  const [toEnclosureId, settoEnclosureId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [approveFrom, setapproveFrom] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [userData, setuserData] = useState([]);
  const [approveFromId, setapproveFromId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [errorMessage, setErrorMessage] = useState({});
  const [isError, setIsError] = useState({});

  const [loading, setLoding] = useState(false);

  const [reason, setreason] = useState("");

  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const user = useSelector((state) => state.UserAuth.userDetails);

  useEffect(() => {
    let postData = {
      zoo_id: zooID,
    };
    setLoding(true);
    Promise.all([getSection(postData), getStaffList(postData)]).then((res) => {
      let fromSection = res[0].map((item) => {
        return {
          id: item.section_id,
          name: item.section_name,
        };
      });
      let users = res[1].data.map((item) => {
        return {
          id: item.user_id,
          name: item.user_first_name + " " + item.user_last_name,
        };
      });
      setSectionFormData(fromSection);
      setSectionToData(fromSection);
      setuserData(users);
      setLoding(false);
      
      {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
      handleSubmitFocus(fromSectionRef);*/}
      // setIsFromSectionMenuOpen(true);
    });
  }, []);

  const fromSectionRef = useRef(null);
  const fromEnclosureRef = useRef(null);
  const fromAnimalRef = useRef(null);
  const toSectionRef = useRef(null);
  const toEnclosureRef = useRef(null);
  const approveFromRef = useRef(null);
  const reasonRef = useRef(null);

  const handleSubmitFocus = (refs, time) => {
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (time) {
      setTimeout(() => {
        if (refs.current) {
          refs.current.focus();
        }
      }, time);
    } else {
      if (refs.current) {
        refs.current.focus();
      }
    }*/}
  };

  const SetFromSectionDropDown = (data) => {
    setIsFromSectionMenuOpen(!isFromSectionMenuOpen);
  };

  const catSectionFormPressed = (item) => {
    setLoding(true);
    setfromSection(item.map((u) => u.name).join(", "));
    setfromSectionId(item.map((id) => id.id).join(","));
    getEnclosurebySection(item.map((id) => id.id).join(",")).then((res) => {
      console.log({ res });
      let fromEnclosure = res.data.map((item) => {
        return {
          id: item.enclosure_id,
          name: item.user_enclosure_name,
        };
      });
      seEnclosureFormData(fromEnclosure);
      setLoding(false);
      setIsFromSectionMenuOpen(false);
      {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
      handleSubmitFocus(fromEnclosureRef);*/}
    });
  };

  const catSectionFormClose = () => {
    setIsFromSectionMenuOpen(false);
  };

  const SetFromEnclosureDropDown = (data) => {
    setIsFromEnclosureMenuOpen(!isFromEnclosureMenuOpen);
  };

  const catEnclosureFromPressed = (item) => {
    setLoding(true);
    setfromEnclosure(item.map((u) => u.name).join(", "));
    setfromEnclosureId(item.map((id) => id.id).join(","));

    getParentEnclosure({
      enclosure_id: item.map((id) => id.id).join(","),
    }).then((res) => {
      let fromEnclosure = res.data.map((item) => {
        return {
          id: item.animal_id,
          name: item?.complete_name ?? "N/A",
        };
      });
      setentityData(fromEnclosure);
      setLoding(false);
      setIsFromEnclosureMenuOpen(false);
      {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
      handleSubmitFocus(fromAnimalRef);*/}
    });
  };

  const catEnclosureFromClose = () => {
    setIsFromEnclosureMenuOpen(false);
  };

  const SetEntityDropDown = (data) => {
    setIsentityMenuOpen(!isentityMenuOpen);
  };

  const catEntityPressed = (item) => {
    setentity(item.map((u) => u.name).join(", "));
    setentityId(item.map((id) => id.id).join(","));
    setIsentityMenuOpen(false);
    
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(toSectionRef);*/}

  };

  const catEntityClose = () => {
    setIsentityMenuOpen(false);
  };

  const SetToSectionDropDown = (data) => {
    setIsToSectionMenuOpen(!isToSectionMenuOpen);
  };

  const catSectionToPressed = (item) => {
    setLoding(true);
    settoSection(item.map((u) => u.name).join(", "));
    settoSectionId(item.map((id) => id.id).join(","));
    getEnclosurebySection(item.map((id) => id.id).join(",")).then((res) => {
      console.log({ res });
      let fromEnclosure = res.data.map((item) => {
        return {
          id: item.enclosure_id,
          name: item.user_enclosure_name,
        };
      });
      seEnclosureToData(fromEnclosure);
      setLoding(false);
      setIsToSectionMenuOpen(false);

      {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
      handleSubmitFocus(toEnclosureRef);*/}
    });
  };

  const catSectionToClose = () => {
    setIsToSectionMenuOpen(false);
  };

  const SetToEnclosureDropDown = (data) => {
    setIstoEnclosureMenuOpen(!istoEnclosureMenuOpen);
  };

  const catEnclosureToPressed = (item) => {
    settoEnclosure(item.map((u) => u.name).join(", "));
    settoEnclosureId(item.map((id) => id.id).join(","));
    setIstoEnclosureMenuOpen(false);

    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(approveFromRef);*/}
  };

  const catEnclosureToClose = () => {
    setIstoEnclosureMenuOpen(false);
  };

  const SetApproveFromDropDown = (data) => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const catApproveFromPressed = (item) => {
    setapproveFrom(item.map((u) => u.name).join(", "));
    setapproveFromId(item.map((id) => id.id).join(","));
    setIsUserMenuOpen(false);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(reasonRef, 1000);*/}
  };

  const catApproveFromClose = () => {
    setIsUserMenuOpen(false);
  };

  const closeAllDropdown = () => {
    setIsUserMenuOpen(false);
    setIstoEnclosureMenuOpen(false);
    setIsToSectionMenuOpen(false);
    setIsentityMenuOpen(false);
    setIsFromEnclosureMenuOpen(false);
    setIsFromSectionMenuOpen(false);
  };

  const validation = () => {
    if (fromSection.length === 0) {
      setIsError({ fromSection: true });
      setErrorMessage({ fromSection: "This field is required*" });
      return false;
    } else if (fromEnclosure.length === 0) {
      setIsError({ fromEnclosure: true });
      setErrorMessage({ fromEnclosure: "This field is required*" });
      return false;
    } else if (entity.length === 0) {
      setIsError({ entity: true });
      setErrorMessage({ entity: "This field is required*" });
      return false;
    } else if (toSection.length === 0) {
      setIsError({ toSection: true });
      setErrorMessage({ toSection: "This field is required*" });
      return false;
    } else if (toEnclosure.length === 0) {
      setIsError({ toEnclosure: true });
      setErrorMessage({ toEnclosure: "This field is required*" });
      return false;
    } else if (approveFrom.length === 0) {
      setIsError({ approveFrom: true });
      setErrorMessage({ approveFrom: "This field is required*" });
      return false;
    } else if (reason.length === 0) {
      setIsError({ reason: true });
      setErrorMessage({ reason: "This field is required*" });
      return false;
    }
    return true;
  };

  const submitChangeEnclosureData = () => {
    if (validation()) {
      setLoding(true);
      let obj = {
        from_enclosure_id: fromEnclosureId,
        entity_type: "animal",
        entity_ids: entityId,
        to_enclosure_id: toEnclosureId,
        status: "Requested",
        reason: reason,
        approval_from: approveFromId,
        requested_by: user.user_id,
      };
      ChangeEnclosureRequest(obj)
        .then((res) => {
          console.log({ res });
          setLoding(false);
          alert("Succefully Done!!");
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
          setLoding(false);
          alert("Something went wrong!!");
        });
    }
  };

  return (
    <>
      <CustomForm
        header={true}
        title={"Change Enclosure"}
        marginBottom={50}
        onPress={submitChangeEnclosureData}
      >
        <Loader visible={loading} />
        <List.Section>
          <List.Accordion
            title="From"
            id="1"
            expanded={true}
            titleStyle={{ color: "black" }}
          >
            <View style={{}}>
              <View>
                <InputBox
                  refs={fromSectionRef}
                  inputLabel={"Choose Section*"}
                  placeholder={"Choose Section Name"}
                  editable={false}
                  value={fromSection}
                  defaultValue={fromSection != null ? fromSection : null}
                  // onFocus={SetFromSectionDropDown}
                  DropDown={SetFromSectionDropDown}
                  rightElement={
                    isFromSectionMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  errors={errorMessage.fromSection}
                  isError={isError.fromSection}
                />
                <InputBox
                  refs={fromEnclosureRef}
                  inputLabel={"Choose Enclosure*"}
                  placeholder={"Choose enclosure"}
                  editable={false}
                  value={fromEnclosure}
                  defaultValue={fromEnclosure != null ? fromEnclosure : null}
                  rightElement={
                    isFromEnclosureMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  DropDown={SetFromEnclosureDropDown}
                  errors={errorMessage.fromEnclosure}
                  isError={isError.fromEnclosure}
                />
                <InputBox
                  refs={fromAnimalRef}
                  inputLabel={"Entity"}
                  placeholder={"Choose Entity"}
                  editable={false}
                  value={entity}
                  defaultValue={entity != null ? entity : null}
                  rightElement={
                    isentityMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  DropDown={SetEntityDropDown}
                  errors={errorMessage.entity}
                  isError={isError.entity}
                />
              </View>
            </View>
          </List.Accordion>
          <List.Accordion
            title="To"
            id="1"
            expanded={true}
            titleStyle={{ color: "black" }}
            // right={(props) => <List.Icon {...props} icon="plus" />}
          >
            <View style={{}}>
              <View>
                <InputBox
                  refs={toSectionRef}
                  inputLabel={"Choose Section*"}
                  placeholder={"Choose Section Name"}
                  editable={false}
                  value={toSection}
                  defaultValue={toSection != null ? toSection : null}
                  DropDown={SetToSectionDropDown}
                  rightElement={
                    isToSectionMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  errors={errorMessage.toSection}
                  isError={isError.toSection}
                />
                <InputBox
                  refs={toEnclosureRef}
                  inputLabel={"Choose Enclosure*"}
                  placeholder={"Choose enclosure"}
                  editable={false}
                  value={toEnclosure}
                  defaultValue={toEnclosure != null ? toEnclosure : null}
                  rightElement={
                    istoEnclosureMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  DropDown={SetToEnclosureDropDown}
                  errors={errorMessage.toEnclosure}
                  isError={isError.toEnclosure}
                />

                <InputBox
                  refs={approveFromRef}
                  inputLabel={"Approval From"}
                  placeholder={"Choose Approval From"}
                  editable={false}
                  value={approveFrom}
                  defaultValue={approveFrom != null ? approveFrom : null}
                  rightElement={isUserMenuOpen ? "chevron-up" : "chevron-down"}
                  DropDown={SetApproveFromDropDown}
                  errors={errorMessage.approveFrom}
                  isError={isError.approveFrom}
                />
                <InputBox
                  refs={reasonRef}
                  onFocus={closeAllDropdown}
                  multiline={true}
                  numberOfLines={3}
                  onChange={(val) => setreason(val)}
                  inputLabel={"Reason"}
                  placeholder={"Enter a reason"}
                  value={reason}
                  defaultValue={reason != null ? reason : null}
                  errors={errorMessage.reason}
                  isError={isError.reason}
                  //keyboardType={"alpha"}
                />
                <InputBox
                  edit={false}
                  inputLabel={"Requested By"}
                  value={user.user_first_name + " " + user.user_last_name}
                />
              </View>
            </View>
          </List.Accordion>
        </List.Section>
      </CustomForm>

      {isFromSectionMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isFromSectionMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catSectionFormClose}
          >
            <Category
              categoryData={sectionFormData}
              onCatPress={catSectionFormPressed}
              heading={"Choose Section"}
              isMulti={false}
              onClose={catSectionFormClose}
            />
          </Modal>
        </View>
      ) : null}

      {isFromEnclosureMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isFromEnclosureMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catEnclosureFromClose}
          >
            <Category
              categoryData={EnclosureFormData}
              onCatPress={catEnclosureFromPressed}
              heading={"Choose Enclosure"}
              isMulti={false}
              onClose={catEnclosureFromClose}
            />
          </Modal>
        </View>
      ) : null}

      {isentityMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isentityMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catEntityClose}
          >
            <Category
              categoryData={entityData}
              onCatPress={catEntityPressed}
              heading={"Choose Entity"}
              isMulti={false}
              onClose={catEntityClose}
            />
          </Modal>
        </View>
      ) : null}

      {isToSectionMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isToSectionMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catSectionToClose}
          >
            <Category
              categoryData={sectionToData}
              onCatPress={catSectionToPressed}
              heading={"Choose Section"}
              isMulti={false}
              onClose={catSectionToClose}
            />
          </Modal>
        </View>
      ) : null}

      {istoEnclosureMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={istoEnclosureMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catEnclosureToClose}
          >
            <Category
              categoryData={EnclosureToData}
              onCatPress={catEnclosureToPressed}
              heading={"Choose Enclosure"}
              isMulti={false}
              onClose={catEnclosureToClose}
            />
          </Modal>
        </View>
      ) : null}

      {isUserMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isUserMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catApproveFromClose}
          >
            <Category
              categoryData={userData}
              onCatPress={catApproveFromPressed}
              heading={"Choose Approval From"}
              isMulti={false}
              onClose={catApproveFromClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default ChangeEnclosure;
