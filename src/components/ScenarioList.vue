<template>
    <div class="scenario-list background h-100">
        <div class="scenario-list-container h-100">
            <div>
                <a
                    class="btn btn-secondary btn-block"
                    :class="{'active':item.id==selectedId}"
                    v-for="item in list"
                    :key="item.id"
                    :href="'#!/scenario/'+item.id"
                >{{Ui.getText(item.nameKey)}}</a>
            </div>
        </div>
        <div class="child-list-container h-100" v-if="!!selectedId">
            <ScenarioListChild
                :key="selectedId"
                :parentId="selectedId"
                :list="childList"
                :scenarioId="scenarioId"
            />
        </div>
    </div>
</template>

<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

import ScenarioListChild from "./ScenarioListChild.vue";

export default {
    created: function() {
        var $vm = this;
        Event.$on("set-current-scenario", function(type, id) {
            $vm.selectedId = "";
            if (!type) {
                return;
            }
            $vm.$nextTick(function() {
                var item = Data.get("scenariolist", type);
                $vm.childList = item.list;
                $vm.selectedId = item.id;
                $vm.scenarioId = id;
            });
        });
    },
    data: function() {
        return {
            list: Data.getAll("scenariolist"),
            selectedId: "",
            childList: [],
            scenarioId: ""
        };
    },
    components: {
        ScenarioListChild
    }
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

$scenario-list-width: 12rem;

.scenario-list {
    position: relative;

    .scenario-list-container {
        width: $scenario-list-width;
        border-right: 1px #ccc solid;
        overflow-y: auto;
        padding: 0.5rem;
    }

    @include media-breakpoint-down(md) {
        .scenario-list-container {
            width: 100%;
            border: none;
        }
    }

    .child-list-container {
        position: absolute;
        right: 0;
        top: 0;
        width: calc(100% - #{$scenario-list-width});
    }
    @include media-breakpoint-down(md) {
        .child-list-container {
            width: 100%;
        }
    }
}
</style>

