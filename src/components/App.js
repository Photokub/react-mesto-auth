import {useEffect, useState} from 'react';
import {Header} from "./Header";
import {Main} from "./Main";
import {Footer} from "./Footer";
import {ImagePopup} from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {ConfirmPopup} from "./ConfirmPopup";


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data)
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleConfirmClick() {
        setIsConfirmPopupOpen(true)
    }

    function handleImagePopupClick() {
        setIsImagePopupOpen(true)
    }

    function closeAllPopups() {
        setIsConfirmPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopupOpen(false)
        setSelectedCard({name: '', link: ''})
    }

    function handleUpdateUser({name, about}) {
        api.patchUserInfo({name, about})
            .then(data => {
                setCurrentUser(data)
                closeAllPopups()
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleUpdateAvatar(avatar) {
        api.patchAvatar(avatar)
            .then(data => {
                setCurrentUser(data)
                closeAllPopups()
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    useEffect(() => {
        api.getDefaultCards().then(data => {
            setCards(data)
        }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleCardDelete(card) {
        api.deleteMyCard(card._id).then(() => {
            setCards(cards => cards.filter((c) => c._id !== card._id));
            closeAllPopups()
        }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    function handleAddPlaceSubmit({name, link}) {
        api.postCard({name, link})
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onConfirmClick={handleConfirmClick}
                    onImageClick={handleImagePopupClick}
                    onCardClick={setSelectedCard}
                    cards={cards}
                    onCardLike={handleCardLike}
                />

                <Footer/>

                <ImagePopup
                    isOpen={isImagePopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                               onAddPlace={handleAddPlaceSubmit}/>

                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onDelete={handleCardDelete}
                    card={selectedCard}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
