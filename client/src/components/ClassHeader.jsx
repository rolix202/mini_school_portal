import React, { useState } from "react";
import Modal from "./Modal";
import AddStudentForm from "./AddStudentForm";

const ClassHeader = ({ studentClass }) => {

    const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-5 xl:col-span-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Student List - (
          <span className="text-indigo-500">
            {" "}
            {studentClass[0].studentClass}{" "}
          </span>
          )
        </h1>
      </div>
      <div className="col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 flex sm:justify-end">
        <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Student
        </button>
      </div>

      <Modal open={modalOpen} onClose={()=> setModalOpen(false)} formModal={true}>
        <AddStudentForm />
      </Modal>
    </div>
  );
};

export default ClassHeader;
