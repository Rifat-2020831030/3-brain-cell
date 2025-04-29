import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../../shared/components/Button";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { editDisaster } from "../data/DisasterMangement";

const EditDialog = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const response = editDisaster(initialData.disaster_id, formData);
    setLoading(false);
    response.status === "success" && setFormData(response.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
      {loading && <LoadingScreen />}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Disaster
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-4 py-2 rounded-md"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;

EditDialog.propTypes = {
  initialData: PropTypes.shape({
    disaster_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
