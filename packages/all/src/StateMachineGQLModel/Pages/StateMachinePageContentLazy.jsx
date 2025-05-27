import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateMachineReadAsyncAction } from "../Queries"
import { StateMachinePageContent } from "./StateMachinePageContent"

/**
 * A lazy-loading component for displaying content of a statemachine entity.
 *
 * This component fetches statemachine data using `StateMachineReadAsyncAction`, and passes the result
 * to `StateMachinePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `statemachine` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.statemachine - The statemachine ID to load.
 * @param {(params: { statemachine: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `statemachine` — the fetched statemachine entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `StateMachinePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the statemachine data and displays it,
 * or loading/error state.
 *
 * @example
 * <StateMachinePageContentLazy statemachine={123}>
 *   {({ statemachine, onChange, onBlur }) => (
 *     <input value={statemachine.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </StateMachinePageContentLazy>
 */
export const StateMachinePageContentLazy = ({ statemachine, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(StateMachineReadAsyncAction, statemachine)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && statemachine
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && statemachine
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <StateMachinePageContent statemachine={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    statemachine: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </StateMachinePageContent>
        )}
      </>
    )
}