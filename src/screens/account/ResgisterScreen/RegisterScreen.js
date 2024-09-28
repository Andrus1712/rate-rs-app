import {Text, View} from 'react-native';
import {Image} from "@rneui/base";
import {styles} from "../ResgisterScreen";

export function RegisterScreen() {
    return (
        <View>
            <Image source={require('../../../../assets/img/5-tenedores-letras-icono-logo.png')} style={styles.image}/>
        </View>
    );
}
