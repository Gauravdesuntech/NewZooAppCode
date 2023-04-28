import React, { useState, createRef, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import VoiceText from "../components/VoiceText";
import { SearchPage, data } from "../configs/Config";
import Colors from "../configs/Colors";
import { searchCommonName, searchEnclosure, searchScientificName, searchSection, searchSite } from "../services/SearchService";
import { useSelector } from "react-redux";
import Category from "../components/DropDownBox";
import Modal from "react-native-modal";
import CustomCard from "../components/CustomCard"
import { capitalize } from "../utils/Utils";


const deviceWidth = Dimensions.get("window").width;


const SearchScreen = (props) => {
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState("Common Name");
  const [isloadong, setIsloadong] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [searchdata, setSearchData] = useState([]);
  const [searchTypeID, setSearchTypeID] = useState("")
  const [secrhDropDownOpen, setSecrchDropDownOpen] = useState(false)
  const [apiDataShow, setApiDataShow] = useState(false)
  const navigation = useNavigation();
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const gotoBack = () => navigation.goBack();


  let popUpRef = createRef();

  // const onShowPopUp = () => {
  //   console.log("show the botomSheet")
  //   popUpRef.show();
  // };

  // const onClosePopUp = () => {
  //   console.log("close the bottomSheet")
  //   popUpRef.close();
  // };

  const onIconClick = (item) => {
    // console.log('Wasim');

    setValue(item.buttonTitle)
    popUpRef.close();

    //   if(item.buttonTitle === "Enclosure"){
    //  navigation.navigate("EnclosureDetails",{enclosure_id:item.enclosure_environment})
    //   }else if(item.buttonTitle === "Section"){
    //     navigation.navigate("ListSection",{section_id:item.section_name})
    //   }else if(item.buttonTitle === "Site"){
    //     navigation.navigate("ListSite",{})
    //   }else if(item.buttonTitle === "Common Name"){
    //     navigation.navigate("AnimalsDetails",{})
    //   }else{
    //     navigation.navigate("AnimalsDetails")
    //   }

    if (searchText != '') {
      searchData(searchText, item.name)
    }
  };

  const List = ({ item }) => {

    if (value === "Enclosure") {
      return (
        <TouchableOpacity style={[styles.listContainer]}
          onPress={() => navigation.navigate("EnclosureDetails", { enclosure_id: item.enclosure_id })}
        >

          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <Text>Enclosure environment :</Text>
              <Text style={styles.idNumber}>{`${item.enclosure_environment}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text>Enclosure name :</Text>
            <Text style={styles.idNumber}>{item.user_enclosure_name}</Text>
          </View>

        </TouchableOpacity>
      )
    } else if (value === "Section") {
      return (
        <TouchableOpacity style={[styles.listContainer]}
          onPress={() => navigation.navigate("ListSection", { section_id: item.section_name })}
        >

          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <Text>Section name :</Text>
              <Text style={styles.idNumber}>{`${item.section_name}`}</Text>
            </View>
          </View>


        </TouchableOpacity>
      )
    } else if (value === "Site") {
      return (
        <TouchableOpacity style={[styles.listContainer]}
          onPress={() => navigation.navigate("ListSite", { id: item.site_name })}
        >

          <View style={[styles.header]}>
            <View style={styles.innerHeader}>
              <Text>site name :</Text>
              <Text style={styles.idNumber}>{`${item.site_name}`}</Text>
            </View>

          </View>
        </TouchableOpacity>
      )

    } else if (value === "Common Name") {
      return (
        <TouchableOpacity
        // style={[styles.listContainer]}
        // onPress={()=>navigation.navigate("AnimalsDetails",{animal_id:item.common_name})}
        >
          <CustomCard
            title={capitalize(item.common_name)}
            subtitle={item.scientific_name}
            onPress={() => navigation.navigate("AnimalsDetails",
              { title: item.common_name })}
            count={item.sex_data.total}
            tags={item.sex_data}
          />
        </TouchableOpacity>
      )

    } else if (value === "Scientific Name") {
      console.log({ item });
      return (
        <TouchableOpacity style={[styles.listContainer]}
          onPress={() => navigation.navigate("AnimalsDetails", { animal_id: item.animal_id })}
        >

          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <Text>complete name :</Text>
              <Text style={styles.idNumber}>{`${item.scientific_name}`}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text>Male Count :</Text>
            <Text style={styles.idNumber}>{item.sex_data.male}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text>female Count :</Text>
            <Text style={styles.idNumber}>{item.sex_data.female}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text>undetermind :</Text>
            <Text style={styles.idNumber}>{item.sex_data.undetermined}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>indetermind :</Text>
            <Text style={styles.idNumber}>{item.sex_data.indetermined}</Text>
          </View>
        </TouchableOpacity>
      )
    }

  }

  useEffect(() => {
    setSearchData([])
    seterrorMessage("")
    const getData = setTimeout(() => {
      searchData(searchText, value)
    }, 1000)

    return () => clearTimeout(getData)
  }, [searchText, value])

  const searchData = (query, val) => {
    if (query.length >= 3) {
      let requestObj = {
        searchquery: query,
        zoo_id: zooID,
      };
      if (val === "Enclosure") {
        setIsloadong(true)
        searchEnclosure(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            Keyboard.dismiss()
            setSearchData(res.data)
            setApiDataShow(true);

          })
          .catch((error) => console.log(error))
          .finally(() => { setIsloadong(false) });
      } else if (val === "Section") {
        setIsloadong(true)
        searchSection(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            Keyboard.dismiss()
            setSearchData(res.data);
            setApiDataShow(true);

          })
          .catch((error) => console.log(error))
          .finally(() => { setIsloadong(false) });;
      } else if (val === "Site") {
        setIsloadong(true)
        searchSite(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            Keyboard.dismiss()
            setSearchData(res.data)
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => { setIsloadong(false) });;
      } else if (val === "Common Name") {
        setIsloadong(true)
        searchCommonName(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            Keyboard.dismiss()
            setSearchData(res.data)
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => { setIsloadong(false) });;
      } else if (val === "Scientific Name") {
        setIsloadong(true)
        searchScientificName(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            Keyboard.dismiss()
            setSearchData(res.data)
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => { setIsloadong(false); });;
      } else {
        seterrorMessage("Please Choose Search by..")
      }
    }

  };

  const onVoiceInput = (text) => {
    setSearchText(text);
  };

  // const SetDropDown = (data) => {
  //   setSecrchDropDownOpen(true)
  //   setSecrchDropDownOpen(data)
  // };

  const searchPressed = (item) => {
    setSecrchDropDownOpen(!secrhDropDownOpen)
    setValue(item.map((value) => value.name).join(","))
    // console.log(item.map((value)=> value.name));
    setSearchTypeID(item.map((value) => value.id).join(","))

  };

  const acsnClose = () => {
    setSecrchDropDownOpen(false);
  }

  // console.log(('.....searchdata.......', searchdata));


  return (
    <>

      <SafeAreaView style={styles.container}>
        {/* <Loader visible={isloadong} /> */}
        <View>
          <Searchbar
            placeholder={value === "" ? "Search..." : `Search by ${value}`}
            inputStyle={styles.input}
            onIconPress={gotoBack}
            style={styles.Searchbar}
            loading={isloadong}
            onChangeText={(e) => { setSearchText(e) }}
            value={searchText}
            autoFocus={true}
            right={() => (
              <>
                <VoiceText resultValue={onVoiceInput} />
                <Ionicons name="md-filter-outline" size={20} color="black"
                  style={{ marginRight: 10 }}
                  onPress={() => setSecrchDropDownOpen(true)}
                />
              </>
            )}
          />
          {errorMessage ? (
            <Text style={styles.errortext}>
              {errorMessage}
            </Text>
          ) : null}
        </View>


        <View style={styles.SearchContainer} >

          {searchdata.length > 0 ? <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>{isloadong === false ? value : ""}</Text> : ""}
          {searchdata.length > 0 ?
            <FlatList
              con
              data={searchdata}
              renderItem={List}
              keyExtractor={item => item.enclosure_id}
            />
            :
            <>
              {apiDataShow === true ?
                <Text style={styles.errortext}>
                  ...No Data Found...
                </Text> : null}
            </>
          }
        </View>
        {/* } */}

      </SafeAreaView>
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          deviceWidth={width}
          visible={secrhDropDownOpen}
          style={{ margin: 0, justifyContent: 'flex-end' }}
          onBackdropPress={acsnClose}>
          <Category
            categoryData={SearchPage}
            onCatPress={searchPressed}
            heading={"Choose Search By"}
            isMulti={false}
            onClose={acsnClose}
          />
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  errortext: {
    color: "red",
    textAlign: 'center'
  },
  button: {
    width: "81%",
    borderRadius: 5,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 14,
  },
  btnCont: {
    width: '100%',
    padding: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGrey,
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  idNumber: {
    marginLeft: 3,
    fontWeight: '500'
  },
  SearchContainer: {
    // backgroundColor: '#fff',
    // flex :1,
    paddingHorizontal: 8,
    paddingBottom: 8
  },
  listContainer: {
    backgroundColor: "#ccc",
    marginVertical: 5,
    borderRadius: 8,
    padding: 7,
  },
  rightIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    marginHorizontal: "1%",
  },
  Searchbar: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey
  }
});

export default SearchScreen;