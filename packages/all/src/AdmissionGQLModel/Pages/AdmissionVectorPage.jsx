import { useLocation } from "react-router"
import { InfiniteScroll, MyNavbar } from "@hrbolek/uoisfrontend-shared"
import { AdmissionReadPageAsyncAction } from "../Queries"
import { AdmissionMediumCard } from "../Components"
import { Col, Row } from "react-bootstrap"
import { AdmissionInputFilter } from "../Components/AdmissionFilter"
import { useState } from "react"

/**
 * Visualizes a list of admission entities using AdmissionMediumCard.
 *
 * This component receives an array of admission objects via the `items` prop
 * and renders a `AdmissionMediumCard` for each item. Each card is keyed by the admission's `id`.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Array of admission entities to visualize. Each object should have a unique `id` property.
 * @returns {JSX.Element} A fragment containing a list of AdmissionMediumCard components.
 *
 * @example
 * const admissions = [
 *   { id: 1, name: "Admission 1", ... },
 *   { id: 2, name: "Admission 2", ... }
 * ];
 *
 * <AdmissionVisualiser items={admissions} />
 */
const AdmissionVisualiser = ({items}) => {
    return (
        <>
            {items.map(admission => (
                <Col key={admission.id} xs={12} sm={6} md={4} lg={3}>
                    <AdmissionMediumCard key={admission.id} admission={admission} />
                </Col>
            ))}
        </>
    )
}

/**
 * Page component for displaying a (potentially filtered) list of admission entities with infinite scrolling.
 *
 * This component parses the `where` query parameter from the URL (if present), 
 * passes it as a filter to the `InfiniteScroll` component, and visualizes the resulting admissions using the specified `Visualiser`.
 * 
 * You can optionally provide custom children or a custom Visualiser component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} [props.Visualiser=AdmissionVisualiser] - 
 *   Optional component used to visualize the loaded admissions. Receives `items` as prop.
 * @param {React.ReactNode} [props.children] - Optional child elements to render below the visualized admissions.
 *
 * @returns {JSX.Element} The rendered page with infinite scroll and optional children.
 *
 * @example
 * // Will fetch and display admissions filtered by a `where` clause passed in the URL, e.g.:
 * //   /admission?where={"name":"Example"}
 * <AdmissionVectorPage />
 *
 * @example
 * // With a custom visualizer and children:
 * <AdmissionVectorPage Visualiser={CustomAdmissionList}>
 *   <Footer />
 * </AdmissionVectorPage>
 */
export const AdmissionVectorPage = ({children, Visualiser=AdmissionVisualiser}) => {
    const { search } = useLocation();
    let actionParams = { skip: 0, limit: 10 };
    try {
        const params = new URLSearchParams(search);
        const where = params.get('where');        
        actionParams.where = where ? JSON.parse(where) : undefined;
    } catch (e) {
        console.warn("Invalid 'where' query parameter!", e);
    }
    const [filter, setFilter] = useState({})
    return (<>
        <MyNavbar />
        <AdmissionInputFilter value={filter} onChange={setFilter} />
        <Row>
        <InfiniteScroll
            preloadedItems={[]} // No preloaded items for admission
            actionParams={actionParams} 
            asyncAction={AdmissionReadPageAsyncAction}
            Visualiser={Visualiser}
        />
        </Row>
        {children}
    </>)
}