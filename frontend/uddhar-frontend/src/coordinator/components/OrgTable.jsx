import { Check, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrgList, approveOrg } from "../data/OrgManagement";
import OrgDetailOverlay from "./OrgDetailOverlay";
import { toast } from 'sonner';

const OrgTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrgList();
      response.status && setData(response.data);
      !response.status && console.log(response.message);
    };
    fetchData();
  }, []);

  // Filter and search logic using the helper for status label
  const filteredData = data
    .filter(
      (org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.sector.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((org) => {
      if (statusFilter === "all") return true;
      return org.status === statusFilter;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Now set status using boolean
  const handleStatusChange = async (id, newStatus) => {
    const response = await approveOrg(id, newStatus);
    if (response.status === "success") {
      toast.success(`Organization ${newStatus} successfully!`);
      setData((prevData) =>
        prevData.map((org) =>
          org.id === id ? { ...org, status: newStatus } : org
        )
      );
      return;
    }
    toast.error(response.message || "Failed to perform operation.");
  };

  const statusClasses = {
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div className="w-full p-4 space-y-4">
      {/* Search and Filter Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name, type, or sector..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value.toLowerCase())}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((org) => {
              const statusClass = statusClasses[org.status] || statusClasses.pending;
              return (
                <tr
                  key={org.id}
                  onClick={() => setSelectedItem(org)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{org.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{org.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${statusClass}`}
                    >
                      {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        disabled={org.status === "approved"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(org.id, "approved");
                        }}
                        className="p-1 rounded-full hover:bg-green-100"
                      >
                        <Check className="h-4 w-4 text-green-600 cursor-pointer" />
                      </button>
                      <button
                        disabled={org.status === "rejected"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(org.id, "rejected");
                        }}
                        className="p-1 rounded-full hover:bg-red-100"
                      >
                        <X className="h-4 w-4 text-red-600 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <select
          className="border rounded-md px-4 py-2"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedItem && (
        <OrgDetailOverlay
          org={selectedItem}
          onClose={() => setSelectedItem(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default OrgTable;
