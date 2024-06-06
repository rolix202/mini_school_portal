import React, { useState } from "react";

const AssessmentHeader = ({ setOpenUpdate }) => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add Assessments
          </h1>
        </div>
        <div className="add_score">
          <a
            onClick={() => {
              setOpenUpdate(true);
            }}
            className="bg-orange-400 inline-block text-sm cursor-pointer hover:bg-orange-700 text-white font-bold py-3 px-3 rounded"
          >
            Add Scores
          </a>
        </div>
      </div>
    </header>
  );
};

export default AssessmentHeader;
