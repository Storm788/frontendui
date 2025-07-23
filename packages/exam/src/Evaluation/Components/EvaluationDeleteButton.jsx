import { EvaluationDeleteAsyncAction } from "../Queries";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

export const EvaluationDeleteButton = ({evaluationId, lastchange, onDone}) => {
    const {fetch : deleteEvaluation} = useAsyncAction(EvaluationDeleteAsyncAction, {}, {deferred: true});

    const onClick = async () => {
        console.log("id:", evaluationId, "lastchange:", lastchange);
        await deleteEvaluation({id: evaluationId, lastchange: lastchange});
        onDone();
    };

    return (
        <button onClick={onClick}>
            Delete Evaluation
        </button>
    );
};

