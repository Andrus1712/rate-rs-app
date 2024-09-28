import {useEffect, useState} from "react";

import {UserLoggedScreen} from './UserLoggedScreen';
import {UserGuestScreen} from './UserGuestScreen';
import {LoadingModal} from '../../components';
import {getAuth} from "../../utils";
import {onAuthStateChanged} from 'firebase/auth'

export const AccountScreen = () => {

    const [hasLogged, setHasLogged] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setHasLogged(!!user);
        });
    }, []);

    if (hasLogged === null) {
        return <LoadingModal show text="Cargando"/>;
    }

    return hasLogged ? <UserLoggedScreen/> : <UserGuestScreen/>;
};
