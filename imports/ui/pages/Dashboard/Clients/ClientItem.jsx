import React from "react";

const ClientItem = ({ clientInfo }) => {
  console.log(clientInfo);
  return (
    <tr>
      <td>{clientInfo?._id}</td>
      <td className="text-muted">{clientInfo?.profile?.firstName}</td>
      <td className="text-muted">
        <a href="#" className="text-reset">
          {clientInfo?.emails[0]?.address}
        </a>
      </td>
      <td className="text-muted">Client</td>
      <td>
        <a className="mr-2" href="#">
          Delete
        </a>
        <a href="#">Edit</a>
      </td>
    </tr>
  );
};

export default ClientItem;
