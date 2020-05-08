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
    return (
      <>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Search
            </span>
          </div>
          <input
            onChange={}
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
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
      </>
    );
  }
}

export default UserContainer;
