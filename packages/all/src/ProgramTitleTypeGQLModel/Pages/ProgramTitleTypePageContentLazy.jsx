import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramTitleTypeReadAsyncAction } from "../Queries"
import { ProgramTitleTypePageContent } from "./ProgramTitleTypePageContent"

/**
 * A lazy-loading component for displaying content of a programtitletype entity.
 *
 * This component fetches programtitletype data using `ProgramTitleTypeReadAsyncAction`, and passes the result
 * to `ProgramTitleTypePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `programtitletype` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.programtitletype - The programtitletype ID to load.
 * @param {(params: { programtitletype: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `programtitletype` — the fetched programtitletype entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `ProgramTitleTypePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the programtitletype data and displays it,
 * or loading/error state.
 *
 * @example
 * <ProgramTitleTypePageContentLazy programtitletype={123}>
 *   {({ programtitletype, onChange, onBlur }) => (
 *     <input value={programtitletype.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </ProgramTitleTypePageContentLazy>
 */
export const ProgramTitleTypePageContentLazy = ({ programtitletype, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramTitleTypeReadAsyncAction, programtitletype)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && programtitletype
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && programtitletype
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <ProgramTitleTypePageContent programtitletype={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    programtitletype: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </ProgramTitleTypePageContent>
        )}
      </>
    )
}