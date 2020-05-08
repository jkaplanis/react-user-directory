import React from "react";
import axios from "axios";

class UserContainer extends React.Component {
  state = {
    users: [],
    search: ""
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=50&nat=US")
      .then(res => {
        this.setState({ users: res.data.results });
      })
      .catch(err => console.log(err));
  }

  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  filteredUsers() {
    const search = this.state.search.toLowerCase();
    return this.state.users.filter(user => {
      return (
        user.name.first.toLowerCase().includes(search) ||
        user.name.last.toLowerCase().includes(search)
      );
    });
  }

  renderUsers = () => {
    return this.filteredUsers().map((user, index) => {
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
          </div>
          <input
            onChange={this.handleSearchChange}
            type="text"
            className="form-control"
            placeholder="Search...for whatever you want really"
            aria-label="SearchBox"
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
