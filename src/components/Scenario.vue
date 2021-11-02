<template>
    <transition name="fade">
        <div class="scenario bg-dark" v-show="isShow">
            <div class="scenario-title bg-secondary text-light px-3 py-1">
                <span style="font-size:1.5rem;line-height:2rem;">{{title}}</span>
                <span style="float:right;cursor:pointer;" @click="isShow=false">
                    <i class="material-icons" style="line-height: 2rem;">close</i>
                </span>
            </div>
            <div ref="main" class="scenario-item-container">
                <ScenarioItem
                    v-for="(item, index) in list"
                    :key="JSON.stringify(item)+index"
                    :item="item"
                ></ScenarioItem>
            </div>
        </div>
    </transition>
</template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

import ScenarioItem from "./ScenarioItem.vue";

export default {
    data: function() {
        return {
            isShow: false,
            type: "",
            id: 0
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("set-current-scenario", function(type, id) {
            $vm.isShow = !!type && !!id;
            $vm.type = type;
            $vm.id = id;
            $vm.$nextTick(function() {
                $vm.$refs.main.scrollTop = 0;
            });
        });
    },
    methods: {},
    computed: {
        title: function() {
            if (!this.type || !this.id) {
                return "";
            }
            var $vm = this;
            var category = Data.get("scenariolist", $vm.type);

            var recursive = function(l) {
                for (var i = 0; i < l.length; i++) {
                    var group = l[i];
                    if (group.list) {
                        var child = recursive(group.list);
                        if (child && child.id) {
                            return child;
                        }
                    } else if (group.type == $vm.type && group.id == $vm.id) {
                        return group;
                    }
                }
                return {};
            };
            return recursive(category.list).name;
        },
        list: function() {
            if (!this.type || !this.id) {
                return [];
            }
            return Data.getAll("scenario_" + this.type)[this.id];
        }
    },
    components: {
        ScenarioItem
    }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.scenario {
    position: fixed;
    top: 56px;
    left: 0;
    z-index: 1024;
    width: 100%;
    height: calc(100% - 56px);

    .scenario-title {
        height: 2.5rem;
    }

    .scenario-item-container {
        height: calc(100% - 2.5rem);
        padding: 0rem 1rem;
        overflow: auto;
    }
}
</style>