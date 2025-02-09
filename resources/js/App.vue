<template>
    <div id="app" class="min-h-screen bg-gray-100">
        <Header v-if="isAuthenticated" />
        <main class="p-4">
            <router-view />
        </main>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        Header
    },
    computed: {
        ...mapState(['isAuthenticated'])
    }
};
</script>
