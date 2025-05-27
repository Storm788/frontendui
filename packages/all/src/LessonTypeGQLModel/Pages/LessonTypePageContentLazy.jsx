import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { LessonTypeReadAsyncAction } from "../Queries"
import { LessonTypePageContent } from "./LessonTypePageContent"

/**
 * A lazy-loading component for displaying content of a lessontype entity.
 *
 * This component fetches lessontype data using `LessonTypeReadAsyncAction`, and passes the result
 * to `LessonTypePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `lessontype` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.lessontype - The lessontype ID to load.
 * @param {(params: { lessontype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `lessontype` — the fetched lessontype entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `LessonTypePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the lessontype data and displays it,
 * or loading/error state.
 *
 * @example
 * <LessonTypePageContentLazy lessontype={123}>
 *   {({ lessontype, onChange, onBlur }) => (
 *     <input value={lessontype.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </LessonTypePageContentLazy>
 */
export const LessonTypePageContentLazy = ({ lessontype, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(LessonTypeReadAsyncAction, lessontype)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && lessontype
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && lessontype
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <LessonTypePageContent lessontype={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    lessontype: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </LessonTypePageContent>
        )}
      </>
    )
}