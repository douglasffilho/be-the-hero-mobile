import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 24,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    incident: {
        marginTop: 32,
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },

    incidentProperty: {
        textTransform: "uppercase",
        fontSize: 14,
        color: "#41414d",
        fontWeight: "bold",
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: "#737380",
    },

    lastIncidentValue: {
        marginBottom: 0,
    },

    contactBox: {
        marginTop: 16,
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },

    contactBoxFeaturedText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#13131a",
        lineHeight: 30,
    },

    contactBoxText: {
        fontSize: 15,
        color: "#737380",
        marginTop: 16,
    },

    contactBoxActions: {
        marginTop: 16,
        justifyContent: "space-between",
        flexDirection: "row",
    },

    contactBoxAction: {
        backgroundColor: "#e02041",
        borderRadius: 8,
        height: 50,
        width: "48%",
        alignItems: "center",
        justifyContent: "center"
    },

    contactBoxActionText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "bold",
    },
});

export default styles;
