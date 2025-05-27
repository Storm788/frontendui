import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramTypeReadAsyncAction } from "../Queries"
import { ProgramTypePageContent } from "./ProgramTypePageContent"

/**
 * A lazy-loading component for displaying content of a programtype entity.
 *
 * This component fetches programtype data using `ProgramTypeReadAsyncAction`, and passes the result
 * to `ProgramTypePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `programtype` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.programtype - The programtype ID to load.
 * @param {(params: { programtype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `programtype` — the fetched programtype entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `ProgramTypePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the programtype data and displays it,
 * or loading/error state.
 *
 * @example
 * <ProgramTypePageContentLazy programtype={123}>
 *   {({ programtype, onChange, onBlur }) => (
 *     <input value={programtype.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </ProgramTypePageContentLazy>
 */
export const ProgramTypePageContentLazy = ({ programtype, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramTypeReadAsyncAction, programtype)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && programtype
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && programtype
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <ProgramTypePageContent programtype={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    programtype: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </ProgramTypePageContent>
        )}
      </>
    )
}