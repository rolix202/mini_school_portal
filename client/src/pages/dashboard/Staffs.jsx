import React, { useState, useEffect } from "react";
import customFetch from "../../../utils/customFetch";
import handleServerError from "../../../utils/handleServerError";
import { Form, Link, useLoaderData } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

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
  const [staffData, setStaffData] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [staffInputForm, setStaffInputForm] = useState({
    fullName: "",
    staffClass: "",
    email: "",
    phoneNo: "",
    role: "",
    subject: "",
  });

  const getAllStaff = async () => {
    try {
      const data = await customFetch.get("/staff");
      setStaffData(data?.data?.data);
    } catch (error) {
      handleServerError(error);
      return;
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const staffs = staffData?.staffs || [];

  const handleDelete = (staffId) => {
    setSelectedStaffId(staffId);
    setOpenDelete(true);
  };

  const handleUpdate = (staff) => {
    setSelectedStaffId(staff._id);
    setStaffInputForm({
      fullName: staff.fullName,
      staffClass: staff.staffClass,
      email: staff.email,
      phoneNo: staff.phoneNo,
      role: staff.role,
      subject: staff.subject,
    });
  };

  const handleDeleteStaffConfirm = async () => {
    try {
      await customFetch.delete(`/staff/${selectedStaffId}`);
      toast.success("Staff Deleted Successfully!");

      setStaffData((prevStaffs) => {
        return {
          ...prevStaffs,
          staffs: prevStaffs.staffs.filter(
            (staff) => staff._id !== selectedStaffId
          ),
        };
      });
    } catch (error) {
      handleServerError(error);
      return;
    } finally {
      setOpenDelete(false);
    }
  };

  const handleStaffInputUpdate = (e) => {
    const { name, value } = e.target;
    setStaffInputForm((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const submitFormInput = async (e) => {
    e.preventDefault();

    if (!staffInputForm.subject || !staffInputForm.role) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      const updatedStaff = await customFetch.patch(
        `staff/${selectedStaffId}`,
        staffInputForm
      );

      getAllStaff();

      toast.success("Staff information Updated Successfully");
    } catch (error) {
      handleServerError(error);
      return;
    } finally {
      setOpenUpdate(false);
    }
  };

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
                    <td className="px-4 py-2">{staff.staffClass || "---"} </td>
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
                          // to={`/dashboard/staff/${staff._id}`}
                          onClick={() => {
                            setOpenUpdate(true);
                            handleUpdate(staff);
                          }}
                          className="bg-blue-500 inline-block cursor-pointer hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </Link>
                      </span>
                      <span className="">
                        <Link
                          onClick={() => {
                            setOpenDelete(true);
                            handleDelete(staff._id);
                          }}
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

        {/* Modal for Deleting staff */}
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <div className="text-center w-56 mx-auto">
            <TrashIcon className="h-20 w-20 mx-auto text-red-500" />

            <div className="mx-auto my-4 w-56">
              <h3 className="text-2xl font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-base text-gray-500">
                Are you sure you want to delete this Staff?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="btn btn-danger w-full"
                onClick={() => handleDeleteStaffConfirm(selectedStaffId)}
              >
                Delete
              </button>

              <button
                className="btn btn-light w-full"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Update Modal */}

        <Modal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          update={true}
        >
          {staffs && (
            <div className="relative">
              <Form method="post" id="form" onSubmit={submitFormInput}>
                <div className="w-full lg:p-5 space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Update Staff Info.
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Name, Email, Phone number can't be edited!
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={staffInputForm.fullName}
                            onChange={handleStaffInputUpdate}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phoneNo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone No.
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="phoneNo"
                            id="phoneNo"
                            value={staffInputForm.phoneNo}
                            onChange={handleStaffInputUpdate}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={staffInputForm.email}
                            onChange={handleStaffInputUpdate}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Subject
                        </label>
                        <div className="mt-2">
                          <select
                            id="subject"
                            name="subject"
                            value={staffInputForm.subject}
                            onChange={handleStaffInputUpdate}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">Choose subject ...</option>
                            <option>English</option>
                            <option>Mathematics</option>
                            <option>Biology</option>
                            <option>Civic Education</option>
                            <option>Data Processing</option>
                            <option>Government</option>
                            <option>C.R.K</option>
                            <option>Economics</option>
                            <option>Commerce</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Role
                        </label>
                        <div className="mt-2">
                          <select
                            name="role"
                            id="role"
                            value={staffInputForm.role}
                            onChange={handleStaffInputUpdate}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">Choose role ... </option>
                            <option value="admin">Admin</option>
                            <option value="class_teacher">Class Teacher</option>
                            <option value="subject_teacher">
                              Subject Teacher
                            </option>
                          </select>
                        </div>
                      </div>

                      {staffData && staffInputForm.role === "class_teacher" && (
                        <div className="sm:col-span-3">
                        <label
                          htmlFor="staffClass"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Class
                        </label>
                        <div className="mt-2">
                          <select
                            name="staffClass"
                            id="staffClass"
                            value={staffInputForm.staffClass}
                            onChange={handleStaffInputUpdate}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">Select class ...</option>
                            <option value="JSS_1 Platinum">
                              JSS_1 Platinum
                            </option>
                            <option value="JSS_1 Rose">JSS_1 Rose</option>
                            <option value="JSS_1 Galaxy">JSS_1 Galaxy</option>

                            <option value="JSS_2 Rose">JSS_2 Rose</option>
                            <option value="JSS_2 Galaxy">JSS_2 Galaxy</option>

                            <option value="JSS_3 Rose">JSS_3 Rose</option>
                            <option value="JSS_3 Galaxy">JSS_3 Galaxy</option>

                            <option value="SS_1 Platinum">SS_1 Platinum</option>
                            <option value="SS_1 Galaxy">SS_1 Galaxy</option>

                            <option value="SS_2 Platinum">SS_2 Platinum</option>
                            <option value="SS_2 Galaxy">SS_2 Galaxy</option>

                            <option value="SS_3 Platinum">SS_3 Platinum</option>
                            <option value="SS_3 Galaxy">SS_3 Galaxy</option>
                          </select>
                        </div>
                      </div>
                      )}
                      
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenUpdate(false);
                      }}
                      className="btn btn-light w-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Modal>
      </main>
    </div>
    
  );
};

export default Staffs;
