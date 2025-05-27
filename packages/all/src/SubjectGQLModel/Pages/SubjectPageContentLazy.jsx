import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { SubjectReadAsyncAction } from "../Queries"
import { SubjectPageContent } from "./SubjectPageContent"

/**
 * A lazy-loading component for displaying content of a subject entity.
 *
 * This component fetches subject data using `SubjectReadAsyncAction`, and passes the result
 * to `SubjectPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `subject` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.subject - The subject ID to load.
 * @param {(params: { subject: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `subject` — the fetched subject entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `SubjectPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the subject data and displays it,
 * or loading/error state.
 *
 * @example
 * <SubjectPageContentLazy subject={123}>
 *   {({ subject, onChange, onBlur }) => (
 *     <input value={subject.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </SubjectPageContentLazy>
 */
export const SubjectPageContentLazy = ({ subject, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(SubjectReadAsyncAction, subject)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && subject
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && subject
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <SubjectPageContent subject={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    subject: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </SubjectPageContent>
        )}
      </>
    )
}