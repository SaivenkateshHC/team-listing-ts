import { API } from "../constants";

export const fetchUserListApi = async ({ successCallback, errorCallback }: {
    successCallback: (args: any) => void;
    errorCallback: (args: any) => void;
}) => {
    try {
        const response = await fetch(
            API + "team-members"
        );
        const data = await response.json();
        successCallback(data);
    } catch (e: any) {
        errorCallback(e)
    }
}