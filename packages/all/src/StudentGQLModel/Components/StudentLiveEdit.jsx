import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentUpdateAsyncAction } from "../Queries";
import { StudentMediumEditableContent } from "./StudentMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * StudentLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `student` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `StudentMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`student`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.student - Objekt reprezentující editovanou šablonu (student entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=StudentUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <StudentLiveEdit student={studentEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <StudentLiveEdit student={studentEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </StudentLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const StudentLiveEdit = ({student, children, asyncAction=StudentUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, student, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(student[id] === value, student[id], value)
                if (student[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: student.id, 
                lastchange: (entity?.lastchange || student?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <StudentMediumEditableContent student={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}