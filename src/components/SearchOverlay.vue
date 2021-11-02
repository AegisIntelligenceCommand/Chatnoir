<template>
    <transition name="fade">
        <div class="search-overlay bg-dark" v-show="isShow">
            <div class="search-title bg-secondary text-light px-3 py-1">
                <span style="font-size:1.5rem;line-height:2rem;">{{title}}</span>
                <span style="float:right;cursor:pointer;" @click="isShow=false">
                    <i class="material-icons" style="line-height: 2rem;">close</i>
                </span>
            </div>
            <div ref="main" class="search-overlay-item-container">
                <ScenarioItem
                    v-for="(item, index) in list"
                    :key="JSON.stringify(item)+index"
                    :item="item"
                    class="float-left mr-2"
                    style="cursor:pointer;"
                    @click.native="openScenario(item)"
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
            list: [],
            title: ""
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("close-search", function() {
            $vm.list = [];
            $vm.isShow = false;
        });
        Event.$on("open-search", function(query, maxItems) {
            if (query === "") {
                return;
            }
            maxItems = maxItems || 100;
            $vm.isShow = true;
            $vm.search(query, maxItems);
        });
    },
    methods: {
        openScenario: function(item) {
            if (window.getSelection().toString().length) {
                return;
            }
            location.href =
                "#!/scenario/" + item.param_type + "/" + item.param_id;
        },
        search: function(query, maxItems) {
            var $vm = this;
            $vm.list = [];
            $vm.title = $vm.Ui.getText("searching");
            $vm.$nextTick();

            var newList = [];
            var doSearch = function(type, id, items) {
                //if (newList.length > maxItems) {
                //    return false;
                //}
                for (var i = 0; i < items.length; i++) {
                    if (items[i].items) {
                        doSearch(type, id, items[i].items);
                    }
                    if ((items[i].text || "").indexOf(query) > -1) {
                        items[i].param_type = type;
                        items[i].param_id = id;
                        newList.push(items[i]);
                        //if (newList.length > maxItems) {
                        //    return false;
                        //}
                    }
                }
            };
            new Promise(
                function(resolve, reject) {
                    _.each(
                        ["actress", "story", "event", "frontier", "festa"],
                        function(type) {
                            _.each(Data.getAll("scenario_" + type), function(
                                items,
                                id
                            ) {
                                return doSearch(type, id, items);
                            });
                        }
                    );
                    resolve();
                    //setTimeout(resolve, 5000);
                }.bind(this)
            ).then(
                function(result) {
                    $vm.title = newList.length + " items searched.";
                    if (newList.length > maxItems) {
                        $vm.title =
                            newList.length +
                            " items searched, only show top 100 items.";
                    }
                    $vm.list = newList.slice(0, maxItems);
                    $vm.$nextTick();
                }.bind(this)
            );
        }
    },
    computed: {},
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

.search-overlay {
    position: fixed;
    top: 56px;
    left: 0;
    z-index: 1024;
    width: 100%;
    height: calc(100% - 56px);

    .search-title {
        height: 2.5rem;
    }

    .search-overlay-item-container {
        height: calc(100% - 2.5rem);
        padding: 0.25rem 1rem;
        overflow: auto;
    }
}
</style>