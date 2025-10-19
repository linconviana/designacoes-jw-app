import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";

export default function Dashboard(){
       
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Hello App Expo Dashboard</Text>
            <Button title={"Voltar"} onPress={()=>router.back()}/>
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