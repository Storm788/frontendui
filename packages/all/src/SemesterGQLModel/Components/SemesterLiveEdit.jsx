import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { SemesterUpdateAsyncAction } from "../Queries";
import { SemesterMediumEditableContent } from "./SemesterMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * SemesterLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `semester` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `SemesterMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`semester`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.semester - Objekt reprezentující editovanou šablonu (semester entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=SemesterUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <SemesterLiveEdit semester={semesterEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <SemesterLiveEdit semester={semesterEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </SemesterLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const SemesterLiveEdit = ({semester, children, asyncAction=SemesterUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, semester, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(semester[id] === value, semester[id], value)
                if (semester[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: semester.id, 
                lastchange: (entity?.lastchange || semester?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <SemesterMediumEditableContent semester={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}