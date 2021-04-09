//import React from "react";
import Modal from "react-bootstrap/Modal";

const Modal = () => {
  return (
    <div
      class="modal modal-blur fade show"
      id="modal-simple"
      tabindex="-1"
      style="display: block; padding-right: 12px;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn me-auto" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
