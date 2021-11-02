<template>
    <div class="h-100">
        <Nav/>
        <Chatnoir/>
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Chatnoir from "./components/Chatnoir.vue";

export default {
    components: {
        Nav,
        Chatnoir
    }
};
</script>