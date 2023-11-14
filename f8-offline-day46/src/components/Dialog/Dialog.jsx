import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { DELETE } from "../../redux/actions/action";

const Dialog = (props) => {
  const { show, handleClose, idProductDelete } = props;
  console.log(idProductDelete);

  const dispatch = useDispatch();

  const confirmDelete = () => {
    console.log("Đã vào hàm confirmDelete");
    console.log(idProductDelete);
    dispatch(DELETE(idProductDelete));
    handleClose();
  };

  const confirmDeleteDetail = () => {
    dispatch(DELETE(idProductDelete));
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: 2000, position: "fixed" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete This Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-delete-product">
            Are your sure delete this product? This action can not be undone!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dialog;
