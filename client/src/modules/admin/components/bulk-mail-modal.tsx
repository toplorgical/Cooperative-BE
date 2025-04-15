import MessageRepository from "@/repository/messageRepository";
import ErrorService from "@/services/errorService";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  subject: Yup.string().required(),
  message: Yup.string().required(),
});

const initialValues = {
  subject: "",
  message: "",
  usersQuery: {
    isActive: false,
    isInactive: false,
    isVerified: false,
    isUnverified: false,
    isBanned: false,
  },
  loansQuery: {
    pending: false,
    approved: false,
    rejected: false,
    canceled: false,
  },
};

const BulkMailModal = ({ isOpen, onClose }: ModalProps) => {
  const mutation = useMutation({
    mutationFn: (data: any) => MessageRepository.sendMessage(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      onClose();
      toast.success("Message sent successfully...");
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (data) => mutation.mutate(data),
  });

  const values = formik.values;
  const errors = formik.errors;
  return (
    <Modal show={isOpen} onClose={onClose} size={"lg"}>
      <Modal.Header>Send Email</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="subject" value="Subject *" />
            </div>
            <TextInput
              id="subject"
              type="text"
              placeholder=""
              name="subject"
              onChange={formik.handleChange}
              value={values.subject}
            />
            {errors?.subject && <p className="text-red-500 text-sm mt-2">{errors?.subject}</p>}
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="message" value="Message *" />
            </div>
            <Textarea
              id="message"
              placeholder="Leave a comment..."
              required
              rows={4}
              name="message"
              onChange={formik.handleChange}
              value={values.message}
            />
            {errors?.message && <p className="text-red-500 text-sm mt-2">{errors?.message}</p>}
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="recipients" value="Recipients *" />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="allUsers"
                  name="usersQuery"
                  onChange={(e) => {
                    formik.setFieldValue("usersQuery", {
                      isActive: e.target.checked,
                      isInactive: e.target.checked,
                      isVerified: e.target.checked,
                      isUnverified: e.target.checked,
                      isBanned: e.target.checked,
                    });
                    formik.setFieldValue("loansQuery", {
                      pending: e.target.checked,
                      approved: e.target.checked,
                      rejected: e.target.checked,
                      canceled: e.target.checked,
                    });
                  }}
                />
                <Label htmlFor="allUsers">All Users</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="verifiedUsers"
                  name="usersQuery.isVerified"
                  checked={values.usersQuery.isVerified}
                  onChange={(e) => formik.setFieldValue("usersQuery.isVerified", e.target.checked)}
                />
                <Label htmlFor="verifiedUsers">Verified Users</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="unVerifiedUsers"
                  name="usersQuery.isUnerified"
                  checked={values.usersQuery.isUnverified}
                  onChange={(e) => formik.setFieldValue("usersQuery.isUnverified", e.target.checked)}
                />
                <Label htmlFor="unVerifiedUsers">Unverified Users</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="activeUsres"
                  name="usersQuery.isActive"
                  checked={values.usersQuery.isActive}
                  onChange={(e) => formik.setFieldValue("usersQuery.isActive", e.target.checked)}
                />
                <Label htmlFor="activeUsres">Active Users</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="inactiveUsers"
                  name="usersQuery.isInactive"
                  checked={values.usersQuery.isInactive}
                  onChange={(e) => formik.setFieldValue("usersQuery.isInactive", e.target.checked)}
                />
                <Label htmlFor="inactiveUsers">Inactive Users</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="bannedUsers"
                  name="usersQuery.isBanned"
                  checked={values.usersQuery.isBanned}
                  onChange={(e) => formik.setFieldValue("usersQuery.isBanned", e.target.checked)}
                />
                <Label htmlFor="bannedUsers">Banned Users</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="pendingLoans"
                  name="loansQuery.pending"
                  checked={values.loansQuery.pending}
                  onChange={(e) => formik.setFieldValue("loansQuery.pending", e.target.checked)}
                />
                <Label htmlFor="pendingLoans">Pending Loans</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="approved"
                  name="loansQuery.approved"
                  checked={values.loansQuery.approved}
                  onChange={(e) => formik.setFieldValue("loansQuery.approved", e.target.checked)}
                />
                <Label htmlFor="approved">Approved Loans</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="rejectedLoans"
                  name="loansQuery.rejected"
                  checked={values.loansQuery.rejected}
                  onChange={(e) => formik.setFieldValue("loansQuery.rejected", e.target.checked)}
                />
                <Label htmlFor="rejectedLoans">Rejected Loans</Label>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="cancelledLoans"
                  name="loansQuery.canceled"
                  checked={values.loansQuery.canceled}
                  onChange={(e) => formik.setFieldValue("loansQuery.canceled", e.target.checked)}
                />
                <Label htmlFor="cancelledLoans">Cancelled Loans</Label>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-5">
        <Button color="gray" outline onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => formik.handleSubmit()} className="bg-blue-700 flex justify-center items-center">
          {mutation.isPending ? <AiOutlineLoading className="mr-2 h-6 w-6 animate-spin text-white" /> : null}
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkMailModal;
