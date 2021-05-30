import React, { useState, useEffect } from "react";
import { Notyf } from "notyf";
import { Meteor } from "meteor/meteor";
import Flatpickr from "react-flatpickr";
import { Plus } from "react-feather";
import Autosuggest from "react-autosuggest";
import Autocomplete from "react-autocomplete";
import { toastr } from "react-redux-toastr";
const AddSales = () => {
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const [value, onChange] = useState(new Date());
  const informations = [
    { name: "Designation", field: "Designation" },
    { name: "Quantity", field: "Quantity" },
    { name: "Ht Price", field: "Ht Price" },
    { name: "VAT", field: "VAT" },
    { name: "Total Ht", field: "Total Ht" },
  ];

  const info = [
    { name: "VAT", field: "VAT" },
    { name: "Base", field: "Base" },
    { name: "Amount", field: "Amount" },
  ];

  const [list, setList] = useState([]);
  const [totalInfo, setTotalInfo] = useState({
    totalTHA: 0,
    totalTVA: 0,
  });
  const [productNameList, setProductNameList] = useState([]);
  const [pickedCustomer, setPickedCustomer] = useState(null);
  const [productListForm, setProductListForm] = useState([]);

  const fetch = () => {
    Meteor.call("getMiniCustomers", (e, r) => {
      setList(r);
    });
  };
  const fetchProducts = () => {
    Meteor.call("getProductsName", (e, r) => {
      setProductNameList(r);
    });
  };

  useEffect(() => {
    fetch();
    fetchProducts();
  }, []);

  useEffect(() => {
    Meteor.call("getCustomers", (e, r) => {
      if (!e) setList(r);
      else console.log(e);
    });
  }, []);

  handleChange = (e, index) => {
    const values = [...productListForm];
    values[index][e.target.name] = e.target.value;
    values[index]["total"] =
      parseFloat(values[index]["price"]) * parseInt(values[index]["quantity"]);
    setProductListForm(values);
    var totalSum = 0;
    var totalTVA = 0;
    values.forEach((val) => {
      totalSum +=
        (parseFloat(val.vat) / 100).toFixed(2) *
        parseFloat(val.total).toFixed(2);
      totalTVA += parseFloat(val.vat);
    });
    console.log(totalSum);
    console.log(totalTVA);
    setTotalInfo({
      totalTHA: totalSum,
      totalTVA: totalTVA,
    });
  };

  addNewProduct = (e) => {
    e.preventDefault();
    if (!pickedCustomer) {
      toastr.error("", "No customer is selected");
      return;
    }
    setProductListForm([
      ...productListForm,
      {
        name: "",
        quantity: 0,
        price: 0,
        vat: 0,
        total: 0,
      },
    ]);
  };
  return (
    <>
      <div>
        <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
          <div className="p-1">
            <div className="columns is-variable is-desktop">
              <div className="column">
                <div className="hero-body">
                  <div className="container">
                    <div className="bd-hero-body">
                      <div className="bd-hero-heading">
                        <h1 className="title algolia-lvl0">
                          <p>Add Estimate</p>
                        </h1>
                        <section class="section">
                          <h1 class="subtitle">Informations</h1>
                          <div className="card pb-5">
                            <div className="card-content">
                              <form>
                                <div className="field-body">
                                  <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                      <label className="label">Customer</label>
                                    </div>
                                    <div className="field-body">
                                      <div className="field is-narrow">
                                        <div className="control">
                                          <div>
                                            {/* <Autosuggest suggestions={list} /> */}
                                            <select
                                              name="selected"
                                              onChange={(e) => {
                                                if (e.target.value === "")
                                                  setPickedCustomer(null);
                                                setPickedCustomer(
                                                  list.filter(
                                                    (customer) =>
                                                      customer._id ===
                                                      e.target.value
                                                  )
                                                );
                                                console.log(pickedCustomer);
                                              }}
                                            >
                                              <option value="">
                                                --- Select ---
                                              </option>
                                              {list.map((e) => (
                                                <option
                                                  key={e._id}
                                                  value={e._id}
                                                >
                                                  {e.fullName}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                        <hr className="solid" />
                                        {pickedCustomer &&
                                          pickedCustomer?.length > 0 && (
                                            <table class="table is-narrow">
                                              <tr>
                                                <td>Name</td>
                                                <td>
                                                  {pickedCustomer[0]?.fullName}
                                                </td>
                                              </tr>

                                              <tbody>
                                                <tr>
                                                  <td>Phone</td>
                                                  <td>
                                                    {" "}
                                                    {
                                                      pickedCustomer[0]
                                                        ?.phoneNumber
                                                    }
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>Email</td>
                                                  <td>
                                                    {" "}
                                                    {pickedCustomer[0]?.email}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          )}
                                        <div className="column">
                                          <div className="level-right">
                                            <div className="level-item">
                                              <Flatpickr
                                                className="mr-5"
                                                placeholder="Date "
                                                data-enable-time
                                                onChange={(date) =>
                                                  setState(date)
                                                }
                                              />
                                              <div>
                                                <br />
                                                <br />{" "}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="level-item">
                                          <div className="field-label is-normal">
                                            <label className="label">
                                              Project
                                            </label>
                                          </div>{" "}
                                          <div className="field-body">
                                            <div className="field is-narrow">
                                              <div className="control">
                                                <div>
                                                  <input
                                                    className="input is-small"
                                                    type="text"
                                                    placeholder="Small input"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>{" "}
                                        </div>{" "}
                                        <div className="column">
                                          <div className="level-left">
                                            <div className="level-item">
                                              <div className="field-label is-normal">
                                                <label className="label">
                                                  Note
                                                </label>
                                              </div>
                                              <div className="field">
                                                <div className="control">
                                                  <textarea
                                                    className="textarea is-small"
                                                    placeholder="Small textarea"
                                                    defaultValue={""}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="field">
                                    <p className="control is-expanded has-icons-left has-icons-right">
                                      <div className="field-label is-normal">
                                        <label className="label">
                                          Document Details
                                        </label>
                                      </div>
                                    </p>
                                    <hr className="solid" />
                                  </div>
                                </div>
                                <div>
                                  <br />
                                  <br />
                                </div>
                                <hr className="solid" />
                                <div className="table-container">
                                  <table className="table is-bordered is-striped is-fullwidth">
                                    <tbody>
                                      <tr>
                                        {informations.map(({ name, field }) => (
                                          <th key={name}>
                                            {sorting.field === field ? (
                                              sorting.sortDirection ===
                                              "asc" ? (
                                                <i className="fas fa-arrow-up"></i>
                                              ) : (
                                                <i className="fas fa-arrow-down"></i>
                                              )
                                            ) : null}{" "}
                                            {name}
                                          </th>
                                        ))}{" "}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="column">
                                  {productListForm.map((e, i) => (
                                    <div className="field-body mb-2">
                                      <div className="field">
                                        <p className="control is-expanded has-icons-left">
                                          <div className="control">
                                            <div>
                                              <select
                                                name="name"
                                                onChange={(e) =>
                                                  handleChange(e, i)
                                                }
                                              >
                                                <option value="">
                                                  --- Select ---
                                                </option>
                                                {productNameList.map((e) => (
                                                  <option
                                                    key={e._id}
                                                    value={e.name}
                                                  >
                                                    {e.name}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                          </div>{" "}
                                        </p>
                                      </div>

                                      <div className="field">
                                        <input
                                          className="input is-small"
                                          type="number"
                                          name="quantity"
                                          defaultValue={0}
                                          value={productListForm.quantity}
                                          onChange={(event) =>
                                            handleChange(event, i)
                                          }
                                        />
                                      </div>

                                      <div className="field">
                                        <input
                                          className="input is-small"
                                          type="text"
                                          name="price"
                                          defaultValue="1"
                                          value={productListForm.price}
                                          onChange={(event) =>
                                            handleChange(event, i)
                                          }
                                        />
                                      </div>
                                      <div className="field">
                                        <input
                                          className="input is-small"
                                          type="text"
                                          placeholder="0%"
                                          name="vat"
                                          value={productListForm.vat}
                                          onChange={(event) =>
                                            handleChange(event, i)
                                          }
                                        />
                                      </div>
                                      <div className="field">
                                        <input
                                          className="input is-small"
                                          type="text"
                                          name="total"
                                          defaultValue="0.000TND"
                                          readOnly="true"
                                          value={productListForm[i].total}
                                          onChange={(event) =>
                                            handleChange(event, i)
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <button className="button">
                                  <span className="icon is-small">
                                    <i />
                                  </span>
                                  <span>Barcode</span>
                                </button>
                                <button
                                  className="button"
                                  onClick={addNewProduct}
                                >
                                  <span className="icon is-small">
                                    <Plus />
                                  </span>
                                  <span>Add Product</span>
                                </button>
                                <button className="button">
                                  <span className="icon is-small">
                                    <i />
                                  </span>
                                  <span>Add Sub-Total</span>
                                </button>
                                <hr className="solid" />
                                <div className="level-right">
                                  <div className="level-item">
                                    <div className="table-container">
                                      <table className="table is-bordered is-striped is-fullwidth">
                                        <tbody>
                                          <tr>
                                            {info.map(
                                              ({ name, sortable, field }) => (
                                                <th key={name}>
                                                  {sorting.field === field ? (
                                                    sorting.sortDirection ===
                                                    "asc" ? (
                                                      <i className="fas fa-arrow-up"></i>
                                                    ) : (
                                                      <i className="fas fa-arrow-down"></i>
                                                    )
                                                  ) : null}{" "}
                                                  {name}
                                                </th>
                                              )
                                            )}{" "}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>{" "}
                                </div>
                                <div class="column is-half">
                                  <label className="label">NET TO PAY</label>

                                  <table class="table is-narrow">
                                    <tr>
                                      <td>Total T.Excl</td>
                                      <td>{totalInfo.totalTHA} TND</td>
                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td>Total VAT</td>
                                        <td>{totalInfo.totalTVA} %</td>
                                      </tr>
                                      <tr>
                                        <td>Total incl.Taxes</td>
                                        <td>447</td>
                                      </tr>
                                      <tr>
                                        <td>Timbre fiscal</td>
                                        <td>4542</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </form>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSales;
