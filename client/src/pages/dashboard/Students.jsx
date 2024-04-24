import React from "react";
import customFetch from "../../../utils/customFetch";
import handleServerError from "../../../utils/handleServerError";
import { useLoaderData, useOutletContext } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/student");
    return data;
  } catch (error) {
    handleServerError(error);
    return "No Record Found";
  }
};

const Students = () => {
  const { data } = useLoaderData();
  const { students } = data;
  const { currentUser } = useOutletContext()

  if(!students || students.length === 0){
    return (
      <div className="student_container">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
             Student List - (<span className="text-indigo-500">{" "} { currentUser.class } {" "} </span>)
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <p className="text-xl">No Student Record Found</p>
        </div>
      </main>
    </div>
    )
  }

  // console.log(students);

  return (
    <div className="student_container">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
             Student List - (<span className="text-indigo-500">{" "} { currentUser.class } {" "} </span>)
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                          Edit
                        </button>
                      </span>
                      <span>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                          Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Students;
