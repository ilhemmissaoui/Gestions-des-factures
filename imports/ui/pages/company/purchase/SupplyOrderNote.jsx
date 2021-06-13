import clsx from "clsx";
import moment from "moment";
import React from "react";
import { toastr } from "react-redux-toastr";

const DeliveryNoteItems = ({ supplyOrder, fetch }) => {

    const onChange = (e) => {
        e.preventDefault();
        const status = e.target.value;
        Meteor.call("updateDeliverySupplyOrderStatus", supplyOrder._id, status, (e, r) => {
            if (!e) {
                toastr.info("", "Status Changed successfully");
                fetch();
            } else console.log(e);
        });
    };

    return (
        <>
            <tr>
                <td>{supplyOrder._id}</td>
                <td>{moment(supplyOrder.creationDate).format("MMM DD YYYY")}</td>
                <td>{supplyOrder.supplier}</td>
                <td>{supplyOrder.totaleTaxeIncl}</td>
                <td
                    className={clsx(
                        {
                            "has-text-primary": supplyOrder?.deliverStatus === "Delivered",
                        },
                        {
                            "has-text-danger": supplyOrder?.deliverStatus === "Canceled",
                        }
                    )}
                >
                    {supplyOrder?.deliverStatus}
                </td>
                <td>
                    <div class="select is-rounded">
                        <select onChange={onChange}>
                            <option
                                selected={supplyOrder?.deliverStatus === "Delivered"}
                                value="Delivered"
                            >
                                Delivered
                            </option>
                            <option
                                selected={supplyOrder?.deliverStatus === "Canceled"}
                                value="Canceled"
                            >
                                Cancel
                            </option>
                        </select>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default DeliveryNoteItems;
