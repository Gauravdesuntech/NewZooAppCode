// whole component Created  by Ganesh 
// Date:- 31 March 2023
// works:- 
// 1. Add Header
// 2.Add Input Fileds 
// 3.Add Date Picker And Apply Functionality on it 
// 4.Add Text Area Fields
// 5. Add Drop Down
// 6.Add FlatList
// 7. Add Loader
// 8. Add Bottom Sheet 
// 9.Add Naviagation


import React, { useContext, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import { StyleSheet, Text, View, FlatList, useWindowDimensions, } from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import { AddEnclosure, editEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import { data } from "../../configs/Config";
import { BottomSheet } from "../../configs/Config";
import { addanimalmortality, carcassCondition, carcassDisposition, getAnimal, mannerOfDeath } from "../../services/AddDispositionService";
import moment from "moment";
import { useSelector } from "react-redux";
import { getAnimalList } from "../../services/AnimalService";
import { capitalize } from "../../utils/Utils";
import { Checkbox } from "react-native-paper";
import Modal from "react-native-modal";




const EntityItem = [

    {
        id: 1,
        name: "Preselected"

    },
    {
        id: 2,
        name: "Auto completed"
    }
]

const Necropsy = [
    {
        id: 1,
        name: "Yes",

    },
    {
        id: 0,
        name: "No",
    },
]


const AddDisposition = (props) => {

    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();

    const zooID = useSelector((state) => state.UserAuth.zoo_id);
    const [encEnvData, setencEnvData] = useState([])
    const [encTypeData, setencTypeData] = useState([])

    const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
    const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);

    const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
    const [isEncTypeMenuOpen1, setisEncTypeMenuOpen1] = useState(false);
    const [isEncTypeMenuOpen2, setisEncTypeMenuOpen2] = useState(false);

    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    // Entity
    const [entity, setEntity] = useState(capitalize(props.route.params?.item?.vernacular_name) + " (" + props.route.params?.item?.complete_name + ")" ?? "");
    const [entityData, setEntityData] = useState([]);
    const [entityId, setEntityId] = useState(props.route.params?.item?.animal_id ?? undefined);
    // console.log(props.route.params?.item?.animal_id);

    // date
    const [date, setDate] = useState(props.route.params?.item?.user_dob ?? new Date());
    // const [currentDate, setCurrentDate] = useState(new Date());

    // manner of death
    const [mannerDeath, setMannerDeath] = useState(props.route.params?.item.manner_death ?? "");
    const [mannerDeathId, setMannerDeathId] = useState(props.route.params?.item?.manner_of_death ?? "");
    const [mannerData, setMannerData] = useState([]);

    // reasons of death
    const [reason, setReason] = useState(props.route.params?.item?.reason_for_death ?? "");
    // const [reasonId, setReasonId] = useState(props.route.params?.item?.reason_for_death ?? "");

    // carcass condition
    const [condition, setCondition] = useState(props.route.params?.item?.condition_type ?? "");
    const [conditionId, setConditionId] = useState(props.route.params?.item?.carcass_condition ?? "");
    const [conditionData, setConditionData] = useState([]);
    // carcass disposition
    const [disposition, setDisposition] = useState(props.route.params?.item.disposition_type ?? "");
    const [dispositionId, setDispositionId] = useState(props.route.params?.item?.carcass_disposition ?? "");
    const [dispositionData, setDispositionData] = useState([]);

    //    notes
    const [note, setNotes] = useState(props.route.params?.item?.user_for_notes ?? "");

    // necropsy
    const [necropsy, setNecropsy] = useState(props.route.params?.item.necropsy_type ?? "");
    const [necropsyId, setNecropsyId] = useState(props.route.params?.item.necropsy_type ?? "");
    const [markLayDate, setMarkLayDate] = useState(false);

    const [loading, setLoding] = useState(false);


    // Get Animal
    const [animalData, setAnimalData] = useState([]);

    // drop down state ===============================================================

    const [enclosureTypeDown, setEnclosureTypeDown] = useState(false)


    const entityRefs = useRef(null);
    const dispositionDateRef = useRef(null);
    const mannerofDeathRef = useRef(null);
    const reasonRef = useRef(null);
    const carcassConditionRef = useRef(null);
    const carcassDispositionRef = useRef(null);
    const notesRef = useRef(null);
    const necropsyRef = useRef(null);

    const handleSubmitFocus = (refs, time) => {
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
        }
      };

    const catPressed = (item) => {
        // item.map((value) => { setEntity(value.name) })

        setEntity(item.map((u) => u.name).join(", "));

        setEntityId(item.map((id) => id.id).join(','));

        setIsSectionMenuOpen(false);
        handleSubmitFocus(dispositionDateRef)
    };

    // map manner of death
    const catEnvPress = (item) => {

        setMannerDeath(item.map((u) => u.name).join(","));
        setMannerDeathId(item.map((id) => id.id).join(','));

        setisEncEnvMenuOpen(false);
        handleSubmitFocus(reasonRef,1000);
    }
    //  carcass condition
    const catEnTypePress = (item) => {
        // item.map((value) => { setCondition(value.name) })

        setCondition(item.map((u) => u.name).join(","));
        setConditionId(item.map((id) => id.id).join(','));


        setisEncTypeMenuOpen(false);
        setisEncTypeMenuOpen1(true);
        handleSubmitFocus(carcassDispositionRef)
    }
    //  carcass disposition
    const catEnTypePress1 = (item) => {

        setDisposition(item.map((u) => u.name).join(","));
        setDispositionId(item.map((id) => id.id).join(','));
        setisEncTypeMenuOpen1(false)
        handleSubmitFocus(notesRef,1000);
    }

    // Necropsy
    const catEnTypePress2 = (item) => {
        item.map((value) => { setNecropsy(value.name) })
        item.map((value) => { setNecropsyId(value.id) })
        // setEnclosureType1(item.map((u) => u.name).join(","))
        setisEncTypeMenuOpen2(false)
    }


    useEffect(() => {
        setLoding(true)
        let obj = {
            zoo_id: zooID,
        }
        Promise.all([
            getAnimalList(obj),
            mannerOfDeath(),
            carcassCondition(),
            carcassDisposition()
        ])
            .then((res) => {
                console.log(res[0]);
                setAnimalData(res[0].data.map(item => ({ id: item.animal_id, name: capitalize(item.vernacular_name) + " (" + item.complete_name + ")" })));
                setMannerData(res[1].data);
                setConditionData(res[2].data);
                setDispositionData(res[3].data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoding(false);
                if (entityId === undefined) {
                    handleSubmitFocus(entityRefs);
                } else {
                    handleSubmitFocus(dispositionDateRef);
                }
            })
    }, [])

    const validation = () => {

        if (entity.length === 0) {
            setIsError({ entity: true })
            setErrorMessage({ entity: "Select The Entity Name" })
            return false;
        }
        else if (date === "") {
            setIsError({ date: true });
            setErrorMessage({ date: "Select from dropdown" });
            return false;
        }
        else if (mannerDeath.trim().length === 0) {
            setIsError({ mannerDeath: true })
            setErrorMessage({ mannerDeath: "Select The Manner of Death" })
            return false;
        }

        else if (reason.trim().length === 0) {
            setIsError({ reason: true });

            setErrorMessage({ reason: "Enter The Reason of Death" });
            return false;
        }
        else if (condition.trim().length === 0) {
            setIsError({ condition: true })
            setErrorMessage({ condition: "Select The Carcoss Condition" })
            return false;

        }
        else if (disposition.trim().length === 0) {
            setIsError({ disposition: true })
            setErrorMessage({ disposition: "Select The Carcoss Disposition" })
            return false;

        }

        else if (note.trim().length === 0) {
            setIsError({ note: true });
            setErrorMessage({ note: "Enter The Notes" });
            return false;
        }
        // necropsy

        else if (necropsy.trim().length === 0) {
            setIsError({ necropsy: true })
            setErrorMessage({ necropsy: "Select The Necropsy" })
            return false;

        }
        return true;
    };


    const getEnclosureFormData = () => {
        if (validation()) {
            let obj = {
                entity_id: entityId,
                entity_type: "animal",
                discovered_date: moment(date).format('YYYY-MM-DD'),
                is_estimate: Number(markLayDate),
                manner_of_death: mannerDeathId,
                reason_for_death: reason,
                carcass_condition: conditionId,
                carcass_disposition: dispositionId,
                user_for_notes: note,
                submitted_for_necropsy: necropsyId
            }
            setLoding(true)
            addanimalmortality(obj).then((res) => {
                alert(res.message)
                navigation.goBack();
            }).catch((err) => {
                console.log(err);
                alert("Something went wrong!!!")
            }).finally(() => {
                setLoding(false);
            })
        }

    }

    const SetDropDown = (data) => {
        // console.log("DRop*************************", data)
        setIsSectionMenuOpen(data)
        setisEncEnvMenuOpen(false)
        setisEncTypeMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen2(false)
    }
    const SetEnvTypeDropDown = (data) => {
        setisEncEnvMenuOpen(data)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen2(false)
    }

    // comment2
    const SetEncTypeDropDown = (data) => {
        setisEncTypeMenuOpen(data)

        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen2(false)
    }
    const SetEncTypeDropDown1 = (data) => {
        setisEncTypeMenuOpen1(data)

        setisEncTypeMenuOpen2(false)
        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen(false)
    }
    const SetEncTypeDropDown2 = (data) => {
        setisEncTypeMenuOpen2(data)
        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen(false)
    }

    const setSelectedDate = (item) => {

        let today = new Date();
        if (today < item) {
            alert("Select only today or previous date");
            return;
        }
        setDate(item);
        handleSubmitFocus(mannerofDeathRef)
        setisEncEnvMenuOpen(true);
    }

    const onPressMarkLayDate = () => {
        setMarkLayDate(!markLayDate);
    };

    const closeAllDropDown = () => {
        setisEncTypeMenuOpen2(false)
        setisEncEnvMenuOpen(false)
        setIsSectionMenuOpen(false)
        setisEncTypeMenuOpen1(false)
        setisEncTypeMenuOpen(false)
    }

    const closeEntity = () => {
        setIsSectionMenuOpen(false)
    }

    const closeManner = () => {
        setisEncEnvMenuOpen(false)
    }

    const closeCarcassCondition = () => {
        setisEncTypeMenuOpen(false)
    }

    const closeCarcassDisposition = () => {
        setisEncTypeMenuOpen1(false)
    }

    const closeNecropsy = () => {
        setisEncTypeMenuOpen2(false)
    }

    const diableDown = () => {
        setIsSectionMenuOpen(false)
    }

    // console.log('drop down=======>',);

    return (
        <>
            <CustomForm header={true} title={"Add Disposition"} marginBottom={60} onPress={getEnclosureFormData}>
                <Loader visible={loading} />
                <InputBox
                    inputLabel={"Entity Name"}
                    placeholder={"Choose Entity Name"}
                    // edit={false}
                    value={entity}
                    refs={entityRefs}
                    // defaultValue={section != null ? section : null}
                    // onFocus={SetDropDown}
                    DropDown={entityId === undefined ? SetDropDown : diableDown}
                    rightElement={isSectionMenuOpen ? "chevron-up" : "chevron-down"}
                    errors={errorMessage.entity}
                    isError={isError.entity}
                />

                <View>
                    <DatePicker
                        today={date}
                        onChange={setSelectedDate}
                        title='Discovered Date'
                        onOpen={closeAllDropDown}
                        refs={dispositionDateRef}
                    />
                    <View style={styles.checkboxWrap}>
                        <Checkbox
                            status={markLayDate ? "checked" : "unchecked"}
                            onPress={onPressMarkLayDate}
                        />
                        <Text style={styles.label}>
                            Discovered Date is approximate ?
                        </Text>
                    </View>
                    {isError.date ? (
                        <Text style={styles.errortext}>
                            {errorMessage.date}
                        </Text>
                    ) : null}
                </View>


                <InputBox
                    inputLabel={"Manner of Death"}
                    placeholder={"Manner of Death"}
                    editable={false}
                    value={mannerDeath}
                    refs={mannerofDeathRef}
                    // defaultValue={enclosureEnvironment != null ? enclosureEnvironment : null}

                    rightElement={isEncEnvMenuOpen ? "chevron-up" : "chevron-down"}
                    onFocus={SetDropDown}
                    DropDown={SetEnvTypeDropDown}
                    errors={errorMessage.mannerDeath}

                    isError={isError.mannerDeath}
                />


                <InputBox
                    inputLabel={"Reason for Death"}
                    placeholder={"Reason for Death"}
                    editable={true}
                    refs={reasonRef}
                    onChange={(val) => {
                        setReason(val);
                    }}
                    multiline={true}
                    numberOfLines={3}
                    onSubmitEditing={() => handleSubmitFocus(carcassConditionRef)}
                    errors={errorMessage.reason}
                    isError={isError.reason}
                    keyboardType={"default"}
                />



                <InputBox
                    inputLabel={"Carcass condition"}
                    placeholder={"Choose Carcass condition"}
                    editable={false}
                    value={condition}
                    refs={carcassConditionRef}
                    // defaultValue={enclosureType != null ? enclosureType : null}
                    onFocus={SetEncTypeDropDown}
                    rightElement={isEncTypeMenuOpen ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown}
                    errors={errorMessage.condition}
                    isError={isError.condition}


                />

                <InputBox
                    inputLabel={"Carcass Disposition"}
                    placeholder={"Choose enclosure type"}
                    editable={false}
                    value={disposition}
                    refs={carcassDispositionRef}
                    // defaultValue={enclosureType1 != null ? enclosureType1 : null}
                    rightElement={isEncTypeMenuOpen1 ? "chevron-up" : "chevron-down"}
                    onFocus={SetEncTypeDropDown1}
                    DropDown={SetEncTypeDropDown1}
                    errors={errorMessage.disposition}
                    isError={isError.disposition}
                />
                <InputBox
                    inputLabel={"Notes"}
                    placeholder={"Notes"}
                    editable={true}
                    refs={notesRef}
                    onChange={(val) => {
                        setNotes(val);
                    }}
                    multiline={true}
                    numberOfLines={3}
                    errors={errorMessage.note}
                    isError={isError.note}
                />

                {/* Necropsy Submitted */}

                <InputBox
                    inputLabel={"Necropsy"}
                    placeholder={"Choose enclosure type"}
                    editable={false}
                    value={necropsy}
                    refs={necropsyRef}
                    onFocus={SetEncTypeDropDown2}
                    // defaultValue={enclosureType1 != null ? enclosureType1 : null}

                    rightElement={isEncTypeMenuOpen2 ? "chevron-up" : "chevron-down"}
                    DropDown={SetEncTypeDropDown2}
                    errors={errorMessage.necropsy}
                    isError={isError.necropsy}
                />

            </CustomForm>

            <View >
                    <Modal
                    animationType="slide"
                    transparent={true} 
                     deviceWidth={width}
                     visible={isSectionMenuOpen}
                     style={{ margin: 0, justifyContent: 'flex-end' }}
                     onBackdropPress={closeEntity}>
                    <Category
                        categoryData={animalData}
                        onCatPress={catPressed}
                        heading={"Choose Entity"}
                        isMulti={false}
                        onClose={closeEntity}
                    />
                    </Modal>
                </View>
           
            
                <View >
                    <Modal
                    animationType="slide"
                    transparent={true} 
                     deviceWidth={width}
                     visible={isEncEnvMenuOpen}
                     style={{ margin: 0, justifyContent: 'flex-end' }}
                     onBackdropPress={closeManner}>
                    <Category
                        categoryData={mannerData}
                        onCatPress={catEnvPress}
                        heading={"Choose Manner of Death"}
                        isMulti={false}
                        onClose={closeManner}
                    />
                    </Modal>
                </View>
           

            
                <View >
                     <Modal
                    animationType="slide"
                    transparent={true} 
                     deviceWidth={width}
                     visible={isEncTypeMenuOpen}
                     style={{ margin: 0, justifyContent: 'flex-end' }}
                     onBackdropPress={closeCarcassCondition}>
                    <Category
                        categoryData={conditionData}
                        onCatPress={catEnTypePress}
                        heading={"Choose Carcass condition"}
                        isMulti={false}
                        onClose={closeCarcassCondition}
                    />
                    </Modal>
                </View>
         

            
                <View >
                     <Modal
                    animationType="slide"
                    transparent={true} 
                     deviceWidth={width}
                     visible={isEncTypeMenuOpen1}
                     style={{ margin: 0, justifyContent: 'flex-end' }}
                     onBackdropPress={closeCarcassDisposition}>
                    <Category
                        categoryData={dispositionData}
                        onCatPress={catEnTypePress1}
                        heading={"Choose Carcass Disposition"}
                        isMulti={false}
                        onClose={closeCarcassDisposition}
                    />
                    </Modal>
                </View>
   

            { /* Necropsy Submitted */}


            
                <View >
                     <Modal
                    animationType="slide"
                    transparent={true} 
                     deviceWidth={width}
                     visible={isEncTypeMenuOpen2}
                     style={{ margin: 0, justifyContent: 'flex-end' }}
                     onBackdropPress={closeNecropsy}>
                    <Category
                        categoryData={Necropsy}
                        onCatPress={catEnTypePress2}
                        heading={"Choose Necropsy "}
                        isMulti={false}
                        onClose={closeNecropsy}
                    />
                    </Modal>
                </View>

        </>
    );
};

const styles = StyleSheet.create({
    Label: {
        // top: "3%",
        marginTop: 20,
        fontSize: 5,
        fontWeight: "200",
    },
    btnCont: {
        flexDirection: "row",
        width: "55%",
        padding: "2%",
    },
    btnText: {
        // color: "#00abf0",
        fontWeight: "600",
        fontSize: 18,
    },
    button: {
        width: "81%",
        // backgroundColor: "#e1f6ff",
        borderRadius: 5,
    },
    checkboxWrap: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        borderWidth: 0.8,
        borderColor: "grey",
        borderTopWidth: 0,
        marginTop: -10,
        padding: 4,


    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "rgba(0,0,0,0.5)",
    },
    errortext: {
        color: "red"
    },
    errortext: {
        color: "red"
    },
});
export default AddDisposition;