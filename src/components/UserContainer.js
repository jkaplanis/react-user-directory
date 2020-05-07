import React from "react";
import axios from "axios";

class UserContainer extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=10&nat=US")
      .then(res => {
        console.log(res.data.results);
        this.setState({ users: res.data.results });
      })
      .catch(err => console.log(err));
  }

  renderUsers = () => {
    return this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.name.first}</td>
          <td>{user.name.last}</td>
          <td>{user.dob.date}</td>
        </tr>
      );
    });
  };

  render() {
    console.log(this.state.users);
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>{this.renderUsers()}</tbody>
      </table>
    );
  }
}

export default UserContainer;
