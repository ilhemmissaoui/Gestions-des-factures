import React, { useState, useEffect } from "react";
import ClientItem from "./ClientItem";

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  const getCLients = () => {
    Meteor.call("getClients", (e, r) => {
      if (!e) setClients(r);
    });
  };

  useEffect(() => {
    getCLients();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        {/* Page title */}
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">Clients List</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-vcenter card-table">
                    <thead>
                      <tr>
                        <th>userId</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="w-1" />
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((e) => (
                        <ClientItem clientInfo={e} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default ClientsList;
