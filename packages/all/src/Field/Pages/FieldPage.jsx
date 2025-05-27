export const FieldPage = () => {
    const { id: fieldname } = useParams();
    return (
        <div>
            <h1>Field Page</h1>
            <p>This is the field page.</p>
        </div>
    );
}