import { useAsyncAction, createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { ErrorHandler, InfiniteScroll, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { AdmissionMediumCard } from "../../AdmissionGQLModel";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Col } from "react-bootstrap";


/**
 * Inserts a AdmissionGQLModel item into a program’s admissions array and dispatches an update.
 *
 * @param {Object} program - The current program object containing a `admissions` array.
 * @param {Object} admissionItem - The item to insert; must have `__typename === "AdmissionGQLModel"`.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramAdmissionItemInsert = (program, admissionItem, dispatch) => {
    const { __typename } = admissionItem;
    if (__typename === "AdmissionGQLModel") {
        const { admissions, ...others } = program;
        const newProgramAdmissionItems = [...admissions, admissionItem];
        const newProgram = { ...others, admissions: newProgramAdmissionItems };
        dispatch(ItemActions.item_update(newProgram));
    }
};

/**
 * Replaces an existing AdmissionGQLModel item in a program’s admissions array and dispatches an update.
 *
 * @param {Object} program - The current program object containing a `admissions` array.
 * @param {Object} admissionItem - The updated item; must have `__typename === "AdmissionGQLModel"` and an `id` field matching an existing item.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramAdmissionItemUpdate = (program, admissionItem, dispatch) => {
    const { __typename } = admissionItem;
    if (__typename === "AdmissionGQLModel") {
        const { admissions, ...others } = program;
        const newProgramAdmissionItems = admissions.map(item =>
            item.id === admissionItem.id ? admissionItem : item
        );
        const newProgram = { ...others, admissions: newProgramAdmissionItems };
        dispatch(ItemActions.item_update(newProgram));
    }
};

/**
 * Removes a AdmissionGQLModel item from a program’s admissions array by its `id` and dispatches an update.
 *
 * @param {Object} program - The current program object containing a `admissions` array.
 * @param {Object} admissionItem - The item to delete; must have `__typename === "AdmissionGQLModel"` and an `id` field.
 * @param {Function} dispatch - Redux dispatch function (or similar) to call the update action.
 */
const followUpProgramAdmissionItemDelete = (program, admissionItem, dispatch) => {
    const { __typename } = admissionItem;
    if (__typename === "AdmissionGQLModel") {
        const { admissions, ...others } = program;
        const newProgramAdmissionItems = admissions.filter(
            item => item.id !== admissionItem.id
        );
        const newProgram = { ...others, admissions: newProgramAdmissionItems };
        dispatch(ItemActions.item_update(newProgram));
    }
};

const ProgramAdmissionsAttributeQuery = `
query ProgramQueryRead($id: UUID!, $where: AdmissionInputFilter, $skip: Int, $limit: Int) {
    result: programById(id: $id) {
        __typename
        id
        admissions(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
            name
            lastchange
            created
            createdbyId
            changedby {
                id
                fullname
            }
            changedbyId
            createdby {
                id
                fullname
            }
            rbacobjectId
            stateId
            state {
                id
                name
            }
            programId
            program {
                id
                name
            }
            paymentInfoId
            applicationStartDate
            applicationLastDate
            endDate
            conditionDate
            paymentDate
            conditionExtendedDate
            requestConditionExtendDate
            requestExtraConditionsDate
            requestExtraDateDate
            examStartDate
            examLastDate
            studentEntryDate
        }
    }
}
`

const ProgramAdmissionsAttributeAsyncAction = createAsyncGraphQLAction(
    ProgramAdmissionsAttributeQuery,
    processVectorAttributeFromGraphQLResult("admissions"),
    // (jsonData) => async (dispatch, getState, next = (jsonResult) => jsonResult) => next(jsonData)
)

/**
 * A component for displaying the `admissions` attribute of an program entity.
 *
 * This component checks if the `admissions` attribute exists on the `program` object. If `admissions` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `admissions` array and
 * displays a placeholder message and a JSON representation for each item in the `admissions`.
 *
 * @component
 * @param {Object} props - The props for the ProgramAdmissionsAttribute component.
 * @param {Object} props.program - The object representing the program entity.
 * @param {Array} [props.program.admissions] - An array of admissions items associated with the program entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `admissions` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const programEntity = { 
 *   admissions: [
 *     { id: 1, name: "Admission Item 1" }, 
 *     { id: 2, name: "Admission Item 2" }
 *   ] 
 * };
 *
 * <ProgramAdmissionsAttribute program={programEntity} />
 */
export const ProgramAdmissionsAttribute = ({program, children, filter=Boolean}) => {
    const { admissions: unfiltered } = program
    if (typeof unfiltered === 'undefined') return null
    const admissions = unfiltered.filter(filter)
    if (admissions.length === 0) return null
    return (
        <>
            {admissions.map(
                admission => <Col id={admission.id} key={admission.id}>
                    <AdmissionMediumCard admission={admission} />
                    {/* <AdmissionLink admission={admission} /> */}
                    {/* Probably {'<AdmissionMediumCard admission=\{admission\} />'} <br />
                    <pre>{JSON.stringify(admission, null, 4)}</pre> */}
                </Col>
            )}
            {children}
            {/* <ButtonMore skip={0} limit={10} fetch={fetch} /> */}
        </>
    )
}


const AdmissionsVisualiser1 = ({items, ...props}) => 
    <ProgramAdmissionsAttribute {...props} program={{admissions: items}} />


export const ProgramAdmissionsAttributeInfinite = ({program}) => { 
    const {admissions} = program

    return (
        <InfiniteScroll 
            preloadedItems={admissions}
            Visualiser={AdmissionsVisualiser1} 
            actionParams={{...program, skip: 0, limit: 10}}
            asyncAction={ProgramAdmissionsAttributeAsyncAction}
        />
    )
}


export const AdmissionsVisualiser = ({ items, children, filter = Boolean }) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    const admissions = items.filter(filter);
    if (admissions.length === 0) return null;
    return (
        <>
            {admissions.map(admission => (
                <div id={admission.id} key={admission.id}>
                    <AdmissionMediumCard admission={admission} />
                </div>
            ))}
            <hr />
            {children}
        </>
    );
};

