import {PopupWithForm} from "./PopupWithForm";

export function ConfirmPopup({isOpen, onClose, onDelete, card}){

    const handleDeleteClick =(e) => {
        e.preventDefault();
        onDelete(card)
    }

    return(
        <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onChange
            onSubmit={handleDeleteClick}
            btnText="Да"
        />
    )
}