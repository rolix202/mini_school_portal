import React from 'react'
import StudentClassStructure from '../../../components/StudentClassStructure'
import { useParams } from 'react-router-dom'

const Js3Rose = () => {
  const { classId } = useParams()

  const category = classId.charAt(0) === "j" ? "jss" : classId.charAt(0) === "s" ? "sss" : "";

  console.log(classId);
  console.log(category);
  return (
    <>
        <StudentClassStructure 
            currentUserClass= "JS 3R"
        />
    </>
  )
}

export default Js3Rose