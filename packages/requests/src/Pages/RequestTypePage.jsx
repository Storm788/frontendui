import { useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import { createLazyComponent, ErrorHandler, LeftColumn, LoadingSpinner, MiddleColumn, SimpleCardCapsule } from "@hrbolek/uoisfrontend-shared"
import { useParams } from "react-router"
import { RequestPageNavbar } from "./RequestPageNavbar"
import { RequestTypeReadAsyncAction } from './Queries/RequestTypeReadAsyncAction'
import { FormCreateButtonDialog } from '../Components/Form/FormCreateButtonDialog'
import { FormSectionAttribute, FormSectionAttributeView } from '../Components/Form/Vectors/FormSectionsAttribute'
import { useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'
import { RequestTypeInsertAsyncAction } from './Queries/RequestTypeInsertMutation'
import { RequestTypeUpdateAsyncAction } from './Queries/RequestTypeUpdateAsyncAction'
import { HorizontalLine } from '../Components/Part'
import { Item } from '../Components/Item/Item'
import { ItemIndex } from '../Components/Item/Visualisers'
import { DragableEnvelop, DragDropContext, DroppableContainer } from '../Components/DragAndDrop/dad'

/**
 * A page content component for displaying detailed information about an requesttype entity.
 *
 * This component utilizes `RequestTypeLargeCard` to create a structured layout and displays 
 * the serialized representation of the `requesttype` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the RequestTypePageContent component.
 * @param {Object} props.requesttype - The object representing the requesttype entity.
 * @param {string|number} props.requesttype.id - The unique identifier for the requesttype entity.
 * @param {string} props.requesttype.name - The name or label of the requesttype entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an requesttype entity.
 *
 * @example
 * // Example usage:
 * const requesttypeEntity = { id: 123, name: "Sample Entity" };
 * 
 * <RequestTypePageContent requesttype={requesttypeEntity} />
 */
const RequestTypePageContent = ({requesttype}) => {
    const { groupId, templateFormId, templateForm } = requesttype
    const { fetch: updateRequestType, loading, error } = useAsyncAction(RequestTypeUpdateAsyncAction, {...requesttype}, {deferred: true})
    const onCreateForm = (form) => {
        updateRequestType({...requesttype, template_form_id: form.id})
    }
    return (
        <>
            <RequestPageNavbar />
            <Row>
                {/* <LeftColumn></LeftColumn> */}
                <MiddleColumn>
                    RequestType {JSON.stringify(requesttype)}<br />
                    {!templateFormId && <>
                        "Není nastaven formulář"
                        <FormCreateButtonDialog 
                            className="btn btn-outline-primary"
                            onCreate={onCreateForm}
                        >
                            Vytvořit formulář
                        </FormCreateButtonDialog>
                    </>}
                    {/* {templateFormId && <FormSectionAttribute form={templateForm} />} */}
                    {templateFormId && <FormDesigner form={templateForm} />}
                    <br />
                    {!groupId && <>
                        "Není nastavena skupina"
                    </>}
                    {loading && <LoadingSpinner text='Ukládám' />}
                    {error && <ErrorHandler errors={error} />}
                </MiddleColumn>
            </Row>
        </>
    )
}

const FormDesigner = ({form}) => {
    const index = useMemo(
        () => {
            const result = {[form.id]: form}
            form?.sections.forEach(
                (section) => {
                    result[section.id] = {...section, form}
                    section?.parts.forEach(
                        (part) => {
                            result[part.id] = {...part, section}
                            part?.items.forEach(
                                (item) => {
                                    result[item.id] = {...item, part}
                                }
                            )
                        }
                    )
                }
            )
            return result
        },
        [form]
    )

    const onDragEnd = (result) => {
        console.log("onDragEnd", result)
        if (!result.destination) return;

        // const reorderedSections = Array.from(sections);
        // const [movedSection] = reorderedSections.splice(result.source.index, 1);
        // reorderedSections.splice(result.destination.index, 0, movedSection);

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Row>
                <LeftColumn>
                    <DroppableContainer droppableId="library" >
                        {/* {ItemIndex.map(
                            (Visualiser, i) => <Visualiser key={i}/>
                        )} */}
                    </DroppableContainer>
                </LeftColumn>
                <MiddleColumn>
                    <DroppableContainer droppableId="form" >
                        <SimpleCardCapsule title={form.name}>
                            {form?.sections.map(
                                (section, i) => <DragableEnvelop draggableId={section.id} index={i}>
                                    <SimpleCardCapsule title={section?.name}>
                                        {section?.parts.map(
                                            (part, j) => <DragableEnvelop draggableId={part.id} index={j}>
                                                <SimpleCardCapsule title={part?.name}>
                                                    <DroppableContainer droppableId={part.id} >
                                                        {part?.items.map(
                                                            (item, k) => <DragableEnvelop draggableId={item.id} index={k}>
                                                                <SimpleCardCapsule title={item?.name}>
                                                                    <Item item={item}/>
                                                                </SimpleCardCapsule>
                                                            </DragableEnvelop>
                                                        )}
                                                    </DroppableContainer>
                                                </SimpleCardCapsule>
                                                <HorizontalLine>Plus</HorizontalLine>
                                            </DragableEnvelop>
                                        )}
                                    </SimpleCardCapsule>
                                </DragableEnvelop>
                            )}
                            <HorizontalLine>Plus</HorizontalLine>
                        </SimpleCardCapsule>
                    </DroppableContainer>
                </MiddleColumn>
            </Row>
        </DragDropContext>
    )
}

/**
 * A lazy-loading component for displaying the content of a `requesttype` entity.
 *
 * This component is created using `createLazyComponent` and wraps `RequestTypePageContent` to provide
 * automatic data fetching for the `requesttype` entity. It uses the `RequestTypeReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `requesttype` prop.
 *
 * @constant
 * @type {React.ComponentType}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {Object} props.requesttype - An object representing the `requesttype` entity.
 * @param {string|number} props.requesttype.id - The unique identifier of the `requesttype` entity to fetch and display.
 *
 * @returns {JSX.Element} A lazy-loading component that fetches the `requesttype` entity data and displays it
 * using `RequestTypePageContent`. The component manages loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const requesttypeId = "12345";
 *
 * <RequestTypePageContentLazy requesttype={{ id: requesttypeId }} />
 */
const RequestTypePageContentLazy = createLazyComponent(RequestTypePageContent, "requesttype", RequestTypeReadAsyncAction)

/**
 * A page component for displaying lazy-loaded content of an requesttype entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `requesttype` object, and passes it to the `RequestTypePageContentLazy` component.
 * The `RequestTypePageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the requesttype entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/requesttype/:id" element={<RequestTypePage />} />
 *
 * // Navigating to "/requesttype/12345" will render the page for the requesttype entity with ID 12345.
 */
export const RequestTypePage = () => {
    const { id } = useParams()
    const requesttype = {id}
    if (id) return <RequestTypePageContentLazy requesttype={requesttype} />
}
