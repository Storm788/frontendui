import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { TemplateReadAsyncAction } from "../Queries"
import { TemplatePageContent } from "./TemplatePageContent"

/**
 * A lazy-loading component for displaying content of a template entity.
 *
 * This component fetches template data using `TemplateReadAsyncAction`, and passes the result
 * to `TemplatePageContent`. It provides change handlers (`onChange`, `onBlur`) and the `template` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.template - The template ID to load.
 * @param {(params: { template: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `template` — the fetched template entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `TemplatePageContent`.
 *
 * @returns {JSX.Element} A component that fetches the template data and displays it,
 * or loading/error state.
 *
 * @example
 * <TemplatePageContentLazy template={123}>
 *   {({ template, onChange, onBlur }) => (
 *     <input value={template.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </TemplatePageContentLazy>
 */
export const TemplatePageContentLazy = ({ template, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(TemplateReadAsyncAction, template)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && template
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && template
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <TemplatePageContent template={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    template: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </TemplatePageContent>
        )}
      </>
    )
}