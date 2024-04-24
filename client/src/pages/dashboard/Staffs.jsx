import React from 'react'

const Staffs = () => {
  return (
    <div className="student_container">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
             List of Staffs
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
                <th className="px-4 py-2">Phone No.</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Subject</th>
                <th className='px-4 py-2'>Class</th>
                <th className='px-4 py-2'>Role</th>
              </tr>
            </thead>
            <tbody>
                  <tr>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Roland </td>
                    <td className="px-4 py-2">09033528556 </td>
                    <td className="px-4 py-2">williamsroland147@gmail.com</td>
                    <td className='px-4 py-2'>Data processing</td>
                    <td className='px-4 py-2'>Admin</td>
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
              
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Staffs