import { parse, Kind } from 'https://cdn.skypack.dev/graphql';
import { useEffect } from 'react';
import { useState } from 'react';


const readSdlDoc = async (url) => {
    const SDL_QUERY   = 'query GetSDL { _service { sdl } }';
    const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: SDL_QUERY })
    });
    const { data, errors } = await resp.json();
    if (errors) {
        console.error('SDL fetch errors:', errors);
        throw new Error(JSON.stringify(errors))
    }
    
    // 2) parse into AST
    const doc = parse(data._service.sdl, { noLocation: true });
    return doc
}

export const useSdlDoc = (url) => {
    const [doc, setDoc] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true);

        readSdlDoc(url)
        .then(doc => {
            setDoc(doc)
            setLoading(false)
        })
        .catch(err => setError(err))

        return () => setLoading(false)
    }, [url])

    return {
        doc, 
        loading, 
        error
    }
    
}

export const postDoc = async (url, sdl_doc) => {
    const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sdl_doc)
    });
    const { data, errors } = await resp.json();
    if (errors) {
        throw new Error("error", errors)
    }
    return data    
}