import axios from "axios";

function UsersList() {
  return axios.get("https://randomuser.me/api/?results=10")
    .then(res => {
      console.log(res.data.results);
      this.setState({ users: res.data.results });
    })
    .catch(err => console.log(err));
}

export default UsersList;
