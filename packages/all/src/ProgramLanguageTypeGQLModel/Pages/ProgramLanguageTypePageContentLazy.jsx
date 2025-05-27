import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramLanguageTypeReadAsyncAction } from "../Queries"
import { ProgramLanguageTypePageContent } from "./ProgramLanguageTypePageContent"

/**
 * A lazy-loading component for displaying content of a programlanguagetype entity.
 *
 * This component fetches programlanguagetype data using `ProgramLanguageTypeReadAsyncAction`, and passes the result
 * to `ProgramLanguageTypePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `programlanguagetype` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.programlanguagetype - The programlanguagetype ID to load.
 * @param {(params: { programlanguagetype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `programlanguagetype` — the fetched programlanguagetype entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `ProgramLanguageTypePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the programlanguagetype data and displays it,
 * or loading/error state.
 *
 * @example
 * <ProgramLanguageTypePageContentLazy programlanguagetype={123}>
 *   {({ programlanguagetype, onChange, onBlur }) => (
 *     <input value={programlanguagetype.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </ProgramLanguageTypePageContentLazy>
 */
export const ProgramLanguageTypePageContentLazy = ({ programlanguagetype, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramLanguageTypeReadAsyncAction, programlanguagetype)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && programlanguagetype
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && programlanguagetype
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <ProgramLanguageTypePageContent programlanguagetype={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    programlanguagetype: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </ProgramLanguageTypePageContent>
        )}
      </>
    )
}