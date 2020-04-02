import api from "./api";

const OngService = {
    async findOngByEmail(email) {
        try {
            const response = await api.get(`/ongs/${email}`);

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

export default OngService;
