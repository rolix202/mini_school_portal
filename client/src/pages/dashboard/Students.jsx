import React, { useEffect, useState } from "react";
import customFetch from "../../../utils/customFetch";
import handleServerError from "../../../utils/handleServerError";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { useDashboardContext } from "./DashboardLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Example from "./testDropDown";


const Students = () => {
  const { currentUser } = useDashboardContext()
 const currentUserClass = currentUser?.data?.currentUser.staffClass; 
  const [students, setStudents] = useState(null)

 

  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const data = await customFetch.get('/students')
        setStudents(data?.data?.data?.students);
      } catch (error) {
        handleServerError(error)
        return
      }
    }
    getAllStudents()
  }, [])



  return (
    <div className="student_container">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
             Student List - (<span className="text-indigo-500">{" "} { currentUserClass } {" "} </span>)
          </h1>
        </div>
      </header>
      <main>
        {students ? (<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-300 border-b-2 border-gray-300 text-left">
              <tr>
                <th className="px-4 py-2">S/N</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Subject Area</th>
                <th className="px-4 py-2">Assigned Subjects</th>
                <th className="px-4 py-2">Action</th>
              </tr>
              
            </thead>
            <tbody>
              {students.map((student, index) => {
                const studentCapitalize = student.name
                  .split(" ")
                  .map(
                    (eachName) =>
                      eachName.charAt(0).toUpperCase() + eachName.slice(1)
                  )
                  .join(" ");
                const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
                return (
                  <tr key={index} className={rowClass}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{studentCapitalize} </td>
                    <td className="px-4 py-2">{student.subjectArea} </td>
                    <td className="px-4 py-2">
                      {student.assignedSubjects.map((subject, index) => (
                        <span key={index}>
                          {index === student.assignedSubjects.length - 1 ? (
                            <span>{subject}</span>
                          ) : (
                            <span>{subject} , </span>
                          )}
                        </span>
                      ))}
                    </td>
                    <td>
                      <span className="mr-2">
                        <Link
                          className="bg-blue-500 inline-block cursor-pointer hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        
                        </Link>
                      </span>
                      <span className="">
                        <Link
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
        </div>) : (<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <p className="text-xl">No Student Record Found</p>
        </div>)}
        
      </main>

    </div>
  );
};

export default Students;
