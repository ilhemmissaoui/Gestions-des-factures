import React from "react";
import { Link } from "react-router-dom";
import UsersList from "../Dashboard/UsersList";
const DashboardAdmin = () => {
  return (
    <div>
      <UsersList />

      <form>
        <div className="mb-3">
          <label className="form-label">Text</label>
          <input
            type="text"
            className="form-control"
            name="example-text-input"
            placeholder="Input placeholder"
          />
        </div>

        <div className="text-center text-muted mt-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={(_) => Meteor.logout()}
          >
            Logout
          </button>
        </div>
      </form>
      <div className="text-center text-muted mt-3">
        <Link to="/newreport">add links</Link>
      </div>
    </div>
  );
};

export default DashboardAdmin;
