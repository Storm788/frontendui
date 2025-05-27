import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";
import { useState } from "react";

/**
 * A custom React hook for managing and updating local model state with delayed (debounced) submission.
 *
 * This hook is useful when editing a data model (e.g., a form) where updates should be submitted asynchronously
 * but not immediately on every keystroke. Changes are delayed using a debouncer (`CreateDelayer`) and submitted
 * via the provided `onSubmit` callback.
 *
 * @function useDelayedModelUpdate
 * @param {Object} initialData - The initial data object representing the model.
 * @param {Function} onSubmit - A function called with the updated model to perform async updates (e.g., API call).
 *                              Must return a Promise that resolves to the updated model.
 *
 * @returns {Object} Hook return values.
 * @returns {Object} return.state - The current state of the local model.
 * @returns {Function} return.setState - A setter function to manually override the model state.
 * @returns {Function} return.handleChange - A change handler to attach to form inputs (expects `e.target.id` and `e.target.value`).
 *
 * @example
 * const { state, handleChange } = useDelayedModelUpdate(user, (newData) => updateUserAsync(newData));
 *
 * return (
 *   <input id="name" value={state.name} onChange={handleChange} />
 * );
 */
export const useDelayedModelUpdate = (initialData, onSubmit) => {
  const [state, setState] = useState(initialData);
  const [delayer] = useState(() => CreateDelayer());

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (state[id] === value) return;

    const newState = { ...state, [id]: value };
    if (typeof initialData[id] === "number") {
      newState[id] = Number(value);
    }

    delayer(async () => {
      const updated = await onSubmit(newState);
      setState(updated);
    });
  };

  return { state, setState, handleChange };
};
