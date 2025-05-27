import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { TopicReadAsyncAction } from "../Queries"
import { TopicPageContent } from "./TopicPageContent"

/**
 * A lazy-loading component for displaying content of a topic entity.
 *
 * This component fetches topic data using `TopicReadAsyncAction`, and passes the result
 * to `TopicPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `topic` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.topic - The topic ID to load.
 * @param {(params: { topic: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `topic` — the fetched topic entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `TopicPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the topic data and displays it,
 * or loading/error state.
 *
 * @example
 * <TopicPageContentLazy topic={123}>
 *   {({ topic, onChange, onBlur }) => (
 *     <input value={topic.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </TopicPageContentLazy>
 */
export const TopicPageContentLazy = ({ topic, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(TopicReadAsyncAction, topic)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && topic
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && topic
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <TopicPageContent topic={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    topic: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </TopicPageContent>
        )}
      </>
    )
}