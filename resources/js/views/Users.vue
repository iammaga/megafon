<template>
    <div class="users">
        <h2>Users</h2>
        <user-list></user-list>
    </div>
</template>

<script>
import UserList from '../components/UserList.vue'

export default {
    name: 'Users',
    components: {
        UserList
    }
}
</script>
