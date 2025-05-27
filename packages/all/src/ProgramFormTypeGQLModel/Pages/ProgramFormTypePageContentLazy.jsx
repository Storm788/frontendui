import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramFormTypeReadAsyncAction } from "../Queries"
import { ProgramFormTypePageContent } from "./ProgramFormTypePageContent"

/**
 * A lazy-loading component for displaying content of a programformtype entity.
 *
 * This component fetches programformtype data using `ProgramFormTypeReadAsyncAction`, and passes the result
 * to `ProgramFormTypePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `programformtype` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.programformtype - The programformtype ID to load.
 * @param {(params: { programformtype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `programformtype` — the fetched programformtype entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `ProgramFormTypePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the programformtype data and displays it,
 * or loading/error state.
 *
 * @example
 * <ProgramFormTypePageContentLazy programformtype={123}>
 *   {({ programformtype, onChange, onBlur }) => (
 *     <input value={programformtype.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </ProgramFormTypePageContentLazy>
 */
export const ProgramFormTypePageContentLazy = ({ programformtype, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramFormTypeReadAsyncAction, programformtype)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && programformtype
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && programformtype
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <ProgramFormTypePageContent programformtype={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    programformtype: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </ProgramFormTypePageContent>
        )}
      </>
    )
}