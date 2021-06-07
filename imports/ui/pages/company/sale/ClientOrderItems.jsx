import moment from "moment";
import React from "react";
import { Edit, File, PenTool } from "react-feather";

const ClientOrderItems = ({ sales, fetch }) => {
  return (
    <>
      <tr>
        <td>{sales._id}</td>
        <td>{moment(sales.creationDate).format("MMM DD YYYY")}</td>
        <td>{sales.customer}</td>
        <td>{sales.totaleTaxeIncl}</td>
        <td>
          <File className="mr-2" />
          <Edit />
        </td>
      </tr>
    </>
  );
};

export default ClientOrderItems;
