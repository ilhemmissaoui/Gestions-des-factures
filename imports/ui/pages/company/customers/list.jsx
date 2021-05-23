import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomersList = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <div className="mr-4 mb-5">
                <Link to="/company/customers/add" className="button is-primary is-rounded">Add</Link>
              </div>
              <div className="container">
                <table className="table is-bordered is-striped is-fullwidth">
                  <tbody>
                    <tr className="th is-selected">
                      <th>Type </th>
                      <th>Reference</th>
                      <th>Name</th>
                      <th>PHONE</th>
                      <th>TurnOver</th>
                      <th>Creation Date</th>
                      <th>Actions</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
