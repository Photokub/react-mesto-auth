import {PopupWithForm} from "./PopupWithForm";
import {useRef} from "react";


export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const AvatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(
            AvatarRef.current.value
        );
        AvatarRef.current.value=("")
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            btnText="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input className="form__input form__input_type_link"
                       type="url"
                       name="ava_link_field"
                       ref={AvatarRef}
                       defaultValue=""
                       placeholder="Ссылка на картинку" required/>
                <span className="form__input-error" id="ava_link_field-error"></span>
            </label>
        </PopupWithForm>
    )
}