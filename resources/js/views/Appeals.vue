<template>
    <div class="appeals">
        <h2>Appeals</h2>
        <appeal-search></appeal-search>
        <appeal-list></appeal-list>
    </div>
</template>

<script>
import AppealSearch from '../components/AppealSearch.vue'
import AppealList from '../components/AppealList.vue'

export default {
    name: 'Appeals',
    components: {
        AppealSearch,
        AppealList
    }
}
</script>
