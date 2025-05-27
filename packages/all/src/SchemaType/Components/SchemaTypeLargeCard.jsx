import { CardCapsule, LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { Row } from "react-bootstrap"

export const SchemaTypeLargeCard = ({schematype, children}) => {
    return (
        <CardCapsule title={schematype.name}>
            <Row>
                <LeftColumn>
                    <pre>{JSON.stringify(schematype, null, 4)}</pre>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </CardCapsule>
    )
}