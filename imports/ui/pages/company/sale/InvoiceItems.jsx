import clsx from "clsx";
import moment from "moment";
import React from "react";
import { DollarSign, Edit3, File, Trash2 } from "react-feather";
import { Link } from "react-router-dom";




const InvoiceItems = ({ sales, fetch }) => {

  const deleteSale = () => {
    Meteor.call("deleteEstimate", sales._id, (e, r) => {
      if (!e) fetch();
    })
  }

  return (
    <>
      <tr>
        <td>{sales._id}</td>
        <td>{moment(sales.creationDate).format("MMM DD YYYY")}</td>
        <td>{sales.customer}</td>
        <td>{sales.totaleTaxeIncl}</td>
        <td
          className={clsx(
            {
              "has-text-primary": sales?.invoiceStatus === "Paid",
            },
            {
              "has-text-danger": sales?.invoiceStatus === "Not paid",
            }
          )}
        >
          {sales?.invoiceStatus ?? "idle"}
        </td>
        <td>
          <Link to={`/${Roles.getRolesForUser(
            Meteor.userId()
          )[0]?.toLowerCase()}/estimate/print/${sales._id}`}>
            <File className="mr-2" /></Link>
          <DollarSign />
          <Trash2 className="mx-3" onClick={_ => deleteSale()} />
          <Link to={`/${(Roles.getRolesForUser(Meteor.userId())[0])?.toLowerCase()}/estimate/update/${sales._id}`}> <Edit3 /> </Link>
        </td>
      </tr>
    </>
  );
};

export default InvoiceItems;
