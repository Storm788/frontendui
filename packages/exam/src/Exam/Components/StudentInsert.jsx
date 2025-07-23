import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";
import {EvaluationForm} from '../../Exam/Components/StudentEval.jsx';

const QueryStudentAsyncAction = createAsyncGraphQLAction(`query QueryInstructor($pattern: String!) {
  userPage(
    where: {
      _or: [
        { name: { _ilike: $pattern } },
        { surname: { _ilike: $pattern } }
      ]
    }
    limit: 100
  ) {
    __typename
    id
    name
    surname
    fullname
    studies {
      id
    }
  }
}`)

const InsertStudentAsyncAction = createAsyncGraphQLAction(`mutation InsertStudent($userId: UUID!, $programId: UUID!) {
  studentInsert(student: {programId: $programId, userId: $userId, stateId: "51d101a0-81f1-44ca-8366-6cf51432e8d6"}) {
  __typename
    ... on StudentGQLModel {
      id
      student {
        __typename
        id
        name
        surname
        fullname
      }
    }
  }
}`)

const EvaluationInsertAsyncAction = createAsyncGraphQLAction(`mutation MyMutation($studentId: UUID!, $examId: UUID!, $passed: Boolean!, $points: Int!, $id: UUID) {
  evaluationInsert(
    evaluation: {studentId: $studentId, passed: $passed, points: $points, examId: $examId, id: $id}
  ) {
    __typename
    ... on EvaluationGQLModel {
      id
    }
    ... on InsertError {
      input
      failed
      msg
    }
  }
}`)


const LocalStudent = ({ user, insertStudent, examId, onDone }) => {
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

export const StudentEvaluationInsert = ({ examId, onDone }) => {
  const [pattern, setPattern] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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

  // Po kliknutí na uživatele
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    
    
  };

  return (
    <div>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Hledat uživatele"
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
              <LocalStudent user={user} onSelect={handleUserClick} insertStudent={insertStudent} examId={examId} onDone={onDone} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};