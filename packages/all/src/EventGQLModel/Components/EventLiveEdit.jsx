import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { EventUpdateAsyncAction } from "../Queries";
import { EventMediumEditableContent } from "./EventMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * EventLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `event` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `EventMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`event`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.event - Objekt reprezentující editovanou šablonu (event entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=EventUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <EventLiveEdit event={eventEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <EventLiveEdit event={eventEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </EventLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const EventLiveEdit = ({event, children, asyncAction=EventUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, event, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(event[id] === value, event[id], value)
                if (event[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: event.id, 
                lastchange: (entity?.lastchange || event?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <EventMediumEditableContent event={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}