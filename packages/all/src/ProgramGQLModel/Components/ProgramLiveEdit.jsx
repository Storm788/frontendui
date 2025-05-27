import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramUpdateAsyncAction } from "../Queries";
import { ProgramMediumEditableContent } from "./ProgramMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `program` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `ProgramMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`program`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.program - Objekt reprezentující editovanou šablonu (program entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=ProgramUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <ProgramLiveEdit program={programEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <ProgramLiveEdit program={programEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </ProgramLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const ProgramLiveEdit = ({program, children, asyncAction=ProgramUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, program, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(program[id] === value, program[id], value)
                if (program[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: program.id, 
                lastchange: (entity?.lastchange || program?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <ProgramMediumEditableContent program={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}