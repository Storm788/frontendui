import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StudyPlanReadAsyncAction } from "../Queries"
import { StudyPlanPageContent } from "./StudyPlanPageContent"

/**
 * A lazy-loading component for displaying content of a studyplan entity.
 *
 * This component fetches studyplan data using `StudyPlanReadAsyncAction`, and passes the result
 * to `StudyPlanPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `studyplan` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.studyplan - The studyplan ID to load.
 * @param {(params: { studyplan: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `studyplan` — the fetched studyplan entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `StudyPlanPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the studyplan data and displays it,
 * or loading/error state.
 *
 * @example
 * <StudyPlanPageContentLazy studyplan={123}>
 *   {({ studyplan, onChange, onBlur }) => (
 *     <input value={studyplan.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </StudyPlanPageContentLazy>
 */
export const StudyPlanPageContentLazy = ({ studyplan, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(StudyPlanReadAsyncAction, studyplan)
    const [delayer] = useState(() => CreateDelayer())
    console.log("StudyPlanPageContentLazy.render")
    const handleChange = async (e) => {
      const value = e?.target?.value && studyplan
      console.log("StudyPlanPageContentLazy.handleChange", value)
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && studyplan
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <StudyPlanPageContent studyplan={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    studyplan: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </StudyPlanPageContent>
        )}
      </>
    )
}