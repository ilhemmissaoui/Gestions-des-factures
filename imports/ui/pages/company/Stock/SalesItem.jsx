import React from "react";
import { toastr } from "react-redux-toastr";

const PurchaseItem = ({ purchaseStock, fetch }) => {

    // const onChange = (e) => {
    //     e.preventDefault();
    //     const status = e.target.value;
    //     Meteor.call("updateDeliverypurchaseStockStatus", purchaseStock._id, status, (e, __) => {
    //         if (!e) {
    //             toastr.info("", "Status Changed successfully");
    //             fetch();
    //         } else console.log(e);
    //     });
    // };

    return (
        <>
            <tr>
                <td>{purchaseStock._id}</td>
                <td>{purchaseStock.quantity}</td>
                <td>{purchaseStock.total}</td>
            </tr>
        </>
    );
};

export default PurchaseItem;
