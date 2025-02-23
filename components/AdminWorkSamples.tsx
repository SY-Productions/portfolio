import React, { useState } from "react";
import db from "@/public/db.json";

interface WorkSample {
  id: number;
  faTitle: string;
  enTitle: string;
  faDescription: string;
  enDescription: string;
  pictures: string;
  link: string;
  technologys: string;
  faStartDate: string;
  enStartDate: string;
  faEndDate: string;
  enEndDate: string;
}

const AdminWorkSample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workSamples, setWorkSamples] = useState<any[]>(db.WorkSmaples || []);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({
    faTitle: "",
    enTitle: "",
    faDescription: "",
    enDescription: "",
    pictures: "", // Now a string for pictures
    link: "",
    technologys: "",
    faStartDate: "",
    enStartDate: "",
    faEndDate: "",
    enEndDate: "",
  });

  // Toggle Modal
  const toggleModal = (item: any | null = null) => {
    setSelectedItem(item);
    setFormData(
      item || {
        faTitle: "",
        enTitle: "",
        faDescription: "",
        enDescription: "",
        pictures: "", // Initialize with empty string for pictures
        link: "",
        technologys: "",
        faStartDate: "",
        enStartDate: "",
        faEndDate: "",
        enEndDate: "",
      }
    );
    setIsModalOpen(!isModalOpen);
  };

  // Handle Form Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePaths = Array.from(files)
        .map((file) => `/portfolio/${file.name}`) // Generate file path as string
        .join(" "); // Join paths with space
      setFormData((prevState: any) => ({
        ...prevState,
        pictures: filePaths, // Set pictures as space-separated file paths
      }));
    }
  };

  // Handle Add Work Sample
  const handleAddItem = () => {
    const newItem = {
      id: workSamples.length + 1,
      ...formData,
    };
    setWorkSamples((prevState) => [...prevState, newItem]);
    toggleModal();
    // Save to db.json (simulate)
    db.WorkSmaples.push(newItem); // Simulate saving to db
    console.log("Updated db:", db);
  };

  // Handle Edit Work Sample
  const handleEditItem = () => {
    const updatedItem = { ...selectedItem, ...formData };
    setWorkSamples((prevState) =>
      prevState.map((item) =>
        item.id === selectedItem.id ? updatedItem : item
      )
    );
    toggleModal();
    // Update db.json (simulate)
    const updatedDb = db.WorkSmaples.map((item: any) =>
      item.id === selectedItem.id ? updatedItem : item
    );
    db.WorkSmaples = updatedDb; // Simulate saving to db
    console.log("Updated db:", db);
  };

  // Handle Delete Work Sample
  const handleDeleteItem = (id: number) => {
    const updatedWorkSamples = workSamples.filter((item) => item.id !== id);
    setWorkSamples(updatedWorkSamples);
    // Remove from db.json (simulate)
    db.WorkSmaples = updatedWorkSamples; // Simulate removing from db
    console.log("Updated db:", db);
  };

  return (
    <div>
      {/* Work Samples List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Manage Work Samples
        </h2>
        <div className="space-y-4">
          {workSamples.map((sample) => (
            <div key={sample.id} className="bg-white shadow p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{sample.enTitle}</h3>
              <p className="text-sm text-gray-500">{sample.enDescription}</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => toggleModal(sample)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => handleDeleteItem(sample.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Button to add new Work Sample */}
        <button
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={toggleModal}
        >
          Add New Work Sample
        </button>
      </div>

      {/* Modal for adding/editing a Work Sample */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedItem ? "Edit Work Sample" : "Add Work Sample"}
            </h2>

            {/* Work Sample Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.enTitle}
                  onChange={handleChange}
                  name="enTitle"
                  placeholder="English Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.enDescription}
                  onChange={handleChange}
                  name="enDescription"
                  placeholder="English Description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.link}
                  onChange={handleChange}
                  name="link"
                  placeholder="Link to the work"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Technologies
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.technologys}
                  onChange={handleChange}
                  name="technologys"
                  placeholder="Technologies used"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.faStartDate}
                  onChange={handleChange}
                  name="faStartDate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.faEndDate}
                  onChange={handleChange}
                  name="faEndDate"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Pictures
                </label>
                <input
                  type="file"
                  multiple
                  name="pictures"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Current pictures: {formData.pictures}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={selectedItem ? handleEditItem : handleAddItem}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {selectedItem ? "Update" : "Add"} Item
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWorkSample;
