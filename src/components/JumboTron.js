import React from "react";
import UserTable from "./UserTable";

function JumboTron() {
  return (
    <div>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">User List</h1>
        <p className="lead">
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
