import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { RoleReadAsyncAction } from "../Queries"
import { RolePageContent } from "./RolePageContent"

/**
 * A lazy-loading component for displaying content of a role entity.
 *
 * This component fetches role data using `RoleReadAsyncAction`, and passes the result
 * to `RolePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `role` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.role - The role ID to load.
 * @param {(params: { role: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `role` — the fetched role entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `RolePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the role data and displays it,
 * or loading/error state.
 *
 * @example
 * <RolePageContentLazy role={123}>
 *   {({ role, onChange, onBlur }) => (
 *     <input value={role.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </RolePageContentLazy>
 */
export const RolePageContentLazy = ({ role, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(RoleReadAsyncAction, role)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && role
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && role
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <RolePageContent role={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    role: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </RolePageContent>
        )}
      </>
    )
}