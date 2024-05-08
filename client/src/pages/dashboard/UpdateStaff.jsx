import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import handleServerError from "../../../utils/handleServerError";

const UpdateStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [staffData, setStaffData] = useState({
    fullName: "",
    staffClass: "",
    email: "",
    phoneNo: "",
    role: "",
    subject: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customFetch.get(`/staff/${id}`);
        const { staff } = data?.data?.data;

        // const updateStaff = {
        //   ...staff,
        //   staffClass: staff.role === "subject_teacher" ? '' : staff.staffClass
        // }

        setStaffData(staff);

      } catch (error) {
        console.log("Could not fetch staff details", error);
      }
    };

    fetchData();
  }, [id]);

  const staffDataInputs = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  

  const handleStaffDataSubmission = async(e) => {
    e.preventDefault();

    if (!staffData.subject || !staffData.role){
      toast.error("Please fill out all required fields")
      return
    }
    
    try {
      await customFetch.patch(`staff/${id}`, staffData)
      toast.success("Staff information Updated Successfully")
      navigate('/dashboard/staffs')
    } catch (error) {
      handleServerError(error)
      return
    }
    
  }

  return (
    <div className="wrapper">
      <div className="relative isolate px-6 lg:px-8">
        <Form method="post" id="form" onSubmit={handleStaffDataSubmission}>
          {staffData && (
            <div className="w-full lg:w-1/2 lg:p-20 space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
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
                        value={staffData.fullName}
                        onChange={staffDataInputs}
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
                        value={staffData.phoneNo}
                        onChange={staffDataInputs}
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
                        value={staffData.email}
                        onChange={staffDataInputs}
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
                        value={staffData.subject}
                        onChange={staffDataInputs}
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
                        value={staffData.role}
                        onChange={staffDataInputs}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Choose role ... </option>
                        <option value="admin">Admin</option>
                        <option value="class_teacher">Class Teacher</option>
                        <option value="subject_teacher">Subject Teacher</option>
                      </select>
                    </div>
                  </div>
                  

                  {staffData && staffData.role === "class_teacher" && (
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="class"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Class
                      </label>
                      <div className="mt-2">
                        <select
                          name="staffClass"
                          id="class"
                          value={staffData.staffClass}
                          onChange={staffDataInputs}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="">Select class ...</option>
                          <option value="JSS_1 Platinum">JSS_1 Platinum</option>
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
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UpdateStaff;
