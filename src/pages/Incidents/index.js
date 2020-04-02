import React, { useCallback, useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import logo from "../../assets/logo.png";
import IncidentService from "../../services/IncidentService";
import OngService from "../../services/OngService";

const IncidentsView = () => {
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [refreshing] = useState(false);

    const PAGE = 1;
    const DEFAULT_PAGE_SIZE = 10;

    const findIncidents = useCallback(async () => {
        const data = await IncidentService.findAllIncidents(PAGE, DEFAULT_PAGE_SIZE);

        if (data && !data.error) {
            const incidentsWithOngData = [];
            for (const incident of data) {
                const ongData = await OngService.findOngByEmail(incident.ongEmail);
                const incidentWithOngData = {...incident, ong: ongData};

                if (incidentWithOngData.ong && incidentWithOngData.ong.name) {
                    incidentsWithOngData.push(incidentWithOngData);
                }
            }

            setIncidents(incidentsWithOngData);
        }
    }, []);

    useEffect(() => {
        findIncidents();
    }, [findIncidents]);

    const refreshPage = useCallback(() => {
        findIncidents();
    }, [findIncidents]);

    const handleViewDetailsOnPress = useCallback((incident) => {
        return () => {
            navigation.navigate("IncidentDetails", incident);
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />

                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{incidents.length} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>

            <Text style={styles.description}>Escolha ums dos casos abaixo e salve o dia</Text>

            <FlatList
                style={styles.incidentsContainer}
                data={incidents}
                keyExtractor={(incident) => incident._id}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={refreshPage}
                renderItem={({item}) => {
                    return (
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>Ong:</Text>
                            <Text style={styles.incidentValue}>{item.ong.name}</Text>

                            <Text style={styles.incidentProperty}>Caso:</Text>
                            <Text style={styles.incidentValue}>{item.title}</Text>

                            <Text style={styles.incidentProperty}>Valor:</Text>
                            <Text style={styles.incidentValue}>R$ {parseFloat(item.value).toFixed(2)}</Text>

                            <TouchableOpacity
                                style={styles.viewDetailsButton}
                                onPress={handleViewDetailsOnPress(item)}>
                                <Text style={styles.viewDetailsButtonText}>Ver mais detalhes</Text>

                                <Feather name="arrow-right" size={17} color="#e02041" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default IncidentsView;
