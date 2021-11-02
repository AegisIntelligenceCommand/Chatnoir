<template>
    <div class="main-container h-100">
        <ScenarioList />
        <SearchOverlay />
        <Scenario />
    </div>
</template>

<script>
import { Event } from "../js/event.js";

import ScenarioList from "./ScenarioList.vue";
import Scenario from "./Scenario.vue";
import SearchOverlay from "./SearchOverlay.vue";

export default {
    data: function() {
        return {};
    },
    created: function() {
        var $vm = this;
        Event.$on("render", function(type, id) {
            Event.$emit("set-current-scenario", type, id);
        });
    },
    computed: {},
    components: {
        ScenarioList,
        Scenario,
        SearchOverlay
    }
};
</script>
<style lang="scss" scoped>
.main-container {
    padding-top: 56px;
}
</style>


