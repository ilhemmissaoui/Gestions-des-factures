import clsx from "clsx";
import moment from "moment";
import React from "react";
import { DollarSign, File } from "react-feather";
import { toastr } from "react-redux-toastr";

const InvoiceItems = ({ sales, fetch }) => {
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
          <File className="mr-2" />
          <DollarSign />
        </td>
      </tr>
    </>
  );
};

export default InvoiceItems;
