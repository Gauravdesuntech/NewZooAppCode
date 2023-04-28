//create by : Arnab
// create on : 10.3.23

import { useContext, useEffect, useState, useRef } from "react";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import { assignUserSite, CreateSection } from "../../services/CreateSectionServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import Category from "../../components/DropDownBox";
import { Text, View, useWindowDimensions } from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";

import { useSelector } from "react-redux";
import { getListSite } from "../../services/AddSiteService";
import Modal from "react-native-modal";


export default function AssignUserSite() {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    const [sites, setSites] = useState([]);
    const [sitesId, setSitesId] = useState("");
    const [sitesName, setSitesName] = useState(null);
    const [loading, setLoding] = useState(false);

    const [isError, setIsError] = useState({});
    const [errorMessage, setErrorMessage] = useState({})
    const [siteDropDown, setSiteDropDown] = useState()
    const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);
    const zooID = useSelector((state) => state.UserAuth.zoo_id);

    const validation = () => {
        if (sitesName === null || sitesName.trim().length === 0) {
            setIsError({ sitesName: true })
            setErrorMessage({ sitesName: "Choose any Site" })
            return false;
        }
        return true;
    };

    const getData = async () => {
        setLoding(true)
        getListSite(zooID).then((res) => {
            let sites = res.data.map((item) => {
                return {
                    id: item.site_id,
                    name: item.site_name
                }
            })
            setSites(sites);
            // setLoding(false);
        })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoding(false)
                handleSubmitFocus(sectionNameRef)
            })
    };

    const handleSites = (item) => {
        setSitesName(item.map((u) => u.name).join(", "));
        setSitesId(item.map((u) => u.id));
        setSiteDropDown(!siteDropDown)
    };

    useEffect(() => {
        setLoding(true)
        getData()
    }, [])

    const addSectionData = () => {
        if (validation()) {
            let obj = {
                user_id: user_id,
                site_id: sitesId
            }
            setLoding(true)
            assignUserSite(obj).then((res) => {
                alert(res.message);
                navigation.goBack();
            }).catch((err) => {
                console.log(err);
                alert("Something went wrong!!");
            }).finally(() => {
                setLoding(false);
            });
        }
    }

    const SetDropDown = () => {
        // console.log("DRop*************************", data)
        setSiteDropDown(!siteDropDown)
    };

    const sectionNameRef = useRef(null);
    const handleSubmitFocus = (refs) => {
        if (refs.current) {
            refs.current.focus();
        }
    };


    //  useEffect(() => {
    //  setTimeout(() => {
    //     sectionNameRef.current.focus();
    //   }, 0);
    // },[]);


    return (
        <>
            <CustomForm header={true} title={"Assign User Sites"} onPress={addSectionData}>
                <Loader visible={loading} />
                <InputBox
                    editable={false}
                    inputLabel="Section Name"
                    value={sitesName}
                    refs={sectionNameRef}
                    placeholder="Select Section Name"
                    rightElement={siteDropDown ? "chevron-up" : "chevron-down"}
                    DropDown={SetDropDown}
                    onFocus={SetDropDown}
                    errors={errorMessage.sitesName}
                    isError={isError.sitesName}
                />
            </CustomForm>
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    deviceWidth={width}
                    visible={siteDropDown}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    onBackdropPress={SetDropDown}>
                    <Category
                        categoryData={sites}
                        onCatPress={handleSites}
                        heading={"Choose Sites"}
                        isMulti={true}
                        onClose={SetDropDown}
                    />
                </Modal>
            </View>
        </>
    );
}

