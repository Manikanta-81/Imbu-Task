import React from "react";
import { Candidate } from "../types";

interface Props {
  candidates: Candidate[];
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: number) => void;
}

const CandidateTable: React.FC<Props> = ({ candidates, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Skills
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Experience
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((c) => (
            <tr
              key={c.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {c.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {c.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {c.phone}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="max-w-xs truncate" title={c.skills}>
                  {c.skills}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="max-w-xs truncate" title={c.experience}>
                  {c.experience}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center space-x-3">
                <button
                  onClick={() => onEdit(c)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
