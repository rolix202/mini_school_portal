import { UserIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import handleServerError from "../../utils/handleServerError";


export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('auth/signup', data);

    toast.success('Registeration successful')
    return redirect('/dashboard');
  } catch (error) {
    handleServerError(error)
    return error
  }
}


const Register = () => {

  return (
    <div className="wrapper">
      <div className="relative isolate px-6 pt-32 lg:px-8">

        <Form method="post" id="form">
          <div className="w-full lg:w-1/2 lg:p-20 space-y-12">



            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 required:"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone No.
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phoneNo"
                      id="phoneNo"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-2">
              <label htmlFor="class" className="block text-sm font-medium leading-6 text-gray-900">
                Class
              </label>
              <div className="mt-2">
                <select
                  id="class"
                  name="class"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>JSS_1</option>
                  <option>JSS_2</option>
                  <option>JSS_3</option>
                  <option>SS_1</option>
                  <option>SS_2</option>
                  <option>SS_3</option>
                </select>
              </div>
            </div> */}

                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                  Subject
                  </label>
                  <div className="mt-2">
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select an area</option>
                      <option>English</option>
                      <option>Mathematics</option>
                      <option>Biology</option>
                      <option>Civic Education</option>
                      <option>Data Processing</option>
                      <option>Government</option>
                      <option>C.R.K</option>
                      <option>Economics</option>
                      <option>Commerce</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="confirmPass" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="confirmPass"
                      id="confirmPass"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>

          </div>


        </Form>
      </div>
    </div>
  )
}

export default Register

