import clsx from "clsx";
import moment from "moment";
import React from "react";
import { Edit, File, PenTool,Trash2 } from "react-feather";
import { toastr } from "react-redux-toastr";
import { Meteor } from "meteor/meteor";

const ClientOrderItems = ({ sales, fetch }) => {
  const deleteSale = () => {
    Meteor.call("deleteSale", sales._id, (e, r) => {
      if (!e) fetch();
    });
  };
  return (
    <>
      <tr>
        <td>{sales._id}</td>
        <td>{moment(sales.creationDate).format("MMM DD YYYY")}</td>
        <td>{sales.customer}</td>
        <td>{sales.totaleTaxeIncl}</td>
        <td>
          <File className="mr-2" />
          <Trash2  onClick={deleteSale} />
        </td>
      </tr>
    </>
  );
};

export default ClientOrderItems;
