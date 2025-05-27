import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramTitleTypeUpdateAsyncAction } from "../Queries";
import { ProgramTitleTypeMediumEditableContent } from "./ProgramTitleTypeMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramTitleTypeLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `programtitletype` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `ProgramTitleTypeMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`programtitletype`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.programtitletype - Objekt reprezentující editovanou šablonu (programtitletype entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=ProgramTitleTypeUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <ProgramTitleTypeLiveEdit programtitletype={programtitletypeEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <ProgramTitleTypeLiveEdit programtitletype={programtitletypeEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </ProgramTitleTypeLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const ProgramTitleTypeLiveEdit = ({programtitletype, children, asyncAction=ProgramTitleTypeUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, programtitletype, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(programtitletype[id] === value, programtitletype[id], value)
                if (programtitletype[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: programtitletype.id, 
                lastchange: (entity?.lastchange || programtitletype?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <ProgramTitleTypeMediumEditableContent programtitletype={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}