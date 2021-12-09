export default function DeleteConfirmation({ entity, unselect }) {
    return (
        <>
            <h2>You are about to delete your {entity}.</h2>
            <p>Are you sure ?</p>
            <button>Yes</button>
            <button onClick={unselect}>No</button>
        </>
    )
}