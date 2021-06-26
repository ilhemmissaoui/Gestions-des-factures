import React, { useEffect, useState } from "react";
import Typical from "react-typical";
const PurchaseHome = () => {
  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <h1 className="title is-1">
                <Typical
                  loop={Infinity}
                  wrapper="b"
                  steps={["  Purchases Management", 1000]}
                />
              </h1>
            </div>
          </div>

          <div className="column is-4-desktop is-6-tablet">
            <article className="message is-success">
              <div className="message-header">
                <p>Info</p>
                <button className="delete" aria-label="delete" />
              </div>
              <div className="message-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
                porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla.
                Nullam gravida purus diam, et dictum
                <a>felis venenatis</a> efficitur. Aenean ac
                <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu
                et sollicitudin porttitor, tortor urna tempor ligula, id
                porttitor mi magna a neque. Donec dui urna, vehicula et sem
                eget, facilisis sodales sem.
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHome;
