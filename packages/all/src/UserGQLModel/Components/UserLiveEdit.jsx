import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { UserUpdateAsyncAction } from "../Queries";
import { UserMediumEditableContent } from "./UserMediumEditableContent";
import { useState } from "react";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

/**
 * UserLiveEdit Component
 *
 * Interaktivní React komponenta pro live editaci entity `user` s podporou optimistického fetchování a debounce delaye.
 *
 * - Používá `useAsyncAction` k načítání a update entit (např. GraphQL mutation).
 * - Pokud se hodnota pole změní, spustí se update po krátkém zpoždění (`delayer`) — uživatelské změny nejsou ihned posílány, ale až po pauze.
 * - Zobrazuje loading a error stav pomocí komponent `LoadingSpinner` a `ErrorHandler`.
 * - Předává editované hodnoty do komponenty `UserMediumEditableContent`, která zajišťuje zobrazení a editaci jednotlivých polí šablony (`user`).
 *
 * @component
 * @param {Object} props - Props objekt.
 * @param {Object} props.user - Objekt reprezentující editovanou šablonu (user entity).
 * @param {React.ReactNode} [props.children] - Libovolné children, které se vloží pod editační komponentu.
 * @param {Function} [props.asyncAction=UserUpdateAsyncAction] - Asynchronní akce pro update (`useAsyncAction`), typicky GraphQL update mutation.
 *
 * @example
 * // Standardní použití
 * <UserLiveEdit user={userEntity} />
 *
 * @example
 * // S vlastním asyncAction a doplňkovým obsahem
 * <UserLiveEdit user={userEntity} asyncAction={myUpdateAction}>
 *   <div>Extra obsah nebo poznámka</div>
 * </UserLiveEdit>
 *
 * @returns {JSX.Element}
 *   Interaktivní komponenta pro live editaci šablony, včetně spinneru a error handleru.
 */
export const UserLiveEdit = ({user, children, asyncAction=UserUpdateAsyncAction}) => {
    const { loading, error, entity, fetch } = useAsyncAction(asyncAction, user, { deferred: true });
    const [delayer] = useState(() => CreateDelayer());
    const onChange_ = async (e) => {
        const { value, id } = e.target;
        if (value) {
            if (entity) {
                console.log(entity[id] === value, entity[id], value)
                if (entity[id] === value) return;
            } else {
                console.log(user[id] === value, user[id], value)
                if (user[id] === value) return;
            }
            await delayer(() => fetch({ 
                id: user.id, 
                lastchange: (entity?.lastchange || user?.lastchange), 
                [id]: value 
            }));
        }
    }
    
    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && (
            <UserMediumEditableContent user={entity} onChange={onChange_} onBlur={onChange_} />
        )}
        {children}
    </>)
}