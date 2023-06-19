import React from "react";
import Alert from "../common/Alert";

const SummaryList = ({ summary }) => {
  return (
    <div className="row mt-4">
      {summary.length < 1 && <Alert />}
      {summary.map((sum, index) => (
        <div
          key={index}
          className="col-12 d-flex mb-3 justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <div
              className={
                sum.category === "IN"
                  ? "icon-wrapper-in box-sh"
                  : "icon-wrapper-out box-sh"
              }
            >
              <i
                className={
                  sum.category === "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"
                }
                aria-hidden="true"
              ></i>
            </div>
            <div className="transaction ms-3 d-flex flex-column">
              <h5>{sum.description}</h5>
              <span className="title-sm">{sum.date}</span>
            </div>
          </div>
          <h6 className={sum.category === "IN" ? "money-in" : "money-out"}>
            Rp. {sum.amount.toLocaleString()}{" "}
          </h6>
        </div>
      ))}
    </div>
  );
};

export default SummaryList;
