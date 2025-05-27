import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { StateReadAsyncAction } from "../Queries"
import { StatePageContent } from "./StatePageContent"

/**
 * A lazy-loading component for displaying content of a state entity.
 *
 * This component fetches state data using `StateReadAsyncAction`, and passes the result
 * to `StatePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `state` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.state - The state ID to load.
 * @param {(params: { state: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `state` — the fetched state entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `StatePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the state data and displays it,
 * or loading/error state.
 *
 * @example
 * <StatePageContentLazy state={123}>
 *   {({ state, onChange, onBlur }) => (
 *     <input value={state.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </StatePageContentLazy>
 */
export const StatePageContentLazy = ({ state, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(StateReadAsyncAction, state)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && state
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && state
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <StatePageContent state={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    state: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </StatePageContent>
        )}
      </>
    )
}