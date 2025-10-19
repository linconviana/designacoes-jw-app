import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    title: string
}

/*type Props = {
    title: string,
    onPress?: ()=> void
} */
//export function Button({title, onPress}:Props){
//<TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.button}>

export function Button({title, ...rest}:Props){
    return(
        <TouchableOpacity {...rest} activeOpacity={0.6} style={styles.button}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}