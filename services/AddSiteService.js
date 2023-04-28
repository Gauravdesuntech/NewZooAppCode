import Config from "../configs/Config";
import { sendPostData,sendGetRequest} from "../utils/RequestHelper";

export const PostSite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/add-user-site";
    return sendPostData(url,requestObj);
};

export const getListSite = async (zoo_id) => {
    let url = Config.BASE_URL + "zoos/getZooSite/"+zoo_id;
    return sendGetRequest(url);
};

export const EditSite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/edit-user-site";
    return sendPostData(url,requestObj);
};

export const deletesite = async (requestObj) => {
    let url = Config.BASE_URL + "/user/delete-user-site";
    return sendPostData(url,requestObj);
};


export const getZooSite = async (zoo_id) => {
    let url = Config.BASE_URL + "zoos/getZooSite/"+zoo_id;
    return sendGetRequest(url);
};