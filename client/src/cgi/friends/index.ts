import { post } from "@request";
const friendsListUrl = `/friends/list`;

export const getFriendsList = async ()=>{
    return await post(friendsListUrl);
}