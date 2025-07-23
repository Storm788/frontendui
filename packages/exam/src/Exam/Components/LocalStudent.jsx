import {EvaluationForm} from '../../Exam/Components/StudentEval.jsx';
import { useState } from 'react';

/**
 * Komponenta LocalStudent umožňuje vložit studenta do zkoušky a následně jej ohodnotit.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - Objekt uživatele představujícího studenta.
 * @param {Function} props.insertStudent - Asynchronní funkce pro vložení studenta.
 * @param {string} props.examId - ID zkoušky.
 * @param {Function} props.onDone - Callback funkce volaná po dokončení hodnocení.
 * @returns {JSX.Element}
**/
export const LocalStudent = ({ user, insertStudent, examId, onDone}) => {
  const [showForm, setShowForm] = useState(false);
  const [studentObj, setStudentObj] = useState(null);

  const onClick = async () => {
    const result = await insertStudent({
      userId: user.id,
      programId: "0ac1761b-0ec7-4fc2-b4d7-127e79a316eb"
    });
    const student = result?.data?.studentInsert;
    console.log(student)
    setStudentObj(student);
    setShowForm(true);


  };
  return (
    <div>
      <a onClick={onClick} href="#">{user.fullname}</a>
      {showForm && <EvaluationForm student={studentObj} minScore={50} maxScore={100} examId={examId} onDone={onDone} />}
    </div>
  );
};