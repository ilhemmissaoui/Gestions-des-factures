import { Link } from "@material-ui/core";
import React from "react";

const StockPage = () => {
  return (
    <div>
      <figure className="is-clickable">
        <iframe
          className="has-ratio"
          width={1000}
          height={1000}
          src="https://blog.saginfotech.com/wp-content/uploads/2019/10/gst-e-invoice.jpg"
          frameBorder={0}
          allowFullScreen
        />
        <Link to="/company/customers"></Link>
      </figure>
    </div>
  );
};

export default StockPage;
