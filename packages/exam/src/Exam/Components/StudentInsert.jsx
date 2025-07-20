import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";

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

const LocalStudent = ({ user, onSelect }) => {
    const onClick = (e) => {
        e.preventDefault();
        console.log("LocalStudent.onClick", user.id, user.name)
        onSelect(user)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{user.fullname}</a>
        </div>
    )
}

export const StudentEvaluationInsert = ({ examId, onDone }) => {
  const [pattern, setPattern] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [points, setPoints] = useState("");
  const [passed, setPassed] = useState(false);

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
  
  const { fetch: insertEvaluation } = useAsyncAction(
    EvaluationInsertAsyncAction, 
    {}, 
    { deferred: true }
  );

  // Vyhledávání uživatelů při změně patternu
  const handlePatternChange = async (e) => {
    const value = e.target.value;
    setPattern(value);
    console.log("Zadán pattern:", value);
    if (value.length > 0) {
      const result = await fetchUsers({ pattern: `%${value}%` });
      console.log("Výsledek fetchUsers:", result);
      setUsers(result?.data?.userPage);
      console.log(users);
    } else {
      setUsers([]);
    }
  };

  // Po kliknutí na uživatele
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    console.log("Kliknuto na uživatele:", user);
    
    // Use the hook that was declared at the top level
    const studentResult = await insertStudent({ 
      userId: user.id, 
      programId: "0ac1761b-0ec7-4fc2-b4d7-127e79a316eb"
    });

    try {
      const student = studentResult?.data?.studentInsert;
      if (student?.id) {
        const evaluationResult = await insertEvaluation({
          studentId: student.id,
          examId,
          passed: false,
          points: 0,
        });
        console.log("Výsledek insertEvaluation:", evaluationResult);
        
        const evaluation = evaluationResult?.data?.evaluationInsert;
        if (evaluation?.id) {
          //alert("Evaluation úspěšně vytvořena!");
          onDone?.(evaluation);
          setPattern("");
          setSelectedUser(null);
          setPoints("");
          setPassed(false);
          setUsers([]);
        } else {
          alert("Nepodařilo se vytvořit evaluation.");
        }
      } else {
        alert("Nepodařilo se vytvořit studenta.");
      }
    } catch (err) {
      console.error("Chyba při vkládání:", err);
      alert("Chyba při vkládání.");
    }
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
              <LocalStudent user={user} onSelect={handleUserClick} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};