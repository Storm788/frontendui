import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { LessonTypeUpdateAsyncAction } from "../Queries";
import { LessonTypeMediumEditableContent } from "./LessonTypeMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * LessonTypeLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `lessontype` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `LessonTypeMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`lessontype`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.lessontype - Objekt reprezentující editovanou šablonu (lessontype entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=LessonTypeUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <LessonTypeLiveEdit lessontype={lessontypeEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <LessonTypeLiveEdit lessontype={lessontypeEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </LessonTypeLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const LessonTypeLiveEdit = ({lessontype, children, asyncAction=LessonTypeUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, lessontype, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(lessontype[id] === value, lessontype[id], value)
                if (lessontype[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: lessontype.id, 
                lastchange: (entity?.lastchange || lessontype?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <LessonTypeMediumEditableContent lessontype={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}