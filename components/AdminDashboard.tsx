import React, { useState } from "react";
import AdminWorkSample from "./AdminWorkSamples";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "WorkSamples" | "Educations" | "Events" | "Portfolio" | null
  >(null);

  const toggleModal = (
    section: "WorkSamples" | "Educations" | "Events" | "Portfolio" | null
  ) => {
    setActiveSection(section);
    setIsModalOpen(!isModalOpen);
  };

  const handleAddItem = (section: string) => {
    console.log(`Add item to ${section}`);
    setIsModalOpen(false); // Close the modal after submitting
  };

  const handleEditItem = (section: string) => {
    // Handle the logic to edit an item in the selected section
    console.log(`Edit item in ${section}`);
    setIsModalOpen(false); // Close the modal after submitting
  };

  return (
    <div className="min-h-screen bg-gray-100 p-20">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Dashboard Card 1: Work Samples */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-indigo-100"
                onClick={() => toggleModal("WorkSamples")}
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  Work Samples
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Manage and edit work samples
                </p>
              </div>
            </div>

            {/* Dashboard Card 2: Education */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-indigo-100"
                onClick={() => toggleModal("Educations")}
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  Education
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Add or update education records
                </p>
              </div>
            </div>

            {/* Dashboard Card 3: Events */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-indigo-100"
                onClick={() => toggleModal("Events")}
              >
                <h2 className="text-lg font-semibold text-gray-900">Events</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Create and manage events
                </p>
              </div>
            </div>

            {/* Dashboard Card 4: Portfolio */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-indigo-100"
                onClick={() => toggleModal("Portfolio")}
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  Portfolio
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Manage your portfolio projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding/editing items */}
      {isModalOpen && activeSection == "WorkSamples" && <AdminWorkSample />}
    </div>
  );
};

export default AdminDashboard;
