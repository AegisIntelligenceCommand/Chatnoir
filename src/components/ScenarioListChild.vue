<template>
    <div class="scenario-list-child background h-100">
        <div
            :id="'container_'+parentId"
            class="child-container h-100"
            :class="{'no-child':!hasChild}"
        >
            <div class="back-button">
                <button type="button" class="btn btn-danger btn-block text-left" @click="back()">
                    <i class="material-icons">arrow_back</i>
                    <span>{{Ui.getText('back')}}</span>
                </button>
            </div>
            <div class="child-list">
                <template v-for="item in list">
                    <a
                        v-if="!item.list"
                        :key="item.id"
                        :id="'button_'+parentId+'_'+item.id"
                        class="btn btn-light btn-block text-left"
                        :class="{
                            'active':item.id==selectedId
                        }"
                        :href="'#!/scenario/'+item.type+'/'+item.id"
                    >
                        <span v-if="item.nameKey">{{Ui.getText(item.nameKey)}}</span>
                        <span v-else>{{item.name}}</span>
                        <i class="material-icons float-right">open_in_browser</i>
                    </a>
                    <button
                        v-else
                        :key="item.id"
                        :id="'button_'+parentId+'_'+item.id"
                        type="button"
                        class="btn btn-light btn-block"
                        :class="{
                           'active':item.id==selectedId
                       }"
                        @click="setChild(item)"
                    >
                        <span v-if="item.nameKey">{{Ui.getText(item.nameKey)}}</span>
                        <span v-else>{{item.name}}</span>
                    </button>
                </template>
            </div>
        </div>
        <div class="child-child-container h-100" v-if="(!!selectedId)&&(!!hasChild)">
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

import { scroller } from "vue-scrollto/src/scrollTo";

export default {
    name: "ScenarioListChild",
    props: {
        list: Array,
        parentId: String,
        scenarioId: String
    },
    created: function() {
        var $vm = this;
        if (this.scenarioId) {
            var recursive = function(l) {
                for (var i = 0; i < l.length; i++) {
                    var group = l[i];
                    if (group.list) {
                        var child = recursive(group.list);
                        if (child && child.id) {
                            return group;
                        }
                    } else if (group.id == $vm.scenarioId) {
                        return group;
                    }
                }
                return {};
            };
            var item = recursive(this.list);
            this.setChild(item);
            this.$nextTick(function() {
                var asnycScroller = scroller();
                asnycScroller("#button_" + $vm.parentId + "_" + item.id, {
                    container: "#container_" + $vm.parentId,
                    offset: -8,
                    duration: 1 //cannot set to 0
                });
            });
        }
    },
    data: function() {
        return {
            selectedId: "",
            childList: [],
            hasChild: false
        };
    },
    methods: {
        back: function() {
            this.$parent.selectedId = "";
            if (this.$parent.$options.name != "ScenarioListChild") {
                location.hash = "";
            }
        },
        setChild: function(item) {
            this.hasChild = item.list !== undefined;
            this.selectedId = item.id;
            this.childList = item.list;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

$scenario-list-child-width: 15rem;

.scenario-list-child {
    position: relative;

    .child-container {
        width: $scenario-list-child-width;
        border-right: 1px #ccc solid;
        overflow-y: auto;
    }
    .child-container.no-child {
        width: 100%;
    }

    @include media-breakpoint-down(md) {
        .child-container {
            width: 100%;
            border: none;
        }
    }

    .back-button {
        padding: 0.5rem 0.5rem 0 0.5rem;
    }

    @include media-breakpoint-up(lg) {
        .back-button {
            display: none;
        }
    }

    .child-list {
        padding: 0.5rem;
    }

    .child-child-container {
        position: absolute;
        right: 0;
        top: 0;
        width: calc(100% - #{$scenario-list-child-width});
    }
    @include media-breakpoint-down(md) {
        .child-child-container {
            width: 100%;
        }
    }
}
</style>

