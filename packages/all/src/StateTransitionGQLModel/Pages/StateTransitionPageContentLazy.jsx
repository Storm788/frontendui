import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateTransitionReadAsyncAction } from "../Queries"
import { StateTransitionPageContent } from "./StateTransitionPageContent"

/**
 * A lazy-loading component for displaying content of a statetransition entity.
 *
 * This component fetches statetransition data using `StateTransitionReadAsyncAction`, and passes the result
 * to `StateTransitionPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `statetransition` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.statetransition - The statetransition ID to load.
 * @param {(params: { statetransition: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `statetransition` — the fetched statetransition entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `StateTransitionPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the statetransition data and displays it,
 * or loading/error state.
 *
 * @example
 * <StateTransitionPageContentLazy statetransition={123}>
 *   {({ statetransition, onChange, onBlur }) => (
 *     <input value={statetransition.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </StateTransitionPageContentLazy>
 */
export const StateTransitionPageContentLazy = ({ statetransition, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(StateTransitionReadAsyncAction, statetransition)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && statetransition
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && statetransition
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <StateTransitionPageContent statetransition={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    statetransition: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </StateTransitionPageContent>
        )}
      </>
    )
}