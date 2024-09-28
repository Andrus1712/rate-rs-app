import {ScrollView, View} from 'react-native';
import {Image, Text} from "@rneui/base";
import {screen} from '../../../utils';
import {styles} from "./LoginScreen.styles";
import {useNavigation} from '@react-navigation/native';

export function LoginScreen() {
    const {navigate} = useNavigation();
    const goToRegister = () => {
        navigate(screen.account.tab, {screen: screen.account.register});
    };
    return (
        <ScrollView>
            <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.image}/>
            <View style={styles.container}>
                <Text>Estamos en el login</Text>
                <Text onPress={goToRegister}>Registrarse</Text>
            </View>
        </ScrollView>
    );
}
