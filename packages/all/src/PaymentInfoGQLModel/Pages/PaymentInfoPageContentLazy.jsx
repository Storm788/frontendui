import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { PaymentInfoReadAsyncAction } from "../Queries"
import { PaymentInfoPageContent } from "./PaymentInfoPageContent"

/**
 * A lazy-loading component for displaying content of a paymentinfo entity.
 *
 * This component fetches paymentinfo data using `PaymentInfoReadAsyncAction`, and passes the result
 * to `PaymentInfoPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `paymentinfo` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.paymentinfo - The paymentinfo ID to load.
 * @param {(params: { paymentinfo: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `paymentinfo` — the fetched paymentinfo entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `PaymentInfoPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the paymentinfo data and displays it,
 * or loading/error state.
 *
 * @example
 * <PaymentInfoPageContentLazy paymentinfo={123}>
 *   {({ paymentinfo, onChange, onBlur }) => (
 *     <input value={paymentinfo.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </PaymentInfoPageContentLazy>
 */
export const PaymentInfoPageContentLazy = ({ paymentinfo, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(PaymentInfoReadAsyncAction, paymentinfo)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && paymentinfo
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && paymentinfo
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <PaymentInfoPageContent paymentinfo={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    paymentinfo: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </PaymentInfoPageContent>
        )}
      </>
    )
}