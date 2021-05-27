import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_green.css";
import Pager from "../../../components/Pagination";

import { Notyf } from "notyf";
import TableCol from "../../../utils/TableCols";
import Search from "../../../components/Search";
import Product from "../product_service/Product";

const ListProducts = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    field: "_id",
    sortDirection: "asc",
  });
  const { field, sortDirection } = sorting;
  const itemsPerPage = 8;
  const headers = [
    { name: "Type", field: "producttype", sortable: true },
    { name: "Picture", field: "picture", sortable: true },
    { name: "In Stock", field: "In Stock", sortable: true },
    { name: "Selling Price", field: "Selling Price", sortable: true },
    { name: "Internal Reference", field: "Internal Reference", sortable: true },
    { name: "Categories", field: "Categories", sortable: true },
    { name: "BRAND", field: "BRAND", sortable: true },
    { name: "TAX", field: "TAX", sortable: true },
    { name: "VAT", field: "VAT", sortable: true },
  ];

  const [list, setList] = useState([]);

  const fetch = () => {
    Meteor.call(
      "getProducts",
      { page, itemsPerPage, search, sortBy: field, sortOrder: sortDirection },
      (err, { items, totalCount }) => {
        if (!err) {
          setList(items);
          setTotalItems(totalCount);
        } else {
          console.log("ERRRRRRRROR");
          console.log(err);
        }
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

  // useEffect(() => {
  //   Meteor.call("getProducts", (e, r) => {
  //     if (!e) setList(r);
  //     else console.log(e);
  //   });
  // }, []);

  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              {/* Left side */}
              <div className="level-right">
                <div className="level-item">
                  <Search
                    onSearch={(value) => {
                      setSearch(value);
                      setPage(1);
                    }}
                  />

                  <div className="mr-4 mb-5">
                    <Link
                      to="/company/product_service/add"
                      className="button is-primary is-rounded"
                    >
                      Add
                    </Link>
                  </div>
                </div>
              </div>
              <div className="container">
                <table className="table is-bordered is-striped is-fullwidth">
                  <tbody>
                    <tr className="th is-selected">
                      {headers.map(({ name, sortable, field }) => (
                        <th
                          key={name}
                          onClick={() =>
                            handleSort(
                              field,
                              sorting.field === field
                                ? sorting.sortDirection == "asc"
                                  ? "desc"
                                  : "asc"
                                : "asc"
                            )
                          }
                        >
                          {sorting.field === field ? (
                            sorting.sortDirection === "asc" ? (
                              <i className="fas fa-arrow-up"></i>
                            ) : (
                              <i className="fas fa-arrow-down"></i>
                            )
                          ) : null}{" "}
                          {name}
                        </th>
                      ))}
                    </tr>
                    {list?.length === 0 ? (
                      <TableCol col={9} />
                    ) : (
                      list?.map((product) => (
                        <Product
                          key={product._id}
                          product={product}
                          fetch={fetch}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pager
            total={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
export default ListProducts;
