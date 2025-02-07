<template>
    <div class="create-appeal">
        <h2>Create New Appeal</h2>
        <appeal-form></appeal-form>
    </div>
</template>

<script>
import AppealForm from '../components/AppealForm.vue'

export default {
    name: 'CreateAppeal',
    components: {
        AppealForm
    }
}
</script>
