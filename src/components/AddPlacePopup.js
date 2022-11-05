import {PopupWithForm} from "./PopupWithForm";
import {useRef} from "react";

export function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const CardNameRef = useRef()
    const CardLinkRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
                name: CardNameRef.current.value,
                link: CardLinkRef.current.value
            }
        );
        CardNameRef.current.value = ('')
        CardLinkRef.current.value = ('')
    }

    return (
        <PopupWithForm
            name="add-new-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnText="Cоздать"
        >
            <label className="form__field">
                <input className="form__input form__input_type_title" type="text" name="name"
                       defaultValue=""
                       ref={CardNameRef}
                       placeholder="Название" required minLength="2" maxLength="30"/>
                <span className="form__input-error" id="name-error"></span>
            </label>
            <label className="form__field">
                <input className="form__input form__input_type_link" type="url" name="link" defaultValue=""
                       ref={CardLinkRef}
                       placeholder="Ссылка на картинку" required/>
                <span className="form__input-error" id="link-error"></span>
            </label>
        </PopupWithForm>
    )
}