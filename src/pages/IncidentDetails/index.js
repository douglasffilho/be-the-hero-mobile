import React, { useCallback } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import styles from "./styles";

import logo from "../../assets/logo.png";

const IncidentDetailsView = (props) => {
    const incident = props.route.params;

    const contactMessage = `Olá ${incident.ong.name}, `
        + `estou entrando em contato pois gostaria de ajudar no caso ${incident.title}`
        + `com o valor de R$ ${parseFloat(incident.value).toFixed(2)}`;

    const navigation = useNavigation();

    const handleSendEmail = useCallback(() => {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.ong.email],
            body: contactMessage,
        });
    });

    const handleSendWhatsapp = useCallback(() => {
        Linking.openURL(`whatsapp://send?phone=${incident.ong.whatsapp}&text=${contactMessage}`);
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>Ong:</Text>
                <Text style={styles.incidentValue}>{incident.ong.name}</Text>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Descrição:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={[styles.incidentValue, styles.lastIncidentValue]}>R$ {parseFloat(incident.value).toFixed(2)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactBoxFeaturedText}>Salve o dia</Text>
                <Text style={styles.contactBoxFeaturedText}>Seja o herói desse caso</Text>

                <Text style={styles.contactBoxText}>Entre em contato</Text>

                <View style={styles.contactBoxActions}>
                    <TouchableOpacity
                        style={styles.contactBoxAction}
                        onPress={handleSendWhatsapp}
                    >
                        <Text style={styles.contactBoxActionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactBoxAction}
                        onPress={handleSendEmail}
                    >
                        <Text style={styles.contactBoxActionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default IncidentDetailsView;
