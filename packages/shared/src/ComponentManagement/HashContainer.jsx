import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A custom hook to manage and monitor the hash in the URL with React Router.
 *
 * @returns {[string, function]} - A tuple containing the current hash and a function to update it.
 */
export const useHash = () => {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // To programmatically update the hash

    // Extract the hash from the current location
    const hash = location.hash.slice(1); // Remove the leading '#'

    // Function to programmatically update the hash
    const updateHash = (newHash) => {
        navigate(`${location.pathname}#${newHash}`, { replace: true }); // Update the hash in the URL
    };

    return [hash, updateHash];
};

/**
 * A React container component that monitors hash changes in the URL
 * and displays only the children whose `id` matches the current hash.
 *
 * If no children match the current hash:
 * - when `firstAsDefault` is `true`, it renders the *first* child;
 * - otherwise it renders a fallback message.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children
 *   The children components to conditionally render based on the hash.
 * @param {boolean} [props.firstAsDefault=false]
 *   If `true`, shows the first child when there’s no hash match;
 *   if `false`, shows a default fallback message.
 * @returns {JSX.Element}
 *   The rendered child component(s) or a fallback message.
 *
 * @example
 * <HashContainer firstAsDefault>
 *   <div id="tab1">Tab 1 Content</div>
 *   <div id="tab2">Tab 2 Content</div>
 * </HashContainer>
 * // If the URL hash is "#tab3" and firstAsDefault is `true`, it renders "Tab 1 Content".
 */
export const HashContainer = ({ children, firstAsDefault=false }) => {
    const [currentHash] = useHash(); // Use custom hook to track the current hash
    const navigate = useNavigate();
    const location = useLocation();

    // Filter children based on the current hash
    const ReactChildren = React.Children.toArray(children)
    const activeChildren = ReactChildren.filter(
        (child) => React.isValidElement(child) && (!child.props.id || child.props.id === currentHash)
    );

    // Pokud chci první child jako default a žádný nepasuje, změním URL hash
    useEffect(() => {
        if (
        firstAsDefault &&
        activeChildren.length === 0 &&
        ReactChildren.length > 0
        ) {
        const firstChild = ReactChildren[0];
        const firstId = firstChild.props.id;
        if (firstId && currentHash !== firstId) {
            // naviguji na stejnou cestu + nový hash
            navigate(`${location.pathname}#${firstId}`, { replace: true });
        }
        }
    }, [
        firstAsDefault,
        activeChildren.length,
        ReactChildren,
        currentHash,
        navigate,
        location.pathname,
    ]);    

    // pokud mám nějaké matching children, vykreslím je
    if (activeChildren.length > 0) {
        return <>{activeChildren}</>;
    }

    // žádné matching, ale firstAsDefault = true
    if (firstAsDefault && ReactChildren.length > 0) {
        return <>{ReactChildren[0]}</>;
    }

    // fallback zpráva
    return (
        <>
        <p>No matching content for the current hash.</p>
        </>
    );    
};