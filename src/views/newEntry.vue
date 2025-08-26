<template>
    <div>
        <h2>Create New Entry</h2>
        <form ref="form" @submit.prevent="handleSubmit">
            <label>Pattern: <input type="text" v-model="pattern"></label>
            <br>
            <label for="category">Category</label>
            <select id="category" v-model="category">
                <option disabled value="">Select One</option>
                <option value="normal operation">Normal Operation</option>
                <option value="problematic">Problematic</option>
            </select>
            <br>
            <label>System Area: <input type="text" v-model="systemArea"></label>
            <br>
            <label for="logType">Type of Log</label>
            <select id="logType" v-model="logType">
                <option disabled value="">Log Type</option>
                <option value="roon">Roon</option>
                <option value="roonserver">RoonServer</option>
                <option value="raatserver">RAATServer</option>
            </select>
            <br>
            <label>
                <p>Explanation: </p>
                <textarea v-model="explanation" placeholder="What does this trace mean?" rows="4" cols="35"></textarea>
            </label>
            <br>
            <label>Related URL: <input type="text" v-model="troubleshootingLink"></label>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from 'vue'
    import axios from 'axios'

    export default defineComponent({
        name: "newEntry",
        setup(){
            const pattern = ref("")
            const category = ref("")
            const systemArea = ref("")
            const logType = ref("")
            const explanation = ref("")
            const troubleshootingLink = ref("")

            const handleSubmit = async () => {
                try{
                    const payload = {
                        pattern: pattern.value,
                        category: category.value,
                        systemArea: systemArea.value,
                        logType: logType.value,
                        explanation: explanation.value,
                        troubleshootingLink: troubleshootingLink.value
                    }
                    const response = await axios.post('http://localhost:3000/api/post', payload, {
                                                                                                    headers: {
                                                                                                        'Content-Type': 'application/json'
                                                                                                    }
                                                                                                })
                    console.log("Form submitted", response.data)
                    pattern.value = "";
                    category.value = "";
                    systemArea.value = "";
                    logType.value = "";
                    explanation.value = "";
                    troubleshootingLink.value = "";
                } catch(error){
                    console.error("Submission failed: ", error)
                }
        }

            return {
            pattern,
            category,
            systemArea,
            logType,
            explanation,
            troubleshootingLink,
            handleSubmit
            }
        },
    })
</script>

<style>

</style>