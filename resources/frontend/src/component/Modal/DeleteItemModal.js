import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    activateServerErrorNotification, deleteFailure,
    deleteLoading,
    openNotification,
    toggleDeleteModal
} from "../../redux/slices/app";

const DeleteItemModal = ({deleteMethod, toggleParentComponent, successNotification, itemId, name, children}) => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.app.deleteModal.loading)
    successNotification = {...successNotification, "design": "is-primary"}

    const handleKeyDown = ((event) => {
        if (event.key === "Escape") dispatch(toggleDeleteModal())
    })
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    const onConfirm = () => {
        dispatch(deleteLoading())
        dispatch(deleteMethod(itemId)).then(() => {
            dispatch(toggleDeleteModal())
            toggleParentComponent()
            dispatch(openNotification(successNotification))
        }).catch(() => {
            dispatch(activateServerErrorNotification())
            dispatch(deleteFailure())
        })
    }

    let buttons
    if (loading === "loading") {
        buttons = {
            "close": <button className="delete is-disabled" aria-label="close"/>,
            "cancel": <button className="button ml-auto is-disabled">Cancel</button>,
            "confirm": <button className="button is-loading is-link">Loading</button>
        }
    } else {
        buttons = {
            "close": <button onClick={() => dispatch(toggleDeleteModal())} className="delete" aria-label="close"/>,
            "cancel": <button onClick={() => dispatch(toggleDeleteModal())} className="button ml-auto">Cancel</button>,
            "confirm": <button onClick={onConfirm}
                               className="button is-danger">Confirm</button>
        }
    }


    return (
        <React.Fragment>
            <div className="modal is-active ">
                <div className="modal-background"/>
                <div className="modal-card ">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <i className="fas fa-exclamation-triangle has-text-danger"/> Delete {name}
                        </p>
                        {buttons.close}
                    </header>
                    <section className="modal-card-body">
                        {children}
                    </section>
                    <footer className="modal-card-foot">
                        {buttons.confirm}
                        {buttons.cancel}
                    </footer>
                </div>
            </div>
        </React.Fragment>
    )
};

export default DeleteItemModal;
