import React, { useEffect, useState } from "react";
import AssessmentHeader from "../../components/AssessmentHeader";
import customFetch from "../../../utils/customFetch";
import handleServerError from "../../../utils/handleServerError";
import { useDashboardContext } from "./DashboardLayout";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const AddAssessment = () => {
  const [students, setStudents] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [scores, setScores] = useState({});
  const [scoreDetails, setScoreDetails] = useState({
    category: "",
    term: "",
    subject: ""
  })

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await customFetch.get("/students");
        setStudents(data?.data?.data?.filteredStudent);
        setIsDataFetched(true);
      } catch (error) {
        handleServerError(error);
        setIsDataFetched(false);
        return;
      }
    };
    getStudents();
  }, []);

  const { currentUser } = useDashboardContext();

  const academicDetails = {
    s_class: currentUser?.data?.currentUser?.staffClass,
    subject: currentUser?.data?.currentUser?.subject,
  };

  const handleScoreInput = (e) => {
    const { name, value } = e.target
    setScoreDetails((prev) => ({
        ...prev,
        [name]: value
    }))
  }

  const handleScoreChange = (studentId, score) => {
    if (/^\d*$/.test(score)) {
      setScores((prevScores) => ({
        ...prevScores,
        [studentId]: score,
      }));
    }
  };


  const handleSubmitScores = async (e) => {
    e.preventDefault();
   
    for (let key in scores) {
      let score = scores[key];
      if (!/^\d+$/.test(score)) {
        toast.error("All scores must be numbers");
        return;
      }
    }

    const assessment = {
      term: scoreDetails.term,
      category: scoreDetails.category,
      scores: Object.entries(scores).map(([studentId, score]) => ({
        student: studentId,
        subject: scoreDetails.subject,
        score: Number(score)
      }))
    };

    try {
      for (let studentId in scores) {
        await customFetch.post(`/students/assessment/${studentId}`, {
          term: assessment.term,
          category: assessment.category,
          scores: [{ subject: academicDetails.subject, score: scores[studentId] }]
        });
      }
      toast.success("Scores added successfully");
    } catch (error) {
      handleServerError(error);
    }
  };


  if (!isDataFetched) {
    return <Loader />;
  }

  if (students.length === 0) {
    return (
      <div className="addAssessmentContainer">
        <AssessmentHeader />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <p className="text-xl">No Student Record Found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="addAssessmentContainer">
      <div>
        <AssessmentHeader setOpenUpdate={setOpenUpdate} />
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="classInfo flex justify-center my-10">
          <div className="classInfo_h text-center leading-10">
            <h1 className="text-3xl font-bold">
              MARY GOLD INTERNATIONAL SCHOOL, CALABAR
            </h1>
            <h2 className="text-xl pt-2">
              <span className="font-semibold">SUBJECT:</span>{" "}
              <span className="font-bold">{academicDetails.subject} </span>{" "}
            </h2>
            <p className="text-sm py-4">
              <span className="font-bold">CLASS:</span>{" "}
              <span className="px-4 border-b border-black">
                {" "}
                {academicDetails.s_class}{" "}
              </span>
              <span className="pl-4 font-bold">ACADEMIC SESSION:</span>{" "}
              <span className="px-4 border-b border-black">2023/2024</span>
              <span className="pl-4 font-bold">TERM:</span>{" "}
              <span className="px-4 border-b border-black">3rd Term</span>
            </p>
          </div>
        </div>

        <div className="table_wrapper flex justify-center">
          <table className="table-auto w-full">
            <thead className="bg-gray-300 border-b-2 border-gray-300 text-left">
              <tr>
                <th className="px-6 py-2">S/N</th>
                <th className="px-6 py-2">Name</th>
                <th className="px-6 py-2">Subject Area</th>
                <th className="px-6 py-2">CAT 1</th>
                <th className="px-6 py-2">CAT 2</th>
                <th className="px-6 py-2">CAT 3</th>
                <th className="px-6 py-2">Exams</th>
                <th className="px-6 py-2">Total</th>
                <th className="px-6 py-2">Average</th>
                <th className="px-6 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const fname = student.name
                  .split(" ")
                  .map(
                    (eachName) =>
                      eachName.charAt(0).toUpperCase() + eachName.slice(1)
                  )
                  .join(" ");

                  

                return (
                  <tr key={index}>
                    <td className="px-6 py-2">{index + 1} </td>
                    <td className="px-6 py-2">{fname} </td>
                    <td className="px-6 py-2">{student.subjectArea} </td>
                    <td className="px-6 py-2"> - </td>
                    <td className="px-6 py-2"> - </td>
                    <td className="px-6 py-2"> - </td>
                    <td className="px-6 py-2"> - </td>
                    <td className="px-6 py-2"> - </td>
                    <td className="px-6 py-2"> - </td>
                    <td className="px-6 py-2">
                      <span className="">
                        <a
                          onClick={() => {
                            setOpenUpdate(true);
                          }}
                          className="bg-blue-500 inline-block text-xs cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                        >
                          Update Score
                        </a>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Modal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          formModal={true}
        >
          <div className="assessment_modal p-10">
            <div className="assessment_header pb-10">
              <h1 className="text-xl">Fill in the student Scores</h1>
            </div>

            
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-1/2 px-3 mb-6 md:mb-4">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="term"
                  >
                    Select Term
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 italic"
                      name="term"
                      id="term"
                      value={scoreDetails.term}
                      onChange={handleScoreInput}
                      required
                    >
                      <option value="">Select term ...</option>
                      <option value="1st Term">1st Term</option>
                      <option value="2nd Term">2nd Term</option>
                      <option value="3rd Term">3rd Term</option>
                    </select>
                  </div>
                </div>

                <div className="w-1/2 px-3 mb-6 md:mb-4">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="category"
                  >
                    Select Assessment type
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 italic"
                      name="category"
                      id="category"
                      required
                      value={scoreDetails.category}
                      onChange={handleScoreInput}
                    >
                      <option value="">Select Assessment type ...</option>
                      <option value="cat_1">First CAT</option>
                      <option value="cat_2">Second CAT</option>
                      <option value="cat_3">Third Cat</option>
                      <option value="exam">Exam</option>
                    </select>
                  </div>

        
                </div>
            </div>
            

            <table className="w-5/6 m-auto text-center">
              <thead>
                <tr>
                  <th className="w-1/6">S/N</th>
                  <th className="w-4/6">Name</th>
                  <th className="w-1/5">Scores</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  const fname = student.name
                    .split(" ")
                    .map(
                      (eachName) =>
                        eachName.charAt(0).toUpperCase() + eachName.slice(1)
                    )
                    .join(" ");

                  return (
                    <tr key={index}>
                      <td>{index + 1} </td>
                      <td>{fname} </td>
                      <td className="">
                        <input
                          type="number"
                          name="score"
                          value={scores[student.studentID] || ""}
                          required
                          onChange={(e) =>
                            handleScoreChange(student.studentID, e.target.value)
                          }
                          className="w-full"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmitScores}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-5/6"
              >
                Submit Scores
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AddAssessment;
