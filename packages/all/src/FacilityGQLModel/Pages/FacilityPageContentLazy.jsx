import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { FacilityReadAsyncAction } from "../Queries"
import { FacilityPageContent } from "./FacilityPageContent"

/**
 * A lazy-loading component for displaying content of a facility entity.
 *
 * This component fetches facility data using `FacilityReadAsyncAction`, and passes the result
 * to `FacilityPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `facility` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.facility - The facility ID to load.
 * @param {(params: { facility: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `facility` — the fetched facility entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `FacilityPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the facility data and displays it,
 * or loading/error state.
 *
 * @example
 * <FacilityPageContentLazy facility={123}>
 *   {({ facility, onChange, onBlur }) => (
 *     <input value={facility.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </FacilityPageContentLazy>
 */
export const FacilityPageContentLazy = ({ facility, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(FacilityReadAsyncAction, facility)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && facility
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && facility
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <FacilityPageContent facility={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    facility: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </FacilityPageContent>
        )}
      </>
    )
}