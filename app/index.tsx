import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import {router} from "expo-router";

export default function Index(){
    
    const [name, setname] = useState<string>();

    const handleMessage = () => {
        Alert.alert(`Olá ${name}`);
    }

    const onChangeText = (text: string) => {
        setname(text)
    }

    const handleNextPage = () => {
       router.navigate("/dashboard")
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Hello App Expo {name}</Text>
            {/*<Button title="Clicar Modal" onPress={handleMessage}/> */}
            {/*<Input onChangeText={(text)=> onChangeText(text)}/> */}

            <Input onChangeText={(text)=> setname(text)}/>
            <Button title={"Mostar Mensagem"} onPress={handleMessage}/>
            <Button title={"Dashboard"} onPress={handleNextPage}/>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        gap: 16
    },
    title: {
        color: "#eb0612ff",
        fontWeight: "bold",
        fontSize: 24
    }
})