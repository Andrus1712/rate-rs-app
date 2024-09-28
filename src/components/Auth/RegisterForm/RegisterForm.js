import React from 'react';
import {View} from "react-native";
import {styles} from "./RegisterForm.styles";
import {Input} from "@rneui/themed";
import {Button, Icon} from "@rneui/base";

export function RegisterForm(props) {
    return (
        <View style={styles.container}>
            <Input secureTextEntry={false} placeholder={"Email"} style={styles.input}
                   rightIcon={<Icon type={"material-community"} style={styles.icon} name={"at"}/>}/>

            <Input secureTextEntry={true} placeholder={"Password"} style={styles.input}
                   rightIcon={<Icon type={"material-community"} style={styles.icon} name={"eye-outline"}/>}/>

            <Input secureTextEntry={true} placeholder={"Confirm Password"} style={styles.input}
                   rightIcon={<Icon type={"material-community"} style={styles.icon} name={"eye-outline"}/>}/>

            <Button title={"Unirse"} onPress={() => {}} containerStyle={styles.buttonContainer} buttonStyle={styles.btn} />
        </View>
    );
}
