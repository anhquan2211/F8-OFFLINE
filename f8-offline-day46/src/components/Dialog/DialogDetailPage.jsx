import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import { DELETE } from "../../redux/actions/action";

/**
 * Component for displaying a confirmation dialog to delete a product.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.show - Indicates whether the dialog is shown.
 * @param {Function} props.handleClose - Callback function to close the dialog.
 * @param {string} props.idProductDelete - The ID of the product to be deleted.
 */
const DialogDetailPage = (props) => {
  const { show, handleClose, idProductDelete } = props;
  console.log(idProductDelete);

  const dispatch = useDispatch();

  const history = useNavigate();

  /**
   * Handles confirming the product deletion.
   */
  const confirmDelete = () => {
    dispatch(DELETE(idProductDelete));
    handleClose();
    history("/");
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

export default DialogDetailPage;

DialogDetailPage.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  idProductDelete: PropTypes.string,
};
