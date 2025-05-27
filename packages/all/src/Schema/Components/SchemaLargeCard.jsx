import { CardCapsule, LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { Row } from "react-bootstrap";

export const SchemaLargeCard = ({schema, children}) => {
  return (
    <CardCapsule title="Schema">
        <Row>
        <LeftColumn>
            <pre>{JSON.stringify(schema, null, 4)}</pre>
        </LeftColumn>
        <MiddleColumn>
            {children}
        </MiddleColumn>
        </Row>
    </CardCapsule>
  );
}