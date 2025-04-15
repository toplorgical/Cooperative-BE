import { Modal } from "flowbite-react";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isLoading: boolean;
  description: string;
  actionTitle: string;
  onConfirm: () => void;
  actionType?: "danger" | "confirm";
}
const ActionModal = ({
  isLoading,
  isOpen,
  onClose,
  title,
  description,
  actionTitle,
  onConfirm,
  actionType = "confirm",
}: ActionModalProps) => {
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
        <button
          onClick={onConfirm}
          className={`py-2 px-5 flex justify-center gap-5 items-center rounded-full ${
            actionType === "danger" ? "bg-red-500" : "bg-[#00a3f5]"
          } text-white font-medium`}
        >
          {isLoading ? <AiOutlineLoading className="h-4 w-4 animate-spin" /> : null}
          <span className="text-sm"> {actionTitle}</span>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionModal;
