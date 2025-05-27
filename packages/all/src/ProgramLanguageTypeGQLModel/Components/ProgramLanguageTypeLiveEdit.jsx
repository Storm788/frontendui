import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLanguageTypeUpdateAsyncAction } from "../Queries";
import { ProgramLanguageTypeMediumEditableContent } from "./ProgramLanguageTypeMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramLanguageTypeLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `programlanguagetype` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `ProgramLanguageTypeMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`programlanguagetype`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.programlanguagetype - Objekt reprezentující editovanou šablonu (programlanguagetype entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=ProgramLanguageTypeUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <ProgramLanguageTypeLiveEdit programlanguagetype={programlanguagetypeEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <ProgramLanguageTypeLiveEdit programlanguagetype={programlanguagetypeEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </ProgramLanguageTypeLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const ProgramLanguageTypeLiveEdit = ({programlanguagetype, children, asyncAction=ProgramLanguageTypeUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, programlanguagetype, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(programlanguagetype[id] === value, programlanguagetype[id], value)
                if (programlanguagetype[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: programlanguagetype.id, 
                lastchange: (entity?.lastchange || programlanguagetype?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <ProgramLanguageTypeMediumEditableContent programlanguagetype={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}