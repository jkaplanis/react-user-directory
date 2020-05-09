import axios from "axios";

function usersList() {
  return axios.get("https://randomuser.me/api/?results=200&nat=US");
}

export default {
  usersList
};
