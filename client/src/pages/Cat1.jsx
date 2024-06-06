import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import customFetch from "../../utils/customFetch";
import AssessmentHeader from "../components/AssessmentHeader";
import maryGold_logo from "../assets/mary_gold.jpeg";
import handleServerError from "../../utils/handleServerError";

const Cat1 = () => {
  const [studentAssessments, setStudentAssessments] = useState([]);
  const [assessmentInputs, setAssessmentInputs] = useState({
    s_class: "",
    term: "",
    category: "",
  });
  const [shouldFetchAssessment, setShouldFetchAssessment] = useState(false);

  const handleFormInputs = (e) => {
    const { name, value } = e.target;
    setAssessmentInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldFetchAssessment(true);
  };

  useEffect(() => {
    if (shouldFetchAssessment) {
      const getAssessment = async () => {
        try {
          const { s_class, term, category } = assessmentInputs;
          const response = await customFetch.get(
            `students/assessment/?s_class=${s_class}&term=${term}&category=${category}`
          );
          setStudentAssessments(response?.data?.data?.assessment || []);
        } catch (error) {
          handleServerError(error);
        } finally {
          setShouldFetchAssessment(false);
        }
      };

      getAssessment();
    }
  }, [shouldFetchAssessment, assessmentInputs]);

  return (
    <div className="assessment_container">
      <AssessmentHeader />

      <div className="assesement_form mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-1/2 mx-auto">
          <div className="marygold_logo flex justify-center">
            <img src={maryGold_logo} alt="Mary gold logo" />
          </div>
          <div className="form_assessmen p-8">
            <form
              method="post"
              className="w-full max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3 mb-6 md:mb-4">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="s_class"
                  >
                    Select Student Class
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 italic"
                      name="s_class"
                      id="s_class"
                      value={assessmentInputs.s_class}
                      onChange={handleFormInputs}
                      required
                    >
                      <option value="">Select class ...</option>
                      <option value="JSS_1 Platinum">JSS_1 Platinum</option>
                      <option value="JSS_1 Rose">JSS_1 Rose</option>
                      <option value="JSS_1 Galaxy">JSS_1 Galaxy</option>
                      <option value="JSS_2 Rose">JSS_2 Rose</option>
                      <option value="JSS_2 Galaxy">JSS_2 Galaxy</option>
                      <option value="JSS_3 Rose">JSS_3 Rose</option>
                      <option value="JSS_3 Galaxy">JSS_3 Galaxy</option>
                      <option value="SS_1 Platinum">SS_1 Platinum</option>
                      <option value="SS_1 Galaxy">SS_1 Galaxy</option>
                      <option value="SS_2 Galaxy">SS_2 Galaxy</option>
                      <option value="SS_2 Platinum">SS_2 Platinum</option>
                      <option value="SS_3 Galaxy">SS_3 Galaxy</option>
                      <option value="SS_3 Platinum">SS_3 Platinum</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                  </div>
                </div>

                <div className="w-full px-3 mb-6 md:mb-4">
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
                      value={assessmentInputs.term}
                      onChange={handleFormInputs}
                      required
                    >
                      <option value="">Select term ...</option>
                      <option value="1st Term">1st Term</option>
                      <option value="2nd Term">2nd Term</option>
                      <option value="3rd Term">3rd Term</option>
                    </select>
                  </div>
                </div>

                <div className="w-full px-3 mb-6 md:mb-4">
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
                      value={assessmentInputs.category}
                      onChange={handleFormInputs}
                    >
                      <option value="">Select Assessment type ...</option>
                      <option value="cat_1">First CAT</option>
                      <option value="cat_2">Second CAT</option>
                      <option value="cat_3">Third Cat</option>
                      <option value="exam">Exam</option>
                    </select>
                  </div>

                  <button className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Get Assessment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {studentAssessments.length === 0 ? null : (
        <div className="py-6 sm:px-4 lg:px-4 overflow-x-hidden">
          <table className="table-fixed w-full cat_table">
            <thead className="bg-gray-300 border-gray-300 text-left">
              <tr>
                <th className="px-4 py-2 w-12 bg-orange-700">S/N</th>
                <th className="px-4 py-2 w-40 bg-yellow-300">Name of Student</th>
                <th className="rotate-header w-8">English</th>
                <th className="rotate-header w-8">Mathematics</th>
                <th className="rotate-header w-8">Civic Education</th>
                <th className="rotate-header w-8">Data Processing</th>
                <th className="rotate-header w-8">Biology</th>
                <th className="rotate-header w-8">Chemistry</th>
                <th className="rotate-header w-8">Physics</th>
                <th className="rotate-header w-8">Economics</th>
                <th className="rotate-header w-8">Further Maths</th>
                <th className="rotate-header w-8">Geography</th>
                <th className="rotate-header w-8">Agric</th>
                <th className="rotate-header w-8">Government</th>
                <th className="rotate-header w-8">C. R. S</th>
                <th className="rotate-header w-8">Literature</th>
                <th className="rotate-header w-8">Commerce</th>
                <th className="rotate-header w-8">Technical Drawing</th>
                <th className="rotate-header w-8">Total</th>
                <th className="rotate-header w-8">Average</th>
                <th className="rotate-header w-8">Position</th>
              </tr>
            </thead>
            <tbody>
              {studentAssessments.map((student, index) => {
                const scores = student.assessments[0].scores.reduce((acc, score) => {
                  acc[score.subject] = score.score;
                  return acc;
                }, {});

                const totalScore = Object.values(scores).reduce((acc, score) => acc + (score || 0), 0);
                const numberOfSubjects = Object.keys(scores).length;
                const averageScore = numberOfSubjects ? (totalScore / numberOfSubjects).toFixed(2) : "-";

                return (
                  <tr key={index}>
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2">{student.studentName}</td>
                    <td className="text-center">{scores.English || "-"}</td>
                    <td className="text-center">{scores.Mathematics || "-"}</td>
                    <td className="text-center">{scores["Civic Education"] || "-"}</td>
                    <td className="text-center">{scores["Data Processing"] || "-"}</td>
                    <td className="text-center">{scores.Biology || "-"}</td>
                    <td className="text-center">{scores.Chemistry || "-"}</td>
                    <td className="text-center">{scores.Physics || "-"}</td>
                    <td className="text-center">{scores.Economics || "-"}</td>
                    <td className="text-center">{scores["Further Maths"] || "-"}</td>
                    <td className="text-center">{scores.Geography || "-"}</td>
                    <td className="text-center">{scores.Agric || "-"}</td>
                    <td className="text-center">{scores.Government || "-"}</td>
                    <td className="text-center">{scores["C. R. S"] || "-"}</td>
                    <td className="text-center">{scores.Literature || "-"}</td>
                    <td className="text-center">{scores.Commerce || "-"}</td>
                    <td className="text-center">{scores["Technical Drawing"] || "-"}</td>
                    <td className="text-center">{totalScore}</td>
                    <td className="text-center">{averageScore}</td>
                    <td className="text-center">-</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cat1;
