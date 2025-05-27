import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { FacilityUpdateAsyncAction } from "../Queries";
import { FacilityMediumEditableContent } from "./FacilityMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * FacilityLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `facility` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `FacilityMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`facility`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.facility - Objekt reprezentující editovanou šablonu (facility entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=FacilityUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <FacilityLiveEdit facility={facilityEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <FacilityLiveEdit facility={facilityEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </FacilityLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const FacilityLiveEdit = ({facility, children, asyncAction=FacilityUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, facility, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(facility[id] === value, facility[id], value)
                if (facility[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: facility.id, 
                lastchange: (entity?.lastchange || facility?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <FacilityMediumEditableContent facility={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}