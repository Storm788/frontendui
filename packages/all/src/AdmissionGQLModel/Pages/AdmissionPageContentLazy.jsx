import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { AdmissionReadAsyncAction } from "../Queries"
import { AdmissionPageContent } from "./AdmissionPageContent"

/**
 * A lazy-loading component for displaying content of a admission entity.
 *
 * This component fetches admission data using `AdmissionReadAsyncAction`, and passes the result
 * to `AdmissionPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `admission` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.admission - The admission ID to load.
 * @param {(params: { admission: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `admission` — the fetched admission entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `AdmissionPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the admission data and displays it,
 * or loading/error state.
 *
 * @example
 * <AdmissionPageContentLazy admission={123}>
 *   {({ admission, onChange, onBlur }) => (
 *     <input value={admission.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </AdmissionPageContentLazy>
 */
export const AdmissionPageContentLazy = ({ admission, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(AdmissionReadAsyncAction, admission)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && admission
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && admission
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <AdmissionPageContent admission={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    admission: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </AdmissionPageContent>
        )}
      </>
    )
}