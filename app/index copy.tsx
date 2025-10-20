import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { router } from "expo-router";

import axios from "axios";

export default function Index(){
    
    /*const [dados, setDados] = useState([        
        {
            logradouro: '',
            bairro:'',
            cidade:'',
            uf:''
        }
    ]);*/

    const [dados, setDados] = useState([        
        {
            id: 0,
            nome:'',
            idade:''
        }
    ]); 

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                //const response = await axios.get("https://viacep.com.br/ws/12705260/json/");
                
                const response = await axios.get(
                "https://raw.githubusercontent.com/linconviana/designacoes-jw-app/main/lista-designacoes/designacoes.json"
                ); 
                debugger
                setDados(response.data);
            } catch (error) {
                debugger
                console.error("Erro ao carregar JSON:", error);
            } finally {
                debugger
                setCarregando(false);
            }
        };

        carregarDados();
    }, []);

    /*if (carregando) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0066ff" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }*/
  
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

            <FlatList
                data={dados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.idade}>Idade: {item.idade}</Text>
                    </View>
                )}
            />

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
    },
    item: {
        flex: 1,
        display: "flex",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    nome: {
        fontSize: 18,
        fontWeight: "bold",
    },
    idade: {
        fontSize: 16,
        color: "#555",
    }
})