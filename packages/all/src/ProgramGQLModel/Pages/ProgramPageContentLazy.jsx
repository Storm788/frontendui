import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ProgramReadAsyncAction } from "../Queries"
import { ProgramPageContent } from "./ProgramPageContent"

/**
 * A lazy-loading component for displaying content of a program entity.
 *
 * This component fetches program data using `ProgramReadAsyncAction`, and passes the result
 * to `ProgramPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `program` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.program - The program ID to load.
 * @param {(params: { program: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `program` — the fetched program entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `ProgramPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the program data and displays it,
 * or loading/error state.
 *
 * @example
 * <ProgramPageContentLazy program={123}>
 *   {({ program, onChange, onBlur }) => (
 *     <input value={program.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </ProgramPageContentLazy>
 */
export const ProgramPageContentLazy = ({ program, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(ProgramReadAsyncAction, program)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value || program
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value || program
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <ProgramPageContent program={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    program: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </ProgramPageContent>
        )}
      </>
    )
}