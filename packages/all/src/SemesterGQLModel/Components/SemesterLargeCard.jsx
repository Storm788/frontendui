import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { SemesterCardCapsule } from "./SemesterCardCapsule"
import { SemesterMediumCard } from "./SemesterMediumCard"
import { SemesterSubjectAttribute } from "../Scalars/SemesterSubjectAttribute"
import { SemesterLink } from "./SemesterLink"
import { Col } from "react-bootstrap"
import { SemesterTopicsAttribute, SemesterTopicsAttributeInfinite } from "../Vectors/SemesterTopicsAttribute"
import { SemesterPlansAttributeInfinite } from "../Vectors/SemesterPlansAttribute"
/**
 * A large card component for displaying detailed content and layout for an semester entity.
 *
 * This component wraps an `SemesterCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `SemesterMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the SemesterLargeCard component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The name or label of the semester entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SemesterLargeCard semester={semesterEntity}>
 *   <p>Additional content for the middle column.</p>
 * </SemesterLargeCard>
 */
export const SemesterLargeCard = ({semester, children}) => {
    return (
        <SemesterCardCapsule semester={semester} >
            <Row>
                <LeftColumn>
                    <SemesterMediumCard semester={semester}/>
                    <SemesterCardCapsule semester={semester} >
                        <SemesterSubjectAttribute semester={semester}/>
                    </SemesterCardCapsule>
                    <SemesterCardCapsule semester={semester} title="Další semestry">
                        {/* {JSON.stringify(semester?.subject)} */}
                        <Row>
                        {semester?.subject?.semesters?.map(
                            s => <Col key={s.id} xs={12} md={3} lg={2} className="mb-2">
                                <SemesterLink semester={s} />
                            </Col>
                        )}
                        </Row>
                        
                    </SemesterCardCapsule>
                    
                    
                </LeftColumn>
                <MiddleColumn>
                    <SemesterTopicsAttributeInfinite semester={semester} />
                    <SemesterPlansAttributeInfinite semester={semester} />
                    {children}
                </MiddleColumn>
            </Row>
        </SemesterCardCapsule>
    )
}
