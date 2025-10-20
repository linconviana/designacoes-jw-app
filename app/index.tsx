import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import * as Notifications from "expo-notifications";
import { router } from "expo-router";

import axios from "axios";

interface Designacao {
  id: number;
  nome: string;
  tipo_designacao: string;
  congregacao: string;
  dia: string;
  data: string; // formato "yyyy-mm-dd"
}

export default function Index(){
    
    const [dados, setDados] = useState<Designacao[]>([]);
    /*const [dados, setDados] = useState([        
        {
            id: 0,
            nome:'',
            tipo_designacao:'',
            congregacao:'',
            dia:'',
            data:''
        }
    ]); */

    useEffect(() => {
        async function configurarNotificacoes() {
            try {
                // Solicita permissão (necessário para iOS e Android 13+)
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permissão de notificações negada.");
                    return;
                }

                // Define comportamento das notificações em primeiro plano
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: true,
                        shouldShowBanner: true, // ✅ novo campo (iOS 17+)
                        shouldShowList: true    // ✅ novo campo (iOS 17+)
                    }),
                });

                console.log(" Notificações configuradas com sucesso!");
            } catch (error) {
                console.error("Erro ao configurar notificações:", error);
            }
        }

        configurarNotificacoes();
    }, []);

    useEffect(() => {
        const carregarDados = async () => {
            try {             
                const response = await axios.get(
                    "https://raw.githubusercontent.com/linconviana/designacoes-jw-app/main/lista-designacoes/designacoes.json"
                ); 
                
                // Verifica se há algum item com data de hoje
                const hoje = new Date().toISOString().split("T")[0];

                // Cria datas futuras
                const amanhaDate = new Date();
                amanhaDate.setDate(amanhaDate.getDate() + 1);
                const amanha = amanhaDate.toISOString().split("T")[0];

                const mais7Date = new Date();
                mais7Date.setDate(mais7Date.getDate() + 7);
                const mais7 = mais7Date.toISOString().split("T")[0];

                const mais15Date = new Date();
                mais15Date.setDate(mais15Date.getDate() + 15);
                const mais15 = mais15Date.toISOString().split("T")[0];

                const mais30Date = new Date();
                mais30Date.setDate(mais30Date.getDate() + 30);
                const mais30 = mais30Date.toISOString().split("T")[0];

                const encontrados = response.data.filter(
                    (item:Designacao) => item.data === hoje || item.data === amanha
                );

                // 2️⃣ Filtra os itens de +15 e +30 dias
                const futuros = response.data.filter(
                    (item: Designacao) => item.data === mais7 || item.data === mais15 || item.data === mais30
                );

                // 3️⃣ Junta tudo (sem duplicar, caso alguma data coincida)
                const todos = [...encontrados, ...futuros]

                // 4️⃣ Atualiza o estado
                setDados(todos);

                if (encontrados.length > 0) {
                    // Define o número no ícone do app
                    await Notifications.setBadgeCountAsync(encontrados.length);

                    // (Opcional) Mostra uma notificação
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: "Novas atualizações!",
                            body: `Há ${encontrados.length} itens para hoje.`
                        },
                        trigger: null, // mostra imediatamente
                    });
                } else {
                    // Se não há nenhum item, zera o badge
                    await Notifications.setBadgeCountAsync(0);
                }

            } catch (error) {
                console.error("Erro ao carregar JSON:", error);
            } 
        };

        carregarDados();
    }, []);

    const [name, setname] = useState<string>('');

    const handleMessage = () => {
        Alert.alert(`Olá ${name}`);
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
                        <Text style={styles.idade}>Designação: {item.tipo_designacao}</Text>
                        <Text style={styles.idade}>Congregação: {item.congregacao}</Text>
                        <Text style={styles.idade}>Dia Semana: {item.dia}</Text>
                        <Text style={styles.idade}>Data: {item.data}</Text>
                    </View>
                )}
            />

            <Text style={styles.title}>Hello App Expo</Text>

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
        color: "blue"
    },
    idade: {
        fontSize: 16,
        color: "#555",
    }
})