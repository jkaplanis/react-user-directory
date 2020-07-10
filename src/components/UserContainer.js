import React from "react";
import "./styles.css";
import API from "../utils/API";

class UserContainer extends React.Component {
  //set initial state
  state = {
    users: [],
    search: "",
    sortDirection: "",
    col: ""
  };

  //after the component mounts, send a get request to retrieve the users.
  //Map over the response to create an array of user objects.
  //Use setState to add the array to our users state.
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

  //function to update search state each time the user types a character
  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  //function to filter list to only show first/last that matches search
  filteredUsers() {
    const search = this.state.search.toLowerCase();
    return this.state.users.filter(user => {
      return (
        user.first.toLowerCase().includes(search) ||
        user.last.toLowerCase().includes(search)
      );
    });
  }

  //function to render a table of users
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

  //depending on which column was clicked, add or remove the arrow
  //icon specifying the sort direction
  getHeaderClassName = col => {
    return this.state.col === col
      ? `clickable ${this.state.sortDirection}`
      : `clickable`;
  };

  //depending on which column was clicked, set the sort direction to
  //the opposite of what it was.
  handleSortDirectionChange = col => {
    this.state.col === col && this.state.sortDirection === "ascending"
      ? this.setState({ sortDirection: "descending", col: col })
      : this.setState({ sortDirection: "ascending", col: col });
  };

  //function to return 1 or -1 to sort function depending on sort direction
  sortUsers = (a, b) => {
    if (a[this.state.col] < b[this.state.col]) {
      return this.state.sortDirection === "ascending" ? -1 : 1;
    } else if (a[this.state.col] > b[this.state.col]) {
      return this.state.sortDirection === "ascending" ? 1 : -1;
    }
    return 0;
  };

  //render the user container including search field
  render() {
    return (
      <>
        <div className="input-group justify-content-center">
          <div className="input-group-prepend"></div>
          <input
            onChange={this.handleSearchChange}
            type="search"
            className="form-control m-3"
            placeholder="Search"
            aria-label="SearchBox"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="table m-3">
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
        </div>
      </>
    );
  }
}

export default UserContainer;
