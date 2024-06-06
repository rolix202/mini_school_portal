import React, { useEffect, useState } from 'react';
import StudentClassStructure from '../../../components/StudentClassStructure';
import customFetch from '../../../../utils/customFetch';
import { useParams } from 'react-router-dom';
import handleServerError from '../../../../utils/handleServerError';
import Loader from '../../../components/Loader';

const Js3Rose = () => {
  const [student, setStudent] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await customFetch.get("students/jss/JSS_3 Rose");
        const data = response.data.data.students;
        setStudent(data);
        setIsDataFetched(true);
      } catch (error) {
        handleServerError(error);
        setIsDataFetched(true)
        return;
      }
    };
    getStudents();
  }, []);

  if (!isDataFetched) {
    return <Loader />;
  }

  if (student.length === 0) {
    return (
      <div className="student_container">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Student List - (<span className="text-indigo-500"> Empty </span>)
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <p className="text-xl">No Student Record Found</p>
          </div>
        </main>
      </div>
    );
  }

  return <StudentClassStructure students={student} />;
};

export default Js3Rose;
