/*Example of Expandable ListView in React Native*/
import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
//import basic react native components
import { Bullets } from "react-native-easy-content-loader";

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor(props) {
    super();

    this.state = {
      layoutHeight: 0,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.item.isSelect) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <>
        <TouchableOpacity
          onPress={this.props.onClickFunction}
          style={[
            styles.selectedChild2,
            {
              backgroundColor: this.props.item.isSelect ? "#1F515B" : "white",
            },
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              color: this.props.item.isSelect ? "white" : "#6a858b",
              fontSize: 14,
            }}
          >
            {this.props.item.name}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}

export default class Category extends Component {
  //Main View defined under this Class
  constructor(props) {
    super(props);
    this.dataRef = React.createRef(null);
    this.blankRef = React.createRef(null);
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      newCat: null,
      listDataSource: props.categoryData,
      catPresed: props.onCatPress,
      heading: props.heading,
      userType: props.userType,
      navigation: props.navigation,
      permission: props.permission,
      screen: props.screen,
      isMulti: props.isMulti,
      searchValue: "",
      isOpen: false,
      noOptionMessage: props.noOptionAvailableMessage,
    };
  }

  componentDidMount() {
    if (this.listDataSource !== [] && this.listDataSource !== null) {
      // if (Array.isArray(this.listDataSource) && this.listDataSource.length>0) {
      setTimeout(() => {
        this.dataRef.current?.focus();
      }, 0);
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.categoryData.length != state.listDataSource.length) {
      return {
        newCat: null,
        listDataSource: props.categoryData,
        catPresed: props.onCatPress,
        heading: props.heading,
        userType: props.userType,
        navigation: props.navigation,
        permission: props.permission,
        screen: props.screen,
      };
    }
    return null;
  }

  filterSubCat = (i) => {
    //console.log("I================>", i)
    const arrayy = [...this.state.listDataSource];
    arrayy.map((value, placeindex) =>
      placeindex === i ? this.setState({ newCat: value }) : null
    );
  };

  getData = () => {
    let { searchValue } = this.state;
    // let items = this.props.items || [];
    let items = this.props.categoryData || [];
    let data = items.filter((element) => {
      let name = element.name
        ? element.name.toLowerCase()
        : element?.item?.toLowerCase();
      let index = name?.indexOf(searchValue.toLowerCase());
      return index > -1;
    });
    return data;
  };

  toggleInput = () => {
    this.setState({ isOpen: !this.state.isOpen });
    // console.log("<><><><><><>")
  };

  updateLayout = (index) => {
    this.filterSubCat(index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    if (!this.state.isMulti) {
      //For Single Expand at a time
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]["isSelect"] = !array[placeindex]["isSelect"])
          : (array[placeindex]["isSelect"] = false)
      );
      this.state.catPresed(array.filter((element) => element.isSelect == true));
    } else {
      //For Multiple Expand at a time
      array[index]["isSelect"] = !array[index]["isSelect"];
      this.state.catPresed(array.filter((element) => element.isSelect == true));
    }
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  render() {
    const { listDataSource, newCat, catPresed, heading, navigation, screen } =
      this.state;

    return (
      <>
        {listDataSource != "" ? (
          <View style={styles.container} >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#1F515B",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 50,
                alignItems: "center",
              }}
            >
              <Text style={[styles.topHeading, { color: "#4de78a" }]}>
                {this.state.heading}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingRight: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    // this.state.navigation.navigate(screen);
                    console.log("Here");
                  }}
                >
                  <AntDesign
                    active
                    name="edit"
                    type="AntDesign"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // backgroundColor: "red",
                    paddingVertical: 5,
                    marginHorizontal: 5,
                    paddingRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={this.toggleInput}
                >
                  <AntDesign
                    active
                    name="search1"
                    type="AntDesign"
                    style={{
                      color: this.state.isOpen ? "#4de78a" : "#fff",
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingRight: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={this.props?.onClose}
                >
                  <AntDesign
                    active
                    name="close"
                    type="AntDesign"
                    style={{
                      color: "#fff",
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {this.state.isOpen ? (
              <TextInput
                value={this.state.searchValue}
                autoFocus={true}
                onChangeText={(value) => this.setState({ searchValue: value })}
                placeholder="Search ..."
                style={{ marginHorizontal: 1, borderWidth: 0.5, padding: 5 }}
              />
            ) : null}
            <SafeAreaView
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  // borderColor: "#1F515B",
                  // borderWidth: 1,
                  borderTopWidth: 0,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  paddingLeft: 15,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <FlatList
                  data={this.getData()}
                  extraData={listDataSource}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ExpandableItemComponent
                      key={item.id}
                      onClickFunction={this.updateLayout.bind(this, index)}
                      onCatPressed={catPresed}
                      item={item}
                    />
                  )}
                />
              </View>
            </SafeAreaView>
          </View>
        ) : (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#1F515B",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 50,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.topHeading,
                  !this.state.isOpen ? { color: "#fff" } : { color: "#4de78a" },
                ]}
              >
                {this.state.heading}
              </Text>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingRight: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={this.props?.onClose}
              >
                <AntDesign
                  active
                  name="close"
                  type="AntDesign"
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color:
                    this.state.noOptionMessage !== undefined ? "red" : "black",
                }}
              >
                {this.state.noOptionMessage !== undefined
                  ? this.state.noOptionMessage
                  : "No options available"}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#dae7df",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // width: "90%",
    height: 400,
    // marginTop: "auto",
    // paddingBottom: "10%",
    // marginRight: 10,
  },
  topHeading: {
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 15,
  },
  header: {
    backgroundColor: "#fff",
    height: 40,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 15,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "95%",
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 15,
    color: "#606070",
    padding: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  selectedChild: {
    width: 100,
    height: 50,
    borderRadius: 5,
    marginLeft: "4%",
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },

  selectedChild2: {
    width: 100,
    height: 50,
    borderRadius: 5,
    margin: 10,
    // backgroundColor: "white",
    borderColor: "#C3CEC7",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  submit_Icon: {
    width: "100%",
    height: "14%",
    // borderWidth: 1,
    // borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
