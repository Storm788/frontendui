import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * LessonTypeChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `lessontype` entity along with other props to all child elements.
 * This component is useful for injecting a common `lessontype` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the LessonTypeChildren component.
 * @param {any} props.lessontype - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `lessontype` entity.
 *
 * @example
 * // Example usage:
 * const lessontypeEntity = { id: 1, message: "No data available" };
 *
 * <LessonTypeChildren lessontype={lessontypeEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </LessonTypeChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'lessontype' prop with the specified entity.
 */
export const LessonTypeChildren = ({lessontype, children, ...props}) => <ChildWrapper lessontype={lessontype} children={children} {...props} />