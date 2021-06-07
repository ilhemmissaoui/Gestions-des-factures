import React, { useState, useEffect } from "react";
import { Notyf } from "notyf";
import { Meteor } from "meteor/meteor";
import Flatpickr from "react-flatpickr";
import ReactToPrint from "react-to-print";

const AddPurchases = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 8;
  const [value, onChange] = useState(new Date());
  const informations = [
    { name: "Designation", field: "Designation", sortable: true },
    { name: "Quantity", field: "Quantity", sortable: true },
    { name: "Ht Price", field: "Ht Price", sortable: true },
    { name: "VAT", field: "VAT", sortable: true },
    { name: "Total Ht", field: "Total Ht", sortable: true },
  ];

  const info = [
    { name: "VAT", field: "VAT", sortable: true },
    { name: "Base", field: "Base", sortable: true },
    { name: "Amount", field: "Amount", sortable: true },
  ];

  const [list, setList] = useState([]);
  const [pickedCustomer, setPickedCustomer] = useState(null);
  const [pickedProduct, setPickedProduct] = useState(null);
  const fetch = () => {
    Meteor.call(
      "getCustomers",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        setList(items);
        setTotalItems(totalCount);
      }
    );
  };
  useEffect(() => {
    fetch();
  }, [search, page, sorting]);
  const handleSort = (field, sortDirection) => {
    setSorting({
      field,
      sortDirection,
    });
  };


  
  useEffect(() => {
    Meteor.call("getCustomers", (e, r) => {
      if (!e) setList(r);
      else console.log(e);
    });
  }, []);

  
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
                                      <label className="label">Supplier</label>
                                    </div>
                                    <div className="field-body">
                                      <div className="field is-narrow">
                                        <div className="control">
                                          <div>
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
                                        {informations.map(
                                          ({ name, sortable, field }) => (
                                            <th
                                              key={name}
                                              onClick={() =>
                                                handleSort(
                                                  field,
                                                  sorting.field === field
                                                    ? sorting.sortDirection ==
                                                      "asc"
                                                      ? "desc"
                                                      : "asc"
                                                    : "asc"
                                                )
                                              }
                                            >
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
                                <div className="field-body">
                                  <div className="field">
                                    <p className="control is-expanded has-icons-left">
                                      <div className="control">
                                        <div>
                                          <select
                                            name="selected"
                                            onChange={(e) => {
                                              if (e.target.value === "")
                                                setPickedProduct(null);
                                              setPickedProduct(
                                                list.filter(
                                                  (product) =>
                                                    product._id ===
                                                    e.target.value
                                                )
                                              );
                                              console.log(pickedProduct);
                                            }}
                                          >
                                            <option value="">
                                              --- Select ---
                                            </option>
                                            {list.map((e) => (
                                              <option key={e._id} value={e._id}>
                                                {e.productname}
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
                                      placeholder="1"
                                    />
                                  </div>

                                  <div className="field">
                                    <input
                                      className="input is-small"
                                      type="text"
                                      defaultValue="1"
                                    />
                                  </div>
                                  <div className="field">
                                    <input
                                      className="input is-small"
                                      type="text"
                                      placeholder="0%"
                                    />
                                  </div>
                                  <div className="field">
                                    <input
                                      className="input is-small"
                                      type="text"
                                      defaultValue="0.000TND"
                                    />
                                  </div>
                                </div>

                                <hr className="solid" />

                                <div className="field has-addons">
                                  <p className="control">
                                    <button className="button">
                                      <span className="icon is-small">
                                        <i />
                                      </span>
                                      <span>Barcode</span>
                                    </button>
                                  </p>
                                  <p className="control">
                                    <button className="button">
                                      <span className="icon is-small">
                                        <i />
                                      </span>
                                      <span>Add Product</span>
                                    </button>
                                  </p>
                                  <p className="control">
                                    <button className="button">
                                      <span className="icon is-small">
                                        <i />
                                      </span>
                                      <span>Add Sub-Total</span>
                                    </button>
                                  </p>
                                </div>
                                <hr className="solid" />
                                <div className="level-right">
                                  <div className="level-item">
                                    <div className="table-container">
                                      <table className="table is-bordered is-striped is-fullwidth">
                                        <tbody>
                                          <tr>
                                            {info.map(
                                              ({ name, sortable, field }) => (
                                                <th
                                                  key={name}
                                                  onClick={() =>
                                                    handleSort(
                                                      field,
                                                      sorting.field === field
                                                        ? sorting.sortDirection ==
                                                          "asc"
                                                          ? "desc"
                                                          : "asc"
                                                        : "asc"
                                                    )
                                                  }
                                                >
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
                                      <td>15656</td>
                                    </tr>

                                    <tbody>
                                      <tr>
                                        <td>Total VAT</td>
                                        <td>554</td>
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

export default AddPurchases;
