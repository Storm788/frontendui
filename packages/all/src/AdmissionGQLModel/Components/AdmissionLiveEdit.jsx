import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionUpdateAsyncAction } from "../Queries";
import { AdmissionMediumEditableContent } from "./AdmissionMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * AdmissionLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `admission` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `AdmissionMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`admission`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.admission - Objekt reprezentující editovanou šablonu (admission entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=AdmissionUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <AdmissionLiveEdit admission={admissionEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <AdmissionLiveEdit admission={admissionEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </AdmissionLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const AdmissionLiveEdit = ({admission, children, asyncAction=AdmissionUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, admission, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(admission[id] === value, admission[id], value)
                if (admission[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: admission.id, 
                lastchange: (entity?.lastchange || admission?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <AdmissionMediumEditableContent admission={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}