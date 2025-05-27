import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react"
import { useState } from "react"

const readModels = async () => {
    const resp = await fetch("/debug/run", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "script": "listtree",
            "args": ["packages/all/src"]
          })
    });
    const { stdout, stderr } = await resp.json();
    if (stderr !== "") {
        throw new Error(stderr)
    }
    const firstBrace = stdout.indexOf('{');
    const jsonstr = firstBrace !== -1
      ? stdout.slice(firstBrace)
      : '';
    const dirstructure = JSON.parse(jsonstr)
    const models = dirstructure?.children?.filter(i => i?.type === "directory")?.map(i => i?.name)
    return models
}

export const useReadyModels = (url) => {
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const refetch = () => {
        setLoading(true);
        //7dfec7c3-0988-4446-b966-07ecf0564a50
        readModels()
        .then(doc => {
            setModels(doc)
            setLoading(false)
        })
        .catch(err => setError(err))

        return () => setLoading(false)
    }
    useEffect(refetch, [url])

    return {
        models, 
        loading, 
        error,
        refetch
    }
}