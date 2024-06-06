import React from "react";

const AddStudentFormInput = ({label, displayText, placeholder, type, required, value, onchange, disabled}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {displayText}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={label}
          id={label}
          placeholder={placeholder}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
};

export default AddStudentFormInput;
