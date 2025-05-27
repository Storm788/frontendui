import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { SubjectUpdateAsyncAction } from "../Queries";
import { SubjectMediumEditableContent } from "./SubjectMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * SubjectLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `subject` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `SubjectMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`subject`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.subject - Objekt reprezentující editovanou šablonu (subject entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=SubjectUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <SubjectLiveEdit subject={subjectEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <SubjectLiveEdit subject={subjectEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </SubjectLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const SubjectLiveEdit = ({subject, children, asyncAction=SubjectUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, subject, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(subject[id] === value, subject[id], value)
                if (subject[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: subject.id, 
                lastchange: (entity?.lastchange || subject?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <SubjectMediumEditableContent subject={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}