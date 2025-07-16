import React, { useState, useEffect } from "react";
import { Candidate } from "../types";

interface Props {
  isOpen: boolean;
  candidate: Candidate | null;
  onSave: (candidate: Candidate) => void;
  onClose: () => void;
}

const SidePanel: React.FC<Props> = ({ isOpen, candidate, onSave, onClose }) => {
  const [formData, setFormData] = useState<Candidate>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "skills" | "experience">(
    "basic"
  );

  useEffect(() => {
    if (candidate) {
      setFormData(candidate);
    } else {
      setFormData({
        id: 0,
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: "",
      });
    }
    setErrors({});
    setActiveTab("basic");
  }, [candidate]);

  const isValidEmail = (email: string): boolean => {
    email = email.trim();
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;
    
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    
    const [local, domain] = parts;
    
    if (local.length === 0 || local.length > 64) return false;
    if (local.startsWith('.') || local.endsWith('.')) return false;
    if (local.includes('..')) return false;
    
    if (domain.length === 0 || domain.length > 255) return false;
    if (domain.startsWith('.') || domain.endsWith('.')) return false;
    if (domain.includes('..')) return false;
    
    return true;
  };

  const validateStep = (): boolean => {
    let newErrors: Record<string, string> = {};
    
    if (activeTab === "basic") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    }
    
    if (activeTab === "skills") {
      if (!formData.skills.trim())
        newErrors.skills = "At least one skill is required";
    }
    
    if (activeTab === "experience") {
      if (formData.experience.trim() === "") {
        newErrors.experience = "Experience is required";
      } else {
        const expNum = Number(formData.experience);
        if (isNaN(expNum) || expNum < 0 || expNum > 50)
          newErrors.experience = "Please enter a valid number between 0 and 50";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "experience") {

      // Only allow empty or numbers 0–50  for Experience 

      if (value === "" || (/^\d{0,2}$/.test(value) && Number(value) <= 50)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (name === "phone") {

      // Allow only digits and restrict to 10 characters 

      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (activeTab === "basic") setActiveTab("skills");
    else if (activeTab === "skills") setActiveTab("experience");
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1000));

    onSave({
      ...formData,
      id: candidate ? candidate.id : Date.now(),
    });

    if (!candidate) {
      setFormData({
        id: 0,
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: "",
      });
    }
    setIsSubmitting(false);
    setActiveTab("basic");
    onClose();
  };

  const skillsArray = formData.skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s);

  const stepProgress = {
    basic: 33,
    skills: 66,
    experience: 100,
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl transition-transform duration-500 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {candidate ? "Edit Candidate" : "Add New Candidate"}
                </h2>
                <p className="text-blue-100 text-sm">
                  {candidate
                    ? "Update candidate information"
                    : "Fill in the details below"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Complete Profile</span>
            <span className="text-blue-600 font-semibold">
              {stepProgress[activeTab]}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stepProgress[activeTab]}%` }}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4 border-b bg-white">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: "basic", label: "Basic Info", icon: "👤" },
              { id: "skills", label: "Skills", icon: "🎯" },
              { id: "experience", label: "Experience", icon: "💼" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technical Skills *
                </label>
                <div className="relative">
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Enter skills separated by commas (e.g., React, TypeScript, Node.js)"
                    rows={4}
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.skills
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <div className="absolute left-4 top-4">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                </div>
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                )}
              </div>

              {skillsArray.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Skills Preview
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skillsArray.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work Experience (Years) *
                </label>
                <div className="relative">
                  <input
                    name="experience"
                    type="number"
                    min={0}
                    max={50}
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Enter years of experience (0-50)"
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.experience
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex space-x-3">
            <button
              onClick={() => {
                if (activeTab === "basic") {
                  onClose();
                } else if (activeTab === "skills") {
                  setActiveTab("basic");
                } else if (activeTab === "experience") {
                  setActiveTab("skills");
                }
              }}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              {activeTab === "basic" ? "Cancel" : "Previous"}
            </button>

            {activeTab !== "experience" && (
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg text-white transition-all duration-200"
              >
                Next
              </button>
            )}

            {activeTab === "experience" && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Saving...</span>
                  </span>
                ) : (
                  `${candidate ? "Update" : "Save"} Candidate`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;