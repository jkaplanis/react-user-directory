import React from "react";
import "./usercontainer.css";
import API from "../utils/API";

class UserContainer extends React.Component {
  state = {
    users: [],
    search: "",
    sortDirection: "",
    col: ""
  };

  componentDidMount() {
    API.usersList()
      .then(res => {
        const userArray = res.data.results.map(user => {
          return {
            first: user.name.first,
            last: user.name.last,
            email: user.email,
            dob: user.dob.date,
            image: user.picture.medium
          };
        });
        this.setState({ users: userArray });
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
        user.first.toLowerCase().includes(search) ||
        user.last.toLowerCase().includes(search)
      );
    });
  }

  renderUsers = () => {
    return this.filteredUsers()
      .sort(this.sortUsers)
      .map((user, index) => {
        return (
          <tr key={index}>
            <td>
              <img src={user.image} alt="user"></img>
            </td>
            <td>{user.first}</td>
            <td>{user.last}</td>
            <td>{user.email}</td>
            <td>{new Date(user.dob).toDateString()}</td>
          </tr>
        );
      });
  };

  getHeaderClassName = col => {
    return this.state.col === col
      ? `clickable ${this.state.sortDirection}`
      : `clickable`;
  };

  handleSortDirectionChange = col => {
    this.state.col === col && this.state.sortDirection === "ascending"
      ? this.setState({ sortDirection: "descending", col: col })
      : this.setState({ sortDirection: "ascending", col: col });
  };

  sortUsers = (a, b) => {
    if (a[this.state.col] < b[this.state.col]) {
      return this.state.sortDirection === "ascending" ? -1 : 1;
    } else if (a[this.state.col] > b[this.state.col]) {
      return this.state.sortDirection === "ascending" ? 1 : -1;
    }
    return 0;
  };

  render() {
    return (
      <>
        <div className="input-group mb-3">
          <div className="input-group-prepend"></div>
          <input
            onChange={this.handleSearchChange}
            type="search"
            className="form-control"
            placeholder="Search...for whatever you want"
            aria-label="SearchBox"
            aria-describedby="basic-addon1"
          />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">
                <span
                  className={this.getHeaderClassName("first")}
                  onClick={() => {
                    this.handleSortDirectionChange("first");
                  }}
                >
                  First
                </span>
              </th>
              <th scope="col">
                <span
                  className={this.getHeaderClassName("last")}
                  onClick={() => this.handleSortDirectionChange("last")}
                >
                  Last
                </span>
              </th>
              <th scope="col">
                <span
                  className={this.getHeaderClassName("email")}
                  onClick={() => this.handleSortDirectionChange("email")}
                >
                  Email
                </span>
              </th>
              <th scope="col">
                <span
                  className={this.getHeaderClassName("dob")}
                  onClick={() => this.handleSortDirectionChange("dob")}
                >
                  DOB
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
      </>
    );
  }
}

export default UserContainer;
