import { useEffect } from "react";
import { MainTypes } from "./MainTypes";
import { postDoc, useSdlDoc } from "./useSdlDoc"

const GQLENDPOINT = '/api/gql';
// const GQLENDPOINT = '/sdl';
export const App = () => {
    const { error, loading, doc} = useSdlDoc(GQLENDPOINT)
    useEffect(
        () => {
            if (!doc) {
                return
            }
            
            const executor = async () => {
                const response = await postDoc("/sdl", doc)
                return response
            }         

            executor()
        }, [doc]
    )
    return (<div>
        {loading && <div>loading</div>}
        {error && <div>{JSON.stringify(error)}</div>}
        {doc && <MainTypes doc={doc} />}
    </div>)
}