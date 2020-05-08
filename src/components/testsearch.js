import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    search: "",
  };
  removeFriend = (id) => {
    // Filter this.state.friends for friends with an id not equal to the id
    // being removed
    const friends = this.state.friends.filter((friend) => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };
  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };
  filteredFriends() {
    const search = this.state.search.toLowerCase();
    return this.state.friends.filter((friend) => {
      return friend.name.toLowerCase().includes(search);
    });
  }
  // Map over this.state.friends and render a FriendCard component for each
  // friend object
  render() {
    return (
      <Wrapper>
        <Title>Friends List</Title>
        <div style={{ width: "100%" }}>
          <label>
            Search:{" "}
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
          </label>
        </div>
        {this.filteredFriends().map((friend) => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}
export default App;
