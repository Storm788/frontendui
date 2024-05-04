import { isRouteErrorResponse, useNavigate, useParams, useRouteError } from "react-router-dom"
import { UGSearch } from "../Components"

export const SearchPage = ()  => {
    const {phrase} = useParams()

    return (
        <UGSearch phrase={phrase}/>
    )

}