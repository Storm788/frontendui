import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramFormTypeUpdateAsyncAction } from "../Queries";
import { ProgramFormTypeMediumEditableContent } from "./ProgramFormTypeMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramFormTypeLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `programformtype` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `ProgramFormTypeMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`programformtype`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.programformtype - Objekt reprezentující editovanou šablonu (programformtype entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=ProgramFormTypeUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <ProgramFormTypeLiveEdit programformtype={programformtypeEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <ProgramFormTypeLiveEdit programformtype={programformtypeEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </ProgramFormTypeLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const ProgramFormTypeLiveEdit = ({programformtype, children, asyncAction=ProgramFormTypeUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, programformtype, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(programformtype[id] === value, programformtype[id], value)
                if (programformtype[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: programformtype.id, 
                lastchange: (entity?.lastchange || programformtype?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <ProgramFormTypeMediumEditableContent programformtype={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}