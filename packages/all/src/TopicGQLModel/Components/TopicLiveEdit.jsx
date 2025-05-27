import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { TopicUpdateAsyncAction } from "../Queries";
import { TopicMediumEditableContent } from "./TopicMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * TopicLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `topic` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `TopicMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`topic`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.topic - Objekt reprezentující editovanou šablonu (topic entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=TopicUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <TopicLiveEdit topic={topicEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <TopicLiveEdit topic={topicEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </TopicLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const TopicLiveEdit = ({topic, children, asyncAction=TopicUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, topic, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(topic[id] === value, topic[id], value)
                if (topic[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: topic.id, 
                lastchange: (entity?.lastchange || topic?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <TopicMediumEditableContent topic={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}