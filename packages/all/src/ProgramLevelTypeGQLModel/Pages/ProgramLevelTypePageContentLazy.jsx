import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramLevelTypeReadAsyncAction } from "../Queries"
import { ProgramLevelTypePageContent } from "./ProgramLevelTypePageContent"

/**
 * A lazy-loading component for displaying content of a programleveltype entity.
 *
 * This component fetches programleveltype data using `ProgramLevelTypeReadAsyncAction`, and passes the result
 * to `ProgramLevelTypePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `programleveltype` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.programleveltype - The programleveltype ID to load.
 * @param {(params: { programleveltype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `programleveltype` — the fetched programleveltype entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `ProgramLevelTypePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the programleveltype data and displays it,
 * or loading/error state.
 *
 * @example
 * <ProgramLevelTypePageContentLazy programleveltype={123}>
 *   {({ programleveltype, onChange, onBlur }) => (
 *     <input value={programleveltype.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </ProgramLevelTypePageContentLazy>
 */
export const ProgramLevelTypePageContentLazy = ({ programleveltype, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramLevelTypeReadAsyncAction, programleveltype)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && programleveltype
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && programleveltype
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <ProgramLevelTypePageContent programleveltype={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    programleveltype: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </ProgramLevelTypePageContent>
        )}
      </>
    )
}