import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { LessonReadAsyncAction } from "../Queries"
import { LessonPageContent } from "./LessonPageContent"

/**
 * A lazy-loading component for displaying content of a lesson entity.
 *
 * This component fetches lesson data using `LessonReadAsyncAction`, and passes the result
 * to `LessonPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `lesson` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.lesson - The lesson ID to load.
 * @param {(params: { lesson: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `lesson` — the fetched lesson entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `LessonPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the lesson data and displays it,
 * or loading/error state.
 *
 * @example
 * <LessonPageContentLazy lesson={123}>
 *   {({ lesson, onChange, onBlur }) => (
 *     <input value={lesson.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </LessonPageContentLazy>
 */
export const LessonPageContentLazy = ({ lesson, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(LessonReadAsyncAction, lesson)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && lesson
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && lesson
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <LessonPageContent lesson={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    lesson: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </LessonPageContent>
        )}
      </>
    )
}