import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "./Customer";
import Search from "../../../components/Search";
import Customers from "../../../../../collections/customers";

const CustomersList = () => {
  const [value, onChange] = useState(new Date());
  const [list, setList] = useState([]);
  useEffect(() => {
    Meteor.call("getCustomers", (e, r) => {
      if (!e) setList(r);
      else console.log(e);
    });
  }, []);

  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              {/* Left side */}
              <div className="level-right">
                <div className="level-item">
                  <Search />

                  <div className="mr-4 mb-5">
                    <Link
                      to="/company/customers/add"
                      className="button is-primary is-rounded"
                    >
                      Add
                    </Link>
                  </div>
                </div>
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
                    {list?.map((customer) => (
                      <Customer key={customer._id} customer={customer} />
                    ))}
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
