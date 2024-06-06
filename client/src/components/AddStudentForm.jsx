import React from "react";
import { areasAndSubjects } from "../../utils/constants";
import AddStudentFormInput from "./AddStudentFormInput";

const AddStudentForm = () => {
  return (
    <form>
      <div className="w-full mx-auto space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Student Information
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">

              <AddStudentFormInput 
                label= "fullName"
                displayText = "Full Name"
                placeholder = "Type student name ..."
                type= "text"
                required= "required"
              />

             
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Class Section
              </label>
              <div className="mt-2">
                <select
                  id="classType"
                  name="classType"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Class Section ...</option>
                  <option value="junior secondary">Junior Secondary</option>
                  <option value="senior secondary">Senior Secondary</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="class"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Class
              </label>
              <div className="mt-2">
                <select
                  id="studentClass"
                  name="studentClass"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Class ...</option>
                  <option value="SS_1 Galaxy">SS_1 Galaxy</option>
                  <option value="SS_1 Platinum">SS_1 Platinum</option>
                  <option value="SS_2 Galaxy">SS_2 Galaxy</option>
                  <option value="SS_2 Platinum">SS_2 Platinum</option>
                  <option value="SS_3 Galaxy">SS_3 Galaxy</option>
                  <option value="SS_3 Platinum">SS_3 Platinum</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="area"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Area
              </label>
              <div className="mt-2">
                <select
                  id="area"
                  name="area"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Choose subject area ...</option>

                  <option>Sciences</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="subjects"
                className="block text-sm font-medium leading-6 text-red-800"
              >
                Select Subjects for Student :
              </label>
              <div className="mt-2 flex flex-wrap">
                <label className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    name="subjects"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2">roland</span>
                </label>
              </div>
            </div>
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
    </form>
  );
};

export default AddStudentForm;
