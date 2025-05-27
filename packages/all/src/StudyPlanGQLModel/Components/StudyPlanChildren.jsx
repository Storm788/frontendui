import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StudyPlanChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `studyplan` entity along with other props to all child elements.
 * This component is useful for injecting a common `studyplan` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StudyPlanChildren component.
 * @param {any} props.studyplan - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `studyplan` entity.
 *
 * @example
 * // Example usage:
 * const studyplanEntity = { id: 1, message: "No data available" };
 *
 * <StudyPlanChildren studyplan={studyplanEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StudyPlanChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'studyplan' prop with the specified entity.
 */
export const StudyPlanChildren = ({studyplan, children, ...props}) => <ChildWrapper studyplan={studyplan} children={children} {...props} />