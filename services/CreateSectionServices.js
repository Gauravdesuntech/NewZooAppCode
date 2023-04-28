import Configs from "../configs/Config";
import { sendPostData } from "../utils/RequestHelper";

export const CreateSection = async (requestObj) => {
    let url = Configs.BASE_URL + "/zoos/createsection";
    return sendPostData(url, requestObj);
};

export const assignUserSite = async (requestObj) => {
    let url = Configs.BASE_URL + "/user/assignUserSite";
    return sendPostData(url, requestObj);
};

export const assignUserSection = async (requestObj) => {
    let url = Configs.BASE_URL + "/user/assignUserSection";
    return sendPostData(url, requestObj);
};