import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { UserReadAsyncAction } from "../Queries"
import { UserPageContent } from "./UserPageContent"

/**
 * A lazy-loading component for displaying content of a user entity.
 *
 * This component fetches user data using `UserReadAsyncAction`, and passes the result
 * to `UserPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `user` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.user - The user ID to load.
 * @param {(params: { user: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `user` — the fetched user entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `UserPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the user data and displays it,
 * or loading/error state.
 *
 * @example
 * <UserPageContentLazy user={123}>
 *   {({ user, onChange, onBlur }) => (
 *     <input value={user.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </UserPageContentLazy>
 */
export const UserPageContentLazy = ({ user, children }) => {
    const { error, loading, entity, fetch, dispatchResult } = useAsyncAction(UserReadAsyncAction, user)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value ?? e
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value ?? e
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        
        {entity && (
          <UserPageContent user={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              typeof child === "function"
                ? child({ user: entity, onChange: handleChange, onBlur: handleBlur })
                : child
            )}
          </UserPageContent>
        )}
        <hr />
        {JSON.stringify(loading===true)}/{JSON.stringify(dispatchResult)}/{JSON.stringify(children)}< br/>
        {<pre>{JSON.stringify(user, null, 4)}</pre>}
        {<pre>{JSON.stringify(entity, null, 4)}</pre>}
        {<pre>{JSON.stringify(dispatchResult, null, 4)}</pre>}
        <hr />
      </>
    )
}