import React, { useState, useEffect } from "react";
import customFetch from "../../../utils/customFetch";
import handleServerError from "../../../utils/handleServerError";
import { Link, useLoaderData } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../../components/Modal";

// export const loader = async () => {
//   try {
//     const data = await customFetch.get("/staff");
//     return data;
//   } catch (error) {
//     handleServerError(error);
//     return error;
//   }
// };

const Staffs = () => {
  // const { data } = useLoaderData();
  const [staffData, setStaffData] = useState(null)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getAllStaff() {
      try {
        const data = await customFetch.get("/staff")
        setStaffData(data?.data?.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    getAllStaff();
  }, []);

  const staffs = staffData?.staffs || [];
    

  return (
    <div className="student_container">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            List of Staffs
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-300 border-b-2 border-gray-300 text-left">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone No.</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => {
                const fullName = staff.fullName
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                  .join(" ");

                const staffRole = staff.role
                  .split("_")
                  .map((role) => role.charAt(0).toUpperCase() + role.slice(1))
                  .join(" ");

                const roleClassXl =
                  staff.role === "admin"
                    ? "xl:bg-red-400"
                    : staff.role === "subject_teacher"
                    ? "xl:bg-green-400"
                    : staff.role === "class_teacher"
                    ? "xl:bg-yellow-500"
                    : "";
                const roleClass =
                  staff.role === "admin"
                    ? "text-red-400"
                    : staff.role === "subject_teacher"
                    ? "text-green-400"
                    : staff.role === "class_teacher"
                    ? "text-yellow-500"
                    : "";

                const trClassName = index % 2 === 0 ? "bg-white" : "bg-gray-50";

                return (
                  <tr key={index} className={trClassName}>
                    <td className="px-4 py-2">{index + 1} </td>
                    <td className="px-4 py-2">{fullName} </td>
                    <td className="px-4 py-2">{staff.phoneNo} </td>
                    <td className="px-4 py-2">{staff.email} </td>
                    <td className="px-4 py-2">{staff.subject} </td>
                    <td className="px-4 py-2">{staff.staffClass} </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-3xl xl:text-white ${roleClassXl} ${roleClass}`}
                      >
                        {staffRole}
                      </span>
                    </td>
                    <td>
                      <span className="mr-2">
                        <Link
                          to={`/dashboard/staff/${staff._id}`}
                          className="bg-blue-500 inline-block cursor-pointer hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </Link>
                      </span>
                      <span className="">
                        <Link
                          onClick={() => setOpen(true)}
                          className="bg-red-500 inline-block cursor-pointer hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </Link>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal for Editing staff */}

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="text-center w-56 mx-auto">
            <TrashIcon className="h-20 w-20 mx-auto text-red-500" />

            <div className="mx-auto my-4 w-56">
              <h3 className="text-2xl font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-base text-gray-500">
                Are you sure you want to delete this item?
              </p>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-danger w-full">Delete</button>
              <button
                className="btn btn-light w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default Staffs;

// const toggleDeleteFunction(){

// }
