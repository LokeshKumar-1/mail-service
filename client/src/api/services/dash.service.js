import apiClient from "../apiClient.js";

export const sendMailService = async(content) => {
    try {
        const response = await apiClient.post("/send-mail", content)
        console.log(response, "response")
        if (response.status === 200 || response.status === 201) {
            return response.data
        }
        return null
    } catch (e) {
        console.error(e)
        return null
    }
}