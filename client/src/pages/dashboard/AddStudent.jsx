import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import handleServerError from "../../../utils/handleServerError";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";

const areasAndSubjects = {
  'Sciences': ['English', 'Mathematics', 'Biology', 'Physics', 'Chemistry','Agric', 'Geography', 'Civic Education', 'Economics'],
  'Arts': ['English', 'Mathematics', 'Economics', 'Literature', 'History', 'Government', 'Commerce', 'C.R.S', 'Marketing', 'Civic Education'],
  // Add more areas and subjects as needed
};


const AddStudent = () => {
  const [ formDetails, setFormDetails ] = useState({
    fullName: "",
    class: ""
  })
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isSubmitting, setIssubmitting] = useState(false)



  const handleFormDetails = (e) => {
      setFormDetails((prevFormDetails) => {
        return {
          ...prevFormDetails,
        [e.target.name]: e.target.value
        }
      })
  }


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
        return prevSelectedSubjects.filter((subject) => subject !== selectedSubject);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedSubjects.length === 0) {
      toast.error("Select at least 5 subjects for the student")
      return;
    }

    if (!formDetails.fullName || !formDetails.class || !selectedArea || !selectedSubjects){
        toast.error("Please fill out all required fields.");
        return
    }
      

    const formData = {
      name: formDetails.fullName,
      class: formDetails.class,
      subjectArea: selectedArea,
      assignedSubjects: selectedSubjects
    }

    setIssubmitting(true)

    try {
      await customFetch.post('/student', formData)

      toast.success("Student added Successfully")

      setFormDetails({
        fullName: "",
        class: ""
      });
      setSelectedArea("");
      setSelectedSubjects([]);

    } catch (error) {
      handleServerError(error)
      return error
    } finally{
      setIssubmitting(false)
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


                  <div className="sm:col-span-4">
                  <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
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

                <div className="sm:col-span-2">
              <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                Class
              </label>
              <div className="mt-2">
                <select
                  id="class"
                  name="class"
                  required
                  value={formDetails.class}
                  onChange={handleFormDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select Class ...</option>
                  <option value="JSS_1 Platinum" >JSS_1 Platinum</option>
                  <option value="JSS_2 Galaxy">JSS_2 Galaxy</option>
                  <option value="JSS_3">JSS_3</option>
                  <option value="SS_1 Platinum">SS_1 Platinum</option>
                  <option value="SS_2 Galaxy">SS_2 Galaxy</option>
                  <option value="SS_3">SS_3</option>
                </select>
              </div>
            </div>


                    <div className="sm:col-span-3">
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
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="subjects"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Subjects
                      </label>
                      <div className="mt-2">
                        <div className="grid grid-cols-1 gap-y-4">
                          {areasAndSubjects[selectedArea]?.map((subject) => (
                            <label key={subject} className="flex items-center">
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
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 4.436M20 12h-4a8.001 8.001 0 00-7.064 4.336M16 16.735A7.963 7.963 0 0112 20c4.418 0 8-3.582 8-8h-4zm-12 0a7.963 7.963 0 014-3.265M8.073 7.265A7.963 7.963 0 0112 4c-4.418 0-8 3.582-8 8h4zm8.854 9.47A8.004 8.004 0 0120 19.564M16.794 7.265a8.004 8.004 0 00-3.72-2.765"></path>
                      </svg>
                      <span>Saving...</span>
                    </div>
                  ) : (<button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>) }
                  
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
