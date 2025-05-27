import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupUpdateAsyncAction } from "../Queries";
import { GroupMediumEditableContent } from "./GroupMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * GroupLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `group` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `GroupMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`group`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.group - Objekt reprezentující editovanou šablonu (group entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=GroupUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <GroupLiveEdit group={groupEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <GroupLiveEdit group={groupEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </GroupLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const GroupLiveEdit = ({group, children, asyncAction=GroupUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, group, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(group[id] === value, group[id], value)
                if (group[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: group.id, 
                lastchange: (entity?.lastchange || group?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <GroupMediumEditableContent group={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}