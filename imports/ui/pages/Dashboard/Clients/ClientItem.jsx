import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const ClientItem = ({ clientInfo }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = ({ newClient }) => {
    console.log(newClient);
    onUpdate(newClient);
  };

  const onDelete = () => {
    console.log(clientInfo);
    // console.log(id);
    Meteor.call("deleteClient", clientInfo._id, (e, r) => {
      if (e) console.log(e);
    });
  };
  const onUpdate = (newClient) => {
    console.log(id);
    Meteor.call("updateClient", id, newClient, (e, r) => {
      if (e) console.log(e);
      handleClose();
    });
  };
  const handleClose = () => setIsOpened(false);
  const handleShow = () => setIsOpened(true);

  console.log(clientInfo);
  return (
    <>
      <tr>
        <td>{clientInfo?._id}</td>
        <td className="text-muted">{clientInfo?.profile?.firstName}</td>
        <td className="text-muted">
          <a href="#" className="text-reset">
            {clientInfo?.emails[0]?.address}
          </a>
        </td>
        <td className="text-muted">Client</td>
        <td>
          <Link to="#" onClick={(_) => onDelete()} className="btn btn-danger">
            Delete
          </Link>
          <Link to="#" onClick={handleShow} className="btn btn-warning">
            Update
          </Link>
        </td>
      </tr>
      <Modal
        show={isOpened}
        // fade={false}
        animation={false}
        // style={{ width: "200px", display: "block" }}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="newClient" ref={register} />

            <button type="submit" className="btn btn-primary w-100">
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClientItem;
