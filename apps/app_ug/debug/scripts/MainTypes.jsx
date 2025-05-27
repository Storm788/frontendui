import { parse, Kind } from 'https://cdn.skypack.dev/graphql';
import { useReadyModels } from './useReadyModels';
import { useEffect, useState } from 'react';

// Recursively peel off NON_NULL / LIST wrappers until NamedType
function unwrap(type) {
  if (!type) return null;
  if (
    type.kind === Kind.NON_NULL_TYPE ||
    type.kind === Kind.LIST_TYPE
  ) {
    return unwrap(type.type);
  }
  // must be NamedTypeNode
  return type;
}

// Returns an array of unique return-type names for all Query fields
// that have zero arguments
function getZeroArgReturnTypes(doc) {
  const queryDef = doc.definitions.find(
    d => d.kind === Kind.OBJECT_TYPE_DEFINITION && d.name.value === 'Query'
  );
  if (!queryDef || !queryDef.fields) {
    return [];
  }

  return Array.from(new Set(
    queryDef.fields
      // keep fields with zero args OR all args are optional
      .filter(f => {
        const args = f.arguments || [];
        return args.length === 0
            || args.every(arg => arg.type.kind !== Kind.NON_NULL_TYPE);
      })
      // unwrap to the NamedType
      .map(f => {
        const named = unwrap(f.type);
        return named && named.name ? named.name.value : null;
      })
      .filter(Boolean)  // drop nulls/empty
  ));
}

const CopyTempate = async (names) => {
  const resp = await fetch("/debug/run", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "script": "create:component4",
        "args": ["all", ...names]
      })
  })
  const { stdout, stderr } = await resp.json();
  if (stderr !== "") {
    throw new Error(stderr)
  }
  return stdout
}

const CreateVectors = async (typename) => {
  const resp = await fetch("/debug/run", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "script": "create:vectors4",
        "args": ["all", typename]
      })
  })
  const { stdout, stderr } = await resp.json();
  if (stderr !== "") {
    throw new Error(stderr)
  }
  return stdout
}

const CreateScalars = async (typename) => {
  const resp = await fetch("/debug/run", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "script": "create:scalars4",
        "args": ["all", typename]
      })
  })
  const { stdout, stderr } = await resp.json();
  if (stderr !== "") {
    throw new Error(stderr)
  }
  return stdout
}

const TriButton = ({state, onClick, children}) => {
    const [state_, setState] = useState(state)
    useEffect(()=>setState(state), [state])
    if (state_ === true) {
        return <button className='btn btn-sm btn-secondary' disabled>{children}</button>
    }

    const onClickFirst = () => setState(1)
    const onClickConfirm = () => {
        setState(true)
        onClick()
    }
    const onClickCancel = () => {
        setState(false)
    }
    return (
        <>
        {(state_ === false) && <button className='btn btn-sm btn-warning' onClick={onClickFirst}>{children}</button>}
        {(state_ === 1) && <button className='btn btn-sm btn-warning' onClick={onClickCancel}>{children}</button>}
        {(state_ === 1) && <button className='btn btn-sm btn-danger' onClick={onClickConfirm}>{children}</button>}
        {(state_ === true) && <button className='btn btn-sm btn-secondary' disabled={true} onClick={onClickConfirm}>{children}</button>}
        </>
        
    )
}

const SingleType = ({typename, used, onChange=(t) => null}) => {
    const [state, setState] = useState(null)
    const onClickCopyTemplate = () => {
      setState("loading")
      CopyTempate([typename])
      .then(stdout => {
        onChange(typename)
        setState(null)
        return stdout
      })
      .catch(stderr => {
        console.error(stderr)
        setState(stderr)
      })
    }
    const onClickCreateVectors = () => {
      setState("loading")
      CreateVectors(typename)
      .then(stdout => {
        // onChange(typename)
        setState(null)
        return stdout
      })
      .catch(stderr => {
        console.error(stderr)
        setState(stderr)
      })
    }
    const onClickCreateScalars = () => {
      setState("loading")
      CreateScalars(typename)
      .then(stdout => {
        // onChange(typename)
        setState(null)
        return stdout
      })
      .catch(stderr => {
        console.error(stderr)
        setState(stderr)
      })
    }

    return (
        <tr>
            <td>{typename}</td>
            <td><TriButton state={used} onClick={onClickCopyTemplate}>{typename}</TriButton></td>
            <td>
              <button className='btn btn-sm btn-danger' onClick={onClickCopyTemplate}>
                {typename}
              </button>
            </td>
            
            <td>{used === true && (
              <button className='btn btn-sm btn-outline-danger' onClick={onClickCreateScalars}>
                Scalars
              </button>)
            }              
            </td>
            <td>{used === true && (
              <button className='btn btn-sm btn-outline-danger' onClick={onClickCreateVectors}>
                Vectors
              </button>)
            }
            </td>
            <td>
              {state === "loading" && "Running"}
              {state && state !== "loading" && JSON.stringify(state)}
            </td>
            {/* {used &&<span>&#x2714; </span>}  */}
            
        </tr>
    )
}

export const MainTypes = ({doc}) => {
    const zeros = getZeroArgReturnTypes(doc)
    
    const { models=[], error, loading, refetch } = useReadyModels()
    const onChange = () => {
        refetch()
    }
    // if (error || loading) {
    //     return (<>
    //         {error && <div>{JSON.stringify(error)}</div>}
    //         {loading && <div>Loading</div>}
    //     </>)
    // }
    return (<div>
        {/* <pre>{JSON.stringify(models, null, 4)}</pre>
        <pre>{JSON.stringify(zeros?.filter(typename => models.includes(typename)), null, 4)}</pre> */}
        <table className='table'>
          <thead>
            <tr>
              <th>Type Name</th>
              <th>Create Type</th>
              <th>Refresh Type</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {zeros.map(typename => 
                <SingleType key={typename} typename={typename} used={(models.includes(typename))} onChange={onChange}/>
            )}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(doc, null, 4)}</pre> */}
        {/* {zeros.map(typename => <SingleType key={typename} typename={typename} />)} */}
    </div>)
}