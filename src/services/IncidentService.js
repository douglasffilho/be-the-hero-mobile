import api from "./api";

const IncidentService = {
    async findAllIncidents(page, size) {
        try {
            const response = await api.get(
                `/incidents?page=${page}&size=${size}`
            );

            return response.data;
        } catch (error) {
            if (!error.response || !error.response.status) {
                return {
                    error: {
                        syserror: "system-service-unavailable",
                    },
                };
            }

            const errors = error.response.data;
            console.error(errors);
            return { error: errors };
        }
    }
};

export default IncidentService;
