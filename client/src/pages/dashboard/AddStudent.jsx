import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import handleServerError from "../../../utils/handleServerError";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { areasAndSubjects } from "../../../utils/constants";

const AddStudent = () => {
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    classType: "",
    studentClass: "",
  });
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleFormDetails = (e) => {
    setFormDetails((prevFormDetails) => {
      return {
        ...prevFormDetails,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAreaChange = (event) => {
    const area = event.target.value;
    setSelectedArea(area);
    setSelectedSubjects([]); // Reset selected subjects when area changes
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    const isChecked = event.target.checked;

    setSelectedSubjects((prevSelectedSubjects) => {
      if (isChecked) {
        return [...prevSelectedSubjects, selectedSubject];
      } else {
        return prevSelectedSubjects.filter(
          (subject) => subject !== selectedSubject
        );
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedSubjects.length === 0) {
      toast.error("Select at least 5 subjects for the student");
      return;
    }

    if (
      !formDetails.fullName ||
      !formDetails.studentClass ||
      !formDetails.classType ||
      !selectedArea ||
      !selectedSubjects
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = {
      name: formDetails.fullName,
      classType: formDetails.classType,
      studentClass: formDetails.studentClass,
      subjectArea: selectedArea,
      assignedSubjects: selectedSubjects,
    };

    try {
      await customFetch.post("/students", formData);

      toast.success("Student added Successfully");

      setFormDetails({
        fullName: "",
        classType: "",
        studentClass: "",
      });
      setSelectedArea("");
      setSelectedSubjects([]);
    } catch (error) {
      handleServerError(error);
      return error;
    }
  };

  return (
    <div className="addStudent_containe">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add New Student
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="relative isolate px-6 lg:px-8">
            <Form onSubmit={handleSubmit}>
              <div className="w-full lg:w-2/3 mx-auto lg:p-20 space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Student Information
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
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
                          required
                          value={formDetails.fullName}
                          onChange={handleFormDetails}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 required:"
                        />
                      </div>
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
                          value={formDetails.classType}
                          onChange={handleFormDetails}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="">Select Class Section ...</option>
                          <option value="junior secondary">
                            Junior Secondary
                          </option>
                          <option value="senior secondary">
                            Senior Secondary
                          </option>
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
                        {formDetails.classType === "junior secondary" ? (
                          <select
                            id="studentClass"
                            name="studentClass"
                            required
                            value={formDetails.studentClass}
                            onChange={handleFormDetails}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">Select Class ...</option>
                            <option value="JSS_1 Platinum">
                              JSS_1 Platinum
                            </option>
                            <option value="JSS_1 Rose">JSS_1 Rose</option>
                            <option value="JSS_1 Galaxy">JSS_1 Galaxy</option>
                            <option value="JSS_2 Rose">JSS_2 Rose</option>
                            <option value="JSS_2 Galaxy">JSS_2 Galaxy</option>
                            <option value="JSS_3 Rose">JSS_3 Rose</option>
                            <option value="JSS_3 Galaxy">JSS_3 Galaxy</option>
                          </select>
                        ) : formDetails.classType === "senior secondary" ? (
                          <select
                            id="studentClass"
                            name="studentClass"
                            required
                            value={formDetails.studentClass}
                            onChange={handleFormDetails}
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
                        ) : (
                          <select
                            id="studentClass"
                            name="studentClass"
                            required
                            value={formDetails.studentClass}
                            onChange={handleFormDetails}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="">
                              Choose class section first ...
                            </option>
                          </select>
                        )}
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
                          value={selectedArea}
                          onChange={handleAreaChange}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="">Choose subject area ...</option>
                          {Object.keys(areasAndSubjects).map((area) => (
                            <option
                              key={area}
                              value={area}
                              disabled={
                                formDetails.classType === "junior secondary" &&
                                (area === "Sciences" || area === "Arts")
                              }
                            >
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    
                      {selectedArea && (
                        <div className="sm:col-span-6">
                      
                        <label
                          htmlFor="subjects"
                          className="block text-sm font-medium leading-6 text-red-800"
                        >
                          Select Subjects for Student :
                        </label>
                        <div className="mt-2 flex flex-wrap">
                          {areasAndSubjects[selectedArea]?.map((subject) => (
                            <label
                              key={subject}
                              className="flex items-center mr-4 mb-2"
                            >
                              <input
                                type="checkbox"
                                name="subjects"
                                value={subject}
                                checked={selectedSubjects.includes(subject)}
                                onChange={handleSubjectChange}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              />
                              <span className="ml-2">{subject}</span>
                            </label>
                          ))}
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
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddStudent;




// import React, { useState } from "react";
// import { Form } from "react-router-dom";
// import { toast } from "react-toastify";
// import { areasAndSubjects } from "../../../utils/constants";

// // Input component
// const Input = ({ label, name, value, onChange, required }) => {
//   return (
//     <div className="sm:col-span-6">
//       <label
//         htmlFor={name}
//         className="block text-sm font-medium leading-6 text-gray-900"
//       >
//         {label}
//       </label>
//       <div className="mt-2">
//         <input
//           type="text"
//           name={name}
//           id={name}
//           required={required}
//           value={value}
//           onChange={onChange}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 required:"
//         />
//       </div>
//     </div>
//   );
// };

// // Select component
// const Select = ({ label, name, value, onChange, options, required }) => {
//   return (
//     <div className="sm:col-span-6">
//       <label
//         htmlFor={name}
//         className="block text-sm font-medium leading-6 text-gray-900"
//       >
//         {label}
//       </label>
//       <div className="mt-2">
//         <select
//           id={name}
//           name={name}
//           required={required}
//           value={value}
//           onChange={onChange}
//           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
//         >
//           <option value="">Select...</option>
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// // Checkbox component
// const Checkbox = ({ label, name, value, checked, onChange }) => {
//   return (
//     <label className="flex items-center mr-4 mb-2">
//       <input
//         type="checkbox"
//         name={name}
//         value={value}
//         checked={checked}
//         onChange={onChange}
//         className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//       />
//       <span className="ml-2">{label}</span>
//     </label>
//   );
// };

// // Form component
// const AddStudentForm = () => {
//   const [formDetails, setFormDetails] = useState({
//     fullName: "",
//     classType: "",
//     studentClass: "",
//   });
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedSubjects, setSelectedSubjects] = useState([]);

//   const handleFormDetails = (e) => {
//     setFormDetails((prevFormDetails) => ({
//       ...prevFormDetails,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleAreaChange = (event) => {
//     const area = event.target.value;
//     setSelectedArea(area);
//     setSelectedSubjects([]);
//   };

//   const handleSubjectChange = (event) => {
//     const selectedSubject = event.target.value;
//     const isChecked = event.target.checked;

//     setSelectedSubjects((prevSelectedSubjects) => {
//       if (isChecked) {
//         return [...prevSelectedSubjects, selectedSubject];
//       } else {
//         return prevSelectedSubjects.filter(
//           (subject) => subject !== selectedSubject
//         );
//       }
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Your submission logic
//   };

//   return (
//     <div className="addStudent_containe">
//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//             Add New Student
//           </h1>
//         </div>
//       </header>
//       <main>
//         <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//           <div className="relative isolate px-6 lg:px-8">
//             <Form onSubmit={handleSubmit}>
//               <div className="w-full lg:w-2/3 mx-auto lg:p-20 space-y-12">
//                 <Input
//                   label="Full Name"
//                   name="fullName"
//                   value={formDetails.fullName}
//                   onChange={handleFormDetails}
//                   required
//                 />
//                 <Select
//                   label="Class Section"
//                   name="classType"
//                   value={formDetails.classType}
//                   onChange={handleFormDetails}
//                   options={[
//                     { value: "junior secondary", label: "Junior Secondary" },
//                     { value: "senior secondary", label: "Senior Secondary" },
//                   ]}
//                   required
//                 />
//                 <Select
//                   label="Class"
//                   name="studentClass"
//                   value={formDetails.studentClass}
//                   onChange={handleFormDetails}
//                   options={
//                     formDetails.classType === "junior secondary"
//                       ? [
//                           { value: "JSS_1 Platinum", label: "JSS_1 Platinum" },
//                           { value: "JSS_1 Rose", label: "JSS_1 Rose" },
//                           // Add other junior secondary classes here
//                         ]
//                       : formDetails.classType === "senior secondary"
//                       ? [
//                           { value: "SS_1 Galaxy", label: "SS_1 Galaxy" },
//                           { value: "SS_1 Platinum", label: "SS_1 Platinum" },
//                           // Add other senior secondary classes here
//                         ]
//                       : []
//                   }
//                   required
//                 />
//                 <Select
//                   label="Area"
//                   name="area"
//                   value={selectedArea}
//                   onChange={handleAreaChange}
//                   options={Object.keys(areasAndSubjects).map((area) => ({
//                     value: area,
//                     label: area,
//                   }))}
//                   required
//                 />
//                 {selectedArea && (
//                   <div className="sm:col-span-6">
//                     <label className="block text-sm font-medium leading-6 text-red-800">
//                       Select Subjects for Student :
//                     </label>
//                     <div className="mt-2 flex flex-wrap">
//                       {areasAndSubjects[selectedArea]?.map((subject) => (
//                         <Checkbox
//                           key={subject}
//                           label={subject}
//                           name={subject}
//                           value={subject}
//                           checked={selectedSubjects.includes(subject)}
//                           onChange={handleSubjectChange}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 <div className="mt-6 flex items-center justify-end gap-x-6">
//                   <button
//                     type="submit"
//                     className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddStudentForm;

