import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateProductSchema } from "../../../../api/schemas/ProductSchema";
import { toastr } from "react-redux-toastr";
import { Edit, Trash2 } from "react-feather";

const Product = ({ product, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateProductSchema),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProduct = () => {
    Meteor.call("deleteProduct", product._id, (e, r) => {
      if (!e) fetch();
    });
  };
  const updateProduct = (data) => {
    console.log(data);
    Meteor.call("updateProduct", { id: product._id, data }, (err) => {
      if (!err) {
        toastr.success("", "Product Updated Successfully");
        fetch();
        setShow(false);
      } else {
        console.log(err);
        toastr.error("unable to update Product check this inputs ");
        setShow(false);
      }
    });
  };

  return (
    <>
      <ModalRoot
        title="Modify Product"
        refuse={handleClose}
        formId="update"
        isActive={show}
      >
        <form onSubmit={handleSubmit(updateProduct)} id="update">
          <section className="modal-card-body">
            <label htmlFor="productname" className="label">
              Product Name
            </label>
            <p className="control">
              <input
                defaultValue={product.name}
                type="text"
                name="product"
                ref={register}
                placeholder="Product Name"
                className="input"
              />
            </p>{" "}
            {errors.product && (
              <p className="alert alert-danger">{errors.product.message}</p>
            )}
            <label htmlFor="productcategory" className="label">
              Product Category
            </label>
            <p className="control">
              <input
                defaultValue={product.type}
                type="text"
                name="category"
                ref={register}
                placeholder="Product Category"
                className="input"
              />
            </p>{" "}
            {errors.category && (
              <p className="alert alert-danger">{errors.category.message}</p>
            )}
            <label htmlFor="price" className="label">
              Product Price
            </label>
            <p className="control">
              <input
                defaultValue={product.price}
                type="text"
                name="price"
                ref={register}
                placeholder="Product Price "
                className="input"
              />
            </p>{" "}
            {errors.price && (
              <p className="alert alert-danger">{errors.price.message}</p>
            )}
          </section>
        </form>
      </ModalRoot>
      <tr>
        <td>active</td>
        <td> {product.type}</td>
        <td>{product.name}</td>
        <td>{product.tax}</td>
        <td>{product.price}</td>
        <td>{product.price}</td>
        <td>{product.price}</td>
        <td>{product.price}</td>

        <td>{moment(product.creationDate).format("MMM DD YYYY")}</td>

        <Edit className="is-info" onClick={handleShow} />
        <Trash2 className="is-danger" onClick={deleteProduct} />
      </tr>
    </>
  );
};
export default Product;
