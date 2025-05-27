import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudentReadAsyncAction } from "../Queries"
import { StudentPageContent } from "./StudentPageContent"

/**
 * A lazy-loading component for displaying content of a student entity.
 *
 * This component fetches student data using `StudentReadAsyncAction`, and passes the result
 * to `StudentPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `student` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.student - The student ID to load.
 * @param {(params: { student: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `student` — the fetched student entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `StudentPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the student data and displays it,
 * or loading/error state.
 *
 * @example
 * <StudentPageContentLazy student={123}>
 *   {({ student, onChange, onBlur }) => (
 *     <input value={student.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </StudentPageContentLazy>
 */
export const StudentPageContentLazy = ({ student, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudentReadAsyncAction, student)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && student
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && student
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <StudentPageContent student={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    student: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </StudentPageContent>
        )}
      </>
    )
}