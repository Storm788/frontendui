import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { EventReadAsyncAction } from "../Queries"
import { EventPageContent } from "./EventPageContent"

/**
 * A lazy-loading component for displaying content of a event entity.
 *
 * This component fetches event data using `EventReadAsyncAction`, and passes the result
 * to `EventPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `event` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.event - The event ID to load.
 * @param {(params: { event: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `event` — the fetched event entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `EventPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the event data and displays it,
 * or loading/error state.
 *
 * @example
 * <EventPageContentLazy event={123}>
 *   {({ event, onChange, onBlur }) => (
 *     <input value={event.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </EventPageContentLazy>
 */
export const EventPageContentLazy = ({ event, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(EventReadAsyncAction, event)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && event
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && event
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <EventPageContent event={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    event: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </EventPageContent>
        )}
      </>
    )
}