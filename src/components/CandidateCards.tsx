import React, { useState } from "react";
import { Candidate } from "../types";

interface Props {
  candidates: Candidate[];
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: number) => void;
}

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidateName: string;
}> = ({ isOpen, onClose, onConfirm, candidateName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Delete Candidate
        </h3>

        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete <strong>{candidateName}</strong>? This
          action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessMessage: React.FC<{
  isVisible: boolean;
  message: string;
  onClose: () => void;
}> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Success!
        </h3>

        <p className="text-gray-600 text-center mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const CandidateCards: React.FC<Props> = ({ candidates, onEdit, onDelete }) => {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    candidateId: number;
    candidateName: string;
  }>({
    isOpen: false,
    candidateId: 0,
    candidateName: "",
  });

  const [successMessage, setSuccessMessage] = useState<{
    isVisible: boolean;
    message: string;
  }>({
    isVisible: false,
    message: "",
  });

  const handleDeleteClick = (candidate: Candidate) => {
    setDeleteModal({
      isOpen: true,
      candidateId: candidate.id,
      candidateName: candidate.name,
    });
  };

  const handleConfirmDelete = () => {
    onDelete(deleteModal.candidateId);
    setDeleteModal({ isOpen: false, candidateId: 0, candidateName: "" });

    setSuccessMessage({
      isVisible: true,
      message: `${deleteModal.candidateName} has been successfully deleted.`,
    });
  };

  const handleEditClick = (candidate: Candidate) => {
    onEdit(candidate);

    setSuccessMessage({
      isVisible: true,
      message: `${candidate.name}'s profile has been updated successfully.`,
    });
  };

  const closeSuccessMessage = () => {
    setSuccessMessage({ isVisible: false, message: "" });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, candidateId: 0, candidateName: "" });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="relative group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:border-blue-200/50 transition-all duration-300 hover:scale-105"
          >
            {/* Header Section */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-xl text-gray-900 truncate">
                  {c.name}
                </h2>
                <p className="text-sm text-gray-500">Software Developer</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {c.email}
                  </p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{c.phone}</p>
                  <p className="text-xs text-gray-500">Phone</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Skills
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {c.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-orange-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Experience
                </span>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200/50">
                <p className="text-sm font-medium text-orange-900">
                  {c.experience}
                </p>
                <p className="text-xs text-orange-600">
                  Professional Experience
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleEditClick(c)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 group-hover:from-blue-700 group-hover:to-indigo-700"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Edit Profile</span>
                </span>
              </button>
              <button
                onClick={() => handleDeleteClick(c)}
                className="w-12 h-10 bg-red-100 hover:bg-red-200 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        candidateName={deleteModal.candidateName}
      />

      {/* Success Message */}
      <SuccessMessage
        isVisible={successMessage.isVisible}
        message={successMessage.message}
        onClose={closeSuccessMessage}
      />
    </>
  );
};

export default CandidateCards;
