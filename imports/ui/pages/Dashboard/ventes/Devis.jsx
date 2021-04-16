import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import ClientItem from "../Clients/ClientItem";



const Devis = () => {
  const [date, setDate] = useState(new Date());
  const [clients, setClients] = useState([]);
  
  const getCLients = () => {
    Meteor.call("getClients", (e, r) => {
      if (!e) setClients(r);
    });
  };
  useEffect(() => {
    getCLients();
  }, []);

  const onChange = (date) => {
    setDate(date);
  };

  

  return (
    <div className="col-12">
      <div className="card">
        <div className="table-responsive">
          <table className="table table-vcenter table-mobile-md card-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
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
      <div>
        <Calendar onChange={onChange} value={date} />
      </div>
    </div>
  );
};

export default Devis;
