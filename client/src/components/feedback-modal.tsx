import { Modal } from "flowbite-react";
import React from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}
const FeedbackModal = ({ isOpen, onClose, title, description }: FeedbackModalProps) => {
  return (
    <Modal show={isOpen} onClose={onClose} size={"md"}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="text-center">{description}</div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-5">
        <button
          onClick={onClose}
          className="py-2 px-5 flex justify-center gap-5 items-center rounded-full border border-gray-300 text-gray-800 text-sm font-medium"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;
