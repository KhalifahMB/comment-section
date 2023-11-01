/* eslint-disable react/no-unescaped-entities */
import propTypes from "prop-types";
import { Button, Modal } from "flowbite-react";
import { useContext } from "react";
import { AppContex } from "../context/AppContext";
export default function DeleteModal({ openModal, modalPlacement, modalSize }) {
  const { deleteComment, closeModal } = useContext(AppContex);

  return (
    <>
      <Modal
        show={openModal}
        size={modalSize}
        popup
        onClose={() => closeModal()}
        position={modalPlacement}
        className="grid place-items-center h-[100vh] w-[100vw] items-center md:items-center"
      >
        {/* <Modal.Header /> */}
        <Modal.Body>
          <div className="text-left">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h1 className="text-2xl font-bold text-darkblue mt-3">
              Delete comment
            </h1>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment? This will remove the
              commnt and can't be undone.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="uppercase w-full text-white bg-gray-500 hover:bg-gray-300"
                // color="gray"
                onClick={() => closeModal()}
              >
                No, cancel
              </Button>
              <Button
                // outline="false"
                color="failure"
                className="w-full uppercase text-white bg-softRed hover:bg-palered"
                onClick={() => deleteComment()}
              >
                Yes, I'm sure
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

DeleteModal.propTypes = {
  openModal: propTypes.bool,
  modalPlacement: propTypes.string.isRequired,
  modalSize: propTypes.string.isRequired,
};
