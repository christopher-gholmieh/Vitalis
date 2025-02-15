// Written by: Christopher Gholmieh
// Imports:

// Columns:
import { columns } from "./columns";

// Sidebar:
import Sidebar from "./sidebar";

// Table:
import { DataTable } from "./data-table";

// Data:
import patient_data from "./data";


// Page:
const Page = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />

            <div className="w-full h-full">
                <div className="w-full px-12 py-2">
                    <DataTable columns={columns} data={patient_data} />
                </div>
            </div>
        </div>
    )
}

// Exports:
export default Page;