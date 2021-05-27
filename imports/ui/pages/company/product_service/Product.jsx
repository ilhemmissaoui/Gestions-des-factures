import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateCustomerSchema } from "../../../../api/schemas/CustomerSchema";
import { toastr } from "react-redux-toastr";
import product from "../../../../../collections/product";

const Product = ({ Product, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateCustomerSchema),
  });
  const [update, setUpdate] = useState(product);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

  const deleteProduct = () => {
    Meteor.call("deleteProduct", customer._id, (e, r) => {
      if (!e) fetch();
    });
  };
  const UpdateProduct = (data) => {
    console.log(data);
    Meteor.call("updateProduct", { id: customer._id, data }, (err) => {
      if (!err) {
        toastr.success("", "Customer Updated Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error("unable to update Customer check this inputs ");
        setShow(false);
      }
    });
  };

  return (
    <>
      <ModalRoot
        title="Modify Product"
        refuse={handleClose}
        formId="product-update"
        isActive={show}
        form={UpdateProduct}
      >
        <form onSubmit={handleSubmit(UpdateProduct)} id="product-update">
          <section className="modal-card-body">
            <label htmlFor="productname" className="label">
              Product
            </label>
            <p className="control">
              <input
                defaultvalue={product.name}
                type="text"
                name="fullName"
                ref={register}
                placeholder="Product"
                className="input"
              />
            </p>{" "}
            {errors.name && (
              <p className="alert alert-danger">{errors.name.message}</p>
            )}
            <label htmlFor="productcategory" className="label">
              Product category
            </label>
            <p className="control">
              <input
                defaultvalue={product.category}
                type="text"
                name="email"
                ref={register}
                placeholder="Product Category"
                className="input"
              />
            </p>{" "}
            {errors.category && (
              <p className="alert alert-danger">{errors.category.message}</p>
            )}
            <label htmlFor="price" className="label">
              Price
            </label>
            <p className="control">
              <input
                defaultvalue={product.price}
                type="text"
                name="price"
                ref={register}
                placeholder="product price"
                className="input"
              />
            </p>{" "}
            {errors.price && (
              <p className="alert alert-danger">{errors.price.message}</p>
            )}
            <label htmlFor="brand" className="label">
            Product BRAND
            </label>
            <p className="control">
              <input
                defaultvalue={customer.brand}
                type="text"
                name="region"
                ref={register}
                placeholder="Product BRAND"
                className="input"
              />
            </p>{" "}
            {errors.brand && (
              <p className="alert alert-danger">{errors.brand.message}</p>
            )}
          </section>
        </form>
      </ModalRoot>
      <tr>
        <td>active</td>
        <td> {product.type}</td>
        <td>{product.picture}</td>
        <td>{product.in_stock}</td>
        <td>{product.price}</td>
        <td>{product.internal_reference}</td>
        <td>{product.category}</td>
        <td>{product.vat}</td>
        <td>{product.tax}</td>
       

        <button className="button is-danger is-inverted" onClick={handleShow}>
          update
        </button>
        <button
          className="button is-danger is-inverted"
          onClick={deleteProduct}
        >
          delete
        </button>
      </tr>
    </>
  );
};
export default Product;
