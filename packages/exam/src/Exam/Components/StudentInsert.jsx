import { useState } from "react";
import{ QueryStudentAsyncAction } from "../../Exam/Queries/InsertAsyncAction.jsx";
import { InsertStudentAsyncAction } from "../../Exam/Queries/InsertAsyncAction.jsx";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { LocalStudent } from "./LocalStudent.jsx";

/**
 * Komponenta StudentEvaluationInsert poskytuje UI pro vyhledávání uživatelů a jejich vložení jako studentů ke zkoušce pro hodnocení.
 *
 * @component
 * @param {Object} props
 * @param {string} props.examId - ID zkoušky.
 * @param {Function} props.onDone - Callback funkce volaná po dokončení hodnocení.
 * @param {boolean} props.readOnly - Pokud je true, zakáže možnost vkládání.
 * @returns {JSX.Element|null}
 */
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