import React, { useState } from "react"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { PaymentReadAsyncAction } from "../Queries"
import { PaymentPageContent } from "./PaymentPageContent"

/**
 * A lazy-loading component for displaying content of a payment entity.
 *
 * This component fetches payment data using `PaymentReadAsyncAction`, and passes the result
 * to `PaymentPageContent`. It provides change handlers (`onChange`, `onBlur`) and the `payment` entity
 * to its children via a render function.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|number} props.payment - The payment ID to load.
 * @param {(params: { payment: Object, onChange: function, onBlur: function }) => React.ReactNode} [props.children] -
 *   Optional render function (function-as-children) that receives:
 *   - `payment` — the fetched payment entity,
 *   - `onChange` — function to re-fetch when value changes,
 *   - `onBlur` — function to re-fetch when value is blurred.
 *
 * If `children` is not a function, it is rendered as-is inside `PaymentPageContent`.
 *
 * @returns {JSX.Element} A component that fetches the payment data and displays it,
 * or loading/error state.
 *
 * @example
 * <PaymentPageContentLazy payment={123}>
 *   {({ payment, onChange, onBlur }) => (
 *     <input value={payment.name} onChange={onChange} onBlur={onBlur} />
 *   )}
 * </PaymentPageContentLazy>
 */
export const PaymentPageContentLazy = ({ payment, children }) => {
    const { error, loading, entity, fetch } = useAsyncAction(PaymentReadAsyncAction, payment)
    const [delayer] = useState(() => CreateDelayer())
  
    const handleChange = async (e) => {
      const value = e?.target?.value && payment
      await delayer(() => fetch(value))
    }
  
    const handleBlur = async (e) => {
      const value = e?.target?.value && payment
      await delayer(() => fetch(value))
    }
  
    return (
      <>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
          <PaymentPageContent payment={entity} onChange={handleChange} onBlur={handleBlur}>
            {React.Children.map(children, child =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    ...child.props,
                    payment: entity,
                    onChange: handleChange,
                    onBlur: handleBlur
                  })
                : child
            )}
          </PaymentPageContent>
        )}
      </>
    )
}