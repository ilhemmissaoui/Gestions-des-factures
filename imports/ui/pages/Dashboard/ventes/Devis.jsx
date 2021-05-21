import React, { useState, useEffect } from "react";

const Devis = () => {
  return (
    <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
      <div className="p-1">
        <div className="columns is-variable is-desktop">
          <div className="column">
            <div className="container">
              <table className="table is-bordered is-striped is-fullwidth">
                <tbody>
                  <tr className="th is-selected">
                    <th>Student Name</th>
                    <th>Physics</th>
                    <th>Chemistry</th>
                    <th>Biology</th>
                    <th>Total</th>
                  </tr>
                  <tr>
                    <td>Mike</td>
                    <td>80</td>
                    <td>55</td>
                    <td>75</td>
                    <td>210</td>
                  </tr>
                  <tr>
                    <td>Haynes</td>
                    <td>70</td>
                    <td>65</td>
                    <td>40</td>
                    <td>175</td>
                  </tr>
                  <tr>
                    <td>Hina</td>
                    <td>70</td>
                    <td>52</td>
                    <td>63</td>
                    <td>185</td>
                  </tr>
                  <tr>
                    <td>Johny</td>
                    <td>55</td>
                    <td>53</td>
                    <td>42</td>
                    <td>150</td>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Devis;
