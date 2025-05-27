import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLevelTypeUpdateAsyncAction } from "../Queries";
import { ProgramLevelTypeMediumEditableContent } from "./ProgramLevelTypeMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramLevelTypeLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `programleveltype` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `ProgramLevelTypeMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`programleveltype`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.programleveltype - Objekt reprezentující editovanou šablonu (programleveltype entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=ProgramLevelTypeUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <ProgramLevelTypeLiveEdit programleveltype={programleveltypeEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <ProgramLevelTypeLiveEdit programleveltype={programleveltypeEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </ProgramLevelTypeLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const ProgramLevelTypeLiveEdit = ({programleveltype, children, asyncAction=ProgramLevelTypeUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, programleveltype, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(programleveltype[id] === value, programleveltype[id], value)
                if (programleveltype[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: programleveltype.id, 
                lastchange: (entity?.lastchange || programleveltype?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <ProgramLevelTypeMediumEditableContent programleveltype={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}