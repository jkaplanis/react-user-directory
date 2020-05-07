import React from "react";
import UserTable from "./UserTable";

function JumboTron() {
  return (
    <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">User List</h1>
        <p class="lead">
          This is a list of user's hopefully an interesting list if I can get
          the API to work.
        </p>
      </div>
    </div>
    <UserTable/>
    </div>
  );
}
export default JumboTron;
