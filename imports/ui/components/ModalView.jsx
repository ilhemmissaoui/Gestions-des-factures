import React, { Component } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

const modalRoot = document.getElementById("modal-root");
const ModalWrapper = ({
  isActive = false,
  children,
  title,
  confirm,
  refuse,
}) => {
  return (
    <div id="modal-ter" className={clsx("modal", { "is-active": isActive })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={confirm}>
            Save changes
          </button>
          <button className="button" onClick={refuse}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
class ModalRoot extends Component {
  render() {
    return ReactDOM.createPortal(ModalWrapper(this.props), modalRoot);
  }
}

export default ModalRoot;
