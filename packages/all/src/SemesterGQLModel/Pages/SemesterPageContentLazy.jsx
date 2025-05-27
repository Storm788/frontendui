import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { SemesterReadAsyncAction } from "../Queries"
import { SemesterPageContent } from "./SemesterPageContent"

/**
 * A lazy-loading component for displaying content of a semester entity.
 *
 * This component fetches semester data using `SemesterReadAsyncAction`, and passes the result
 * to `SemesterPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `semester` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.semester - The semester ID to load.
 * @param {(params: { semester: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `semester` — the fetched semester entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `SemesterPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the semester data and displays it,
 * or loading/error state.
 *
 * @example
 * <SemesterPageContentLazy semester={123}>
 *   {({ semester, onChange, onBlur }) => (
 *     <input value={semester.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </SemesterPageContentLazy>
 */
export const SemesterPageContentLazy = ({ semester, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(SemesterReadAsyncAction, semester)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && semester
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && semester
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <SemesterPageContent semester={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    semester: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </SemesterPageContent>
        )}
      </>
    )
}