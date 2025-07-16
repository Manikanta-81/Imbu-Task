import React, { useEffect, useState } from "react";
import { Candidate } from "../types";
import CandidateTable from "../components/CandidateTable";
import CandidateCards from "../components/CandidateCards";
import SidePanel from "../components/SidePanel";

const CandidateManager: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem("candidates");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Mahesh",
            email: "mahesh@example.com",
            phone: "7894561233",
            skills: "React, TypeScript",
            experience: "2",
          },
          {
            id: 2,
            name: "Mukesh Semi",
            email: "mukesh@example.com",
            phone: "9876543210",
            skills: "Node.js, Express",
            experience: "3",
          },
          {
            id: 3,
            name: "Root james",
            email: "rootjames@example.com",
            phone: "8529637411",
            skills: "Angular, RxJS",
            experience: "4",
          },
          {
            id: 4,
            name: "Ayesha Khan",
            email: "ayesha@example.com",
            phone: "9988776655",
            skills: "Vue, JavaScript",
            experience: "2.5 ",
          },
          {
            id: 5,
            name: "Suresh S",
            email: "suresh@example.com",
            phone: "9514523692",
            skills: "React Native",
            experience: "1",
          },
        ];
  });

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  const addCandidate = (candidate: Candidate) => {
    setCandidates([...candidates, { ...candidate, id: Date.now() }]);
    setNotification("New candidate added successfully");
  };

  const updateCandidate = (updated: Candidate) => {
    setCandidates(candidates.map((c) => (c.id === updated.id ? updated : c)));
    setNotification("Candidate updated successfully");
  };

  const deleteCandidate = (id: number) => {
    setCandidates(candidates.filter((c) => c.id !== id));
    setNotification("Candidate deleted successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Candidate Management
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your talent pipeline
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCandidate(null);
                setIsPanelOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add Candidate</span>
              </span>
            </button>
          </div>
        </nav>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Candidates
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {candidates.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-semibold text-gray-900">
                  Candidate Directory
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and review all candidate profiles
                </p>
              </div>
              <div className="p-6">
                <CandidateTable
                  candidates={candidates}
                  onEdit={(c) => {
                    setSelectedCandidate(c);
                    setIsPanelOpen(true);
                  }}
                  onDelete={deleteCandidate}
                />
              </div>
            </div>

            {/* Cards */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-semibold text-gray-900">
                  Candidate Cards
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Visual overview of candidate profiles
                </p>
              </div>
              <div className="p-6">
                <CandidateCards
                  candidates={candidates}
                  onEdit={(c) => {
                    setSelectedCandidate(c);
                    setIsPanelOpen(true);
                  }}
                  onDelete={deleteCandidate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 transform transition-all duration-300">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400/20">
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5"
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
              <span className="font-medium">{notification}</span>
            </div>
          </div>
        </div>
      )}

      {/* Side Panel */}
      <SidePanel
        isOpen={isPanelOpen}
        candidate={selectedCandidate}
        onSave={(c) => {
          const isDuplicate = candidates.some(
            (existing) =>
              (existing.email === c.email || existing.phone === c.phone) &&
              existing.id !== c.id
          );

          if (isDuplicate) {
            alert("Candidate with same email or phone already exists.");
            return;
          }

          selectedCandidate ? updateCandidate(c) : addCandidate(c);
          setIsPanelOpen(false);
        }}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

export default CandidateManager;
