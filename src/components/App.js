import {useEffect, useState, useCallback} from 'react';
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
import {Login} from "./Login.js";
import {Register} from "./Register";
import {Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import {InfoTooltip} from "./InfoTooltip";
import * as Auth from '../utils/Auth.js';


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        username: "", email: ""
    })


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
        setIsInfoTooltipPopupOpen(false)
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

    const authenticate = useCallback((data) => {
        localStorage.setItem('jwt', data.token)
        setLoggedIn(true)
    }, []);

    const registration = useCallback(async ({password, email}) => {
        const res = await Auth.register({password, email});
        authenticate(res);
        setIsInfoTooltipPopupOpen(true)
        return res;
    }, [authenticate]);

    const login = useCallback(async ({password, email}) => {
            try {
                const data = await Auth.authorize({password, email});
                if (!data) {
                    setIsInfoTooltipPopupOpen(true)
                }
                if (data.token) {
                    authenticate(data)
                    setUserData({password, email})
                }
            } finally {
                setIsInfoTooltipPopupOpen(false)
            }
        }
    )

    const checkToken = useCallback(async () => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                throw new Error('no token');
            }
            if (jwt) {
                setLoggedIn(true)
            }
        } catch {
        } finally {
            setIsInfoTooltipPopupOpen(false)
        }
    }, []);

    useEffect(() => {
        checkToken()
    }, [checkToken]);


    const cbLogOut = useCallback(() => {
            setLoggedIn(false);
            localStorage.removeItem('jwt');
            setUserData({username: "", email: ""})
        }, []
    )

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                {loggedIn ? <Header logOut={cbLogOut} loggedIn={loggedIn} userData={userData}/> : null}
                <Switch>
                    <ProtectedRoute
                        path="/mesto-react"
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onConfirmClick={handleConfirmClick}
                        onImageClick={handleImagePopupClick}
                        onCardClick={setSelectedCard}
                        cards={cards}
                        onCardLike={handleCardLike}
                        component={Main}
                    />
                    <Route path="/sign-in">
                        <Header
                            btnEnter={false}
                            btnReg={true}
                            isLoggedId={loggedIn}
                            logOut={cbLogOut}
                        />
                        <Login isLoggedId={loggedIn} onLogin={login} onInfoTooltip={setIsInfoTooltipPopupOpen}/>
                    </Route>
                    <Route path="/sign-up">
                        <Header
                            btnEnter={true}
                            btnReg={false}
                            isLoggedId={loggedIn}
                            logOut={cbLogOut}
                        />
                        <Register isLoggedId={loggedIn} onRegister={registration}
                                  onInfoTooltip={setIsInfoTooltipPopupOpen}/>
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to="/mesto-react"/> : <Redirect to="/sign-up"/>}
                    </Route>
                </Switch>
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

                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    loggedIn={loggedIn}
                />


            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
