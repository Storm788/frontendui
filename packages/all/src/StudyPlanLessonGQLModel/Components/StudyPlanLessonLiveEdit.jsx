import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyPlanLessonUpdateAsyncAction } from "../Queries";
import { StudyPlanLessonMediumEditableContent } from "./StudyPlanLessonMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * StudyPlanLessonLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `studyplanlesson` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `StudyPlanLessonMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`studyplanlesson`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.studyplanlesson - Objekt reprezentující editovanou šablonu (studyplanlesson entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=StudyPlanLessonUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <StudyPlanLessonLiveEdit studyplanlesson={studyplanlessonEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <StudyPlanLessonLiveEdit studyplanlesson={studyplanlessonEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </StudyPlanLessonLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const StudyPlanLessonLiveEdit = ({studyplanlesson, children, asyncAction=StudyPlanLessonUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, studyplanlesson, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(studyplanlesson[id] === value, studyplanlesson[id], value)
                if (studyplanlesson[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: studyplanlesson.id, 
                lastchange: (entity?.lastchange || studyplanlesson?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <StudyPlanLessonMediumEditableContent studyplanlesson={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}