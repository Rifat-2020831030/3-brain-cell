import OrgTable from "../../components/OrgTable";

const OrgManagement = () => {
return (
    <div>

        <div className="border-1 border-gray-300 rounded-lg shadow-xl p-5">
            <p className="text-4xl font-bold text-gray-800 text-center my-5">Organization Joining Request</p>
            <OrgTable />
        </div>
    </div>
);
}
export default OrgManagement;