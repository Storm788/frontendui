import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";

const QueryStudentAsyncAction = createAsyncGraphQLAction(`query QueryStudent($pattern: String!) {
  userPage(
    where: {_or: [{name: {_ilike: $pattern}}, {surname: {_ilike: $pattern}}]}
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

const EvaluationInsertAsyncAction = createAsyncGraphQLAction(`mutation InsertEvaluation($studentId: UUID!, $examId: UUID!, $passed: Boolean!, $points: Int!, $id: UUID) {
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

const LocalStudent = ({ student, onSelect }) => {
    const onClick = (e) => {
        e.preventDefault();
        onSelect(student)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{student.student.fullname}</a>
        </div>
    )
}

export const StudentExamInsert = ({ examId, programId, onStudentAdded }) => {
  const [pattern, setPattern] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { fetch: fetchStudents, loading: loadingStudents } = useAsyncAction(
    QueryStudentAsyncAction,
    {},
    { deferred: true }
  );
  const { fetch: insertEvaluation } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deferred: true });

  // Vyhledávání studentů při změně patternu
  const handlePatternChange = async (e) => {
    const value = e.target.value;
    setPattern(value);
    if (value.length > 0) {
      const result = await fetchStudents({ pattern: `%${value}%` });
      // filter result to only include users with studies.id === programId
      setStudents(result?.data?.studentPage ?? []);
    } else {
      setStudents([]);
    }
  };

  // Po kliknutí na studenta
  const handleStudentClick = async (student) => {
    setSelectedStudent(student);
    try {
      const evaluationResult = await insertEvaluation({
        studentId: student.id,
        examId,
        passed: false,
        points: 0,
        id: crypto.randomUUID()
      });
      if (evaluationResult?.data?.evaluationInsert?.id) {
        onStudentAdded?.();
        setPattern("");
        setSelectedStudent(null);
        setStudents([]);
      } else {
        alert("Nepodařilo se vytvořit evaluation.");
      }
    } catch (err) {
      alert("Chyba při vkládání.");
    }
  };

  return (
    <div>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Přidat existujícího studenta do zkoušky"
        value={pattern}
        onChange={handlePatternChange}
      />
      {pattern && students.length > 0 && (
        <ul className="list-group mb-2" style={{ maxHeight: 200, overflowY: "auto" }}>
          {students.map(student => (
            <li
              key={student.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer", padding: 0 }}
            >
              <LocalStudent student={student} onSelect={handleStudentClick} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 