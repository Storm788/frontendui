import { useState } from "react";
import {EvaluationForm} from '../../Exam/Components/StudentEval.jsx';
import{ QueryStudentAsyncAction } from "../../Exam/Queries/InsertAsyncAction.jsx";
import { InsertStudentAsyncAction } from "../../Exam/Queries/InsertAsyncAction.jsx";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

// Komponenta pro zobrazení studenta
const LocalStudent = ({ user, insertStudent, examId, onDone}) => {
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

export const StudentEvaluationInsert = ({ examId, onDone, readOnly }) => {
  const [pattern, setPattern] = useState("");
  const [users, setUsers] = useState([]);

  const { fetch: fetchUsers, loading: loadingUsers } = useAsyncAction(
    QueryStudentAsyncAction,
    {},
    { deferred: true }
  );
  
  // Move the hook call to the top level of the component
  const { fetch: insertStudent } = useAsyncAction(
    InsertStudentAsyncAction, 
    {}, 
    { deferred: true }
  );
  

  // Vyhledávání uživatelů při změně patternu
  const handlePatternChange = async (e) => {
    const value = e.target.value;
    setPattern(value);
    if (value.length > 0) {
      const result = await fetchUsers({ pattern: `%${value}%` });
      setUsers(result?.data?.userPage);
    } else {
      setUsers([]);
    }
  };

  if (readOnly) return null;

  return (
    <div>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Přidat uživatele (hledat podle jména nebo příjmení)"
        value={pattern}
        onChange={handlePatternChange}
      />
      {pattern && users.length > 0 && (
        <ul className="list-group mb-2" style={{ maxHeight: 200, overflowY: "auto" }}>
          {users.map(user => (
            <li
              key={user.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer", padding: 0 }}
            >
              <LocalStudent user={user} insertStudent={insertStudent} examId={examId} onDone={onDone}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};