export function useInfiniteLoader({
    asyncAction,
    entity,
    initialSkip = 0,
    limit = 10,
    filter = Boolean,
    loaderMode = "button",
    key = "admissions",
}) {
    const [skip, setSkip] = useState(initialSkip);
    const [items, setItems] = useState(entity?.[key] || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadMoreEnabled, setLoadMoreEnabled] = useState(true);
    const autoLoadRef = useRef(null);
    const {loading: l, error: e, fetch} = useAsyncAction(asyncAction, entity);
    // Fetch more
    const loadMore = useCallback(async () => {
        setLoading(true);
        try {
            // Předpokládám fetchAdmissions je tvoje async action/fetch
            const res = await fetch({ ...entity, skip, limit });
            console.log("res", res);
            const newItems = res?.[key] || [];
            setItems(prev => {
                const mergedMap = new Map();

                console.log("prev", prev.map(x => x.id));
                console.log("newItems", newItems.map(x => x.id));

                // Add items from the first array
                prev.forEach((item) => {
                    mergedMap.set(item.id, item);
                });

                // Add items from the second array (overwrites if id already exists)
                newItems.forEach((item) => {
                    mergedMap.set(item.id, item);
                });

                const result = Array.from(mergedMap.values());
                console.log("result", result.map(x => x.id));
                // Convert the Map back to an array
                return result;
            });
            setSkip(prev => prev + limit);
            setLoadMoreEnabled(newItems.length === limit);
        } catch (err) {
            setError(err);
            setLoadMoreEnabled(false);
        }
        setLoading(false);
    }, [entity, skip, limit, asyncAction, key]);

    // Auto-load observer
    useEffect(() => {
        if (loaderMode !== "auto" || !autoLoadRef.current || !loadMoreEnabled) return;
        const el = autoLoadRef.current;
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [loaderMode, loadMoreEnabled, loadMore]);

    // Reset na změnu programu
    useEffect(() => {
        setItems(entity?.[key] || []);
        setSkip(initialSkip);
        setError(null);
        setLoadMoreEnabled(true);
    }, [entity, initialSkip]);

    return { loading, error, items, loadMoreEnabled, loadMore, autoLoadRef };
}


export const ProgramAdmissionsAttributeLazy2 = ({
    program,
    filter = Boolean,
    initialSkip = 0,
    limit = 10,
    Visualiser = AdmissionsVisualiser,    // možnost nahradit, nebo použít defaultně
    loaderMode = "button",      // "auto" pro intersection observer
    ...props
}) => {
    const preloadedItems = program?.admissions || [];

    // Nejlépe použít svůj hook InfiniteScroll/useLoadMore2, nebo si nechat komponentu níže
    const {
        loading, error, items, loadMoreEnabled, loadMore, autoLoadRef
    } = useInfiniteLoader({
        asyncAction: ProgramAdmissionsAttributeAsyncAction,
        entity: program,
        key: "admissions",
        filter,
        initialSkip,
        limit,
        loaderMode,
    });

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorHandler errors={error} />;

    // Tady renderuješ vše
    return (
        <Visualiser items={items} filter={filter} {...props}>
            {loaderMode === "button" && loadMoreEnabled && (
                <Loader mode="button" onClick={loadMore} />
            )}
            {loaderMode === "auto" && loadMoreEnabled && (
                <Loader mode="auto" ref={autoLoadRef} />
            )}
        </Visualiser>
    );
};


/**
 * A lazy-loading component for displaying filtered `admissions` from a `program` entity.
 *
 * This component uses the `ProgramAdmissionsAttributeAsyncAction` to asynchronously fetch
 * the `program.admissions` data. It shows a loading spinner while fetching, handles errors,
 * and filters the resulting list using a custom `filter` function (defaults to `Boolean` to remove falsy values).
 *
 * Each admission item is rendered as a `<div>` with its `id` as both the `key` and the `id` attribute,
 * and displays a formatted JSON preview using `<pre>`.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.program - The program entity or identifying query variables used to fetch it.
 * @param {Function} [props.filter=Boolean] - A filtering function applied to the `admissions` array before rendering.
 *
 * @returns {JSX.Element} A rendered list of filtered admissions or a loading/error placeholder.
 *
 * @example
 * <ProgramAdmissionsAttributeLazy program={{ id: "abc123" }} />
 *
 * 
 * @example
 * <ProgramAdmissionsAttributeLazy
 *   program={{ id: "abc123" }}
 *   filter={(v) => v.status === "active"}
 * />
 */
export const ProgramAdmissionsAttributeLazy = ({
    program,
    filter = Boolean,
    children,
    initialSkip = 0,
    limit = 10,
}) => {
    // ...fetch, skip, limit, loadMoreEnabled, loadMore, loadingNext, atd.
    // const {loading, error, entity, fetch} = useAsyncAction(ProgramAdmissionsAttributeAsyncAction, program, {deferred: true})
    const {loading, error, entity, fetch} = useAsyncAction(ProgramAdmissionsAttributeAsyncAction, program)
    useEffect(() => {
        fetch(program)
    }, [program])

    const { autoLoadRef, loadMoreEnabled, loadMore } = useLoadMore2({
        initialSkip,
        limit,
        fetch,
        vectorKey: "admissions",
        autoload: true
    });
    
    // Rozpoznání, zda mezi children je AutoLoader a/nebo LoadMore
    // (childrenSeparator můžeš použít nebo ručně):
    const { hasLoadMore, hasLoadAuto, otherChildren } = childrenSeparator(children);
    
    if (typeof window === 'undefined') return null;

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorHandler errors={error} />
    // Tady ve výstupu přiřadíš ref k AutoLoaderu
    return (
        <ProgramAdmissionsAttribute program={entity} filter={filter}>
            {otherChildren}
            {hasLoadMore && loadMoreEnabled && <Loader {...hasLoadMore.props} onClick={loadMore} />}
            {hasLoadAuto &&
                React.cloneElement(hasLoadAuto, { ref: autoLoadRef })
            }
        </ProgramAdmissionsAttribute>
    );
};


const childrenSeparator = (children) => {
    let hasLoadMore = null;
    let hasLoadAuto = null;
    let otherChildren = [];

    React.Children.forEach(children, child => {
        if (!child) return;
        if (child.type === Loader && child.props.mode === "auto") {
            hasLoadAuto = child;
        } else if (child.type === Loader && child.props.mode === "button") {
            hasLoadMore = child;
        } else {
            otherChildren.push(child);
        }
    });
    if (!hasLoadMore && !hasLoadAuto) {
        hasLoadMore = <Loader mode="button" />;
    }
    return { hasLoadMore, hasLoadAuto, otherChildren };
};

/**
 * Loader komponenta pro lazy loading, umí buď tlačítko, nebo intersection trigger (autoload).
 * 
 * @param {'button'|'auto'} mode - Způsob zobrazení loaderu (tlačítko nebo autoload div).
 * @param {function} [onClick] - Callback pro kliknutí (použije se jen v režimu button).
 * @param {object} [props] - Další props, např. disabled, className, children.
 * @param {React.Ref} [ref] - Forward ref (používá se jen v autoload režimu).
 */
export const Loader = React.forwardRef(
    ({ mode = "button", onClick, children, ...props }, ref) => {
        if (mode === "auto") {
        return <div ref={ref} style={{height: 100, background: "red"}} {...props} />;
        }
        // default je button
        return (
        <button className="btn btn-success" onClick={onClick} {...props}>
            {children || "Načíst další"}
        </button>
        );
    }
);
Loader.displayName = "Loader";

/**
 * Hook for paginated lazy-loading with optional infinite scroll/autoloading.
 * Interně spravuje ref pro autoload prvek.
 *
 * @param {Object} options
 * @param {number} [options.initialSkip=10]
 * @param {number} [options.limit=10]
 * @param {Function} options.fetch
 * @param {boolean} [options.enabled=true]
 * @param {string} [options.vectorKey]
 * @param {boolean} [options.autoload=false] - Enable auto-load on scroll.
 *
 * @returns {Object}
 *   skip, limit, loadMoreEnabled, loadMore, reset, loadingNext, autoLoadRef
 */
export function useLoadMore2({
    initialSkip = 10,
    limit = 10,
    fetch,
    enabled = true,
    vectorKey,
    autoload = false,
}) {
    const [skip, setSkip] = useState(initialSkip);
    const [loadMoreEnabled, setLoadMoreEnabled] = useState(enabled);
    const [loadingNext, setLoadingNext] = useState(false);

    const autoLoadRef = useRef(null);

    const loadMore = useCallback(async () => {
        console.log("loadMore", skip, limit);
        setLoadingNext(true);
        const fresh = await fetch({ skip, limit });
        const vector = vectorKey
            ? fresh[vectorKey]
            : Object.values(fresh).find(v => Array.isArray(v));
        setSkip(prev => prev + limit);
        setLoadMoreEnabled(vector && vector.length === limit);
        setLoadingNext(false);
        return fresh;
    }, [fetch, skip, limit, vectorKey]);

    const reset = useCallback(() => {
        setSkip(initialSkip);
        setLoadMoreEnabled(enabled);
        setLoadingNext(false);
    }, [initialSkip, enabled]);

    useEffect(() => {
        if (!autoload || !loadMoreEnabled || loadingNext) return;
        if (typeof window === "undefined") return;

        let observer = null;
        let timeoutId = null;

        function attach() {
            const el = autoLoadRef.current;
            if (!el) {
                timeoutId = setTimeout(attach, 50);
                return;
            }

            observer = new window.IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        loadMore();
                    }
                },
                { threshold: 0 }
            );
            observer.observe(el);
        }

        attach();

        return () => {
            if (observer) observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [autoload, loadMoreEnabled, loadingNext, loadMore]);



    return { skip, limit, loadMoreEnabled, loadMore, reset, loadingNext, autoLoadRef };
}
