import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonUpdateAsyncAction } from "../Queries";
import { LessonMediumEditableContent } from "./LessonMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * LessonLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `lesson` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `LessonMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`lesson`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.lesson - Objekt reprezentující editovanou šablonu (lesson entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=LessonUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <LessonLiveEdit lesson={lessonEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <LessonLiveEdit lesson={lessonEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </LessonLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const LessonLiveEdit = ({lesson, children, asyncAction=LessonUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, lesson, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(lesson[id] === value, lesson[id], value)
                if (lesson[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: lesson.id, 
                lastchange: (entity?.lastchange || lesson?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <LessonMediumEditableContent lesson={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}