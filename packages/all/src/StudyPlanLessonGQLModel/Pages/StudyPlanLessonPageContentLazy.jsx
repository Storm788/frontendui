import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudyPlanLessonReadAsyncAction } from "../Queries"
import { StudyPlanLessonPageContent } from "./StudyPlanLessonPageContent"

/**
 * A lazy-loading component for displaying content of a studyplanlesson entity.
 *
 * This component fetches studyplanlesson data using `StudyPlanLessonReadAsyncAction`, and passes the result
 * to `StudyPlanLessonPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `studyplanlesson` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.studyplanlesson - The studyplanlesson ID to load.
 * @param {(params: { studyplanlesson: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `studyplanlesson` — the fetched studyplanlesson entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `StudyPlanLessonPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the studyplanlesson data and displays it,
 * or loading/error state.
 *
 * @example
 * <StudyPlanLessonPageContentLazy studyplanlesson={123}>
 *   {({ studyplanlesson, onChange, onBlur }) => (
 *     <input value={studyplanlesson.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </StudyPlanLessonPageContentLazy>
 */
export const StudyPlanLessonPageContentLazy = ({ studyplanlesson, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudyPlanLessonReadAsyncAction, studyplanlesson)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && studyplanlesson
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && studyplanlesson
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <StudyPlanLessonPageContent studyplanlesson={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    studyplanlesson: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </StudyPlanLessonPageContent>
        )}
      </>
    )
}