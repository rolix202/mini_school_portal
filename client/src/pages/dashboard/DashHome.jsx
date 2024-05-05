import React, { useEffect, useState } from "react";
import customFetch from "../../../utils/customFetch";
import handleServerError from "../../../utils/handleServerError";
import { useLoaderData, useOutletContext } from "react-router-dom";
import svgImg from "../../assets/educator.svg";
import { useDashboardContext } from "./DashboardLayout";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/student");

    return data;
  } catch (error) {
    handleServerError(error);
    return error;
  }
};

const DashHome = () => {
 const { currentUser } = useDashboardContext()
 const currentUserClass = currentUser?.data?.currentUser.staffClass; 

  // console.log(currentUserData);
  const { data } = useLoaderData();
  const { students } = data;

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8">
          <div className="grid grid-cols-6 gap-10">
            <div className="col-span-6 sm:col-span-3 md:col-span-2 bg-red-400 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2">
                  <div className="px-6 py-4">
                    <div className="font-bold text-ml mb-2">
                      No. of Students
                    </div>
                    <h1 className="text-gray-700 text-6xl">
                      {students ? students.length : 0}
                    </h1>

                    <div className="pt-8">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {currentUserClass}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="px-6 py-4 flex justify-center items-center h-full">
                    <img src={svgImg} alt="Your SVG Image" className="h-full"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 sm:col-span-3 md:col-span-2 bg-orange-800">
              freeman
            </div>
            <div className="col-span-6 sm:col-span-3 md:col-span-2 bg-amber-500">
              harrison
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashHome;
