import axios from "axios";

function usersList() {
  return axios.get("https://randomuser.me/api/?results=50&nat=US");
}

export default {
  usersList
};
