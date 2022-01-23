<template>
    <div>
        <div v-if="item.type==1" class="my-2">
            <div class="location text-white" v-html="Ui.renderDesc(item.text)"></div>
        </div>
        <div v-else-if="item.type==2" class="my-1">
            <div class="card">
                <div class="card-body p-1">
                    <ul class="nav nav-pills pb-1">
                        <li
                            class="nav-item"
                            v-for="command in item.commands"
                            :key="command.command"
                        >
                            <a
                                :class="['nav-link',{'active':currentCommand==command.command}]"
                                id="home-tab"
                                href="javascript:;"
                                @click="currentCommand=command.command"
                            >{{command.command}}</a>
                        </li>
                    </ul>
                    <div class="tab-content bg-dark px-2 py-1">
                        <div
                            v-for="command in item.commands"
                            :key="command.command"
                            :class="['tab-pane','fade',{'show active':currentCommand==command.command}]"
                        >
                            <ScenarioItem
                                v-for="(item, index) in command.items"
                                :key="index"
                                :item="item"
                            ></ScenarioItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="item.type==3||item.type==4" class="narration my-1">
            <div class="narration-name text-black-50">{{name}}</div>
            <div class="d-flex flex-column align-items-center p-2">
                <span
                    :style="{
                        fontSize: (item.size||1) + 'rem',
                    }"
                    v-html="Ui.renderDesc(item.text)"
                ></span>
            </div>
        </div>
        <div v-else-if="item.type==5" class="my-1">
            <div class="d-flex flex-column align-items-center p-2">
                <span
                    :style="{
                        fontSize: (item.size||1) + 'rem',
                    }"
                    v-html="Ui.renderDesc(item.text)"
                ></span>
            </div>
        </div>
        <div v-else-if="item.type==99" class="my-1">
            <div class="d-flex flex-column align-items-center p-2">
            </div>
        </div>
        <div v-else class="card my-1 d-inline-block">
            <div class="card-body p-0">
                <div class="media">
                    <img
                        v-if="iconPath"
                        :src="iconPath"
                        class="mr-3"
                        style="width:8rem;height:8rem;"
                        :alt="name"
                    />
                    <div class="media-body mr-3">
                        <h5
                            v-if="name"
                            class="mt-1"
                            style="border-bottom: 1px solid black;"
                        >{{name}}</h5>
                        <div
                            :style="{
                        fontSize: (item.size||1) + 'rem',
                    }"
                            v-html="Ui.renderDesc(item.text)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Data } from "../js/data.js";

export default {
    name: "ScenarioItem",
    props: {
        item: Object
    },
    data: function() {
        return {
            currentCommand:
                this.item.type == 2 ? this.item.commands[0].command : ""
        };
    },
    computed: {
        chara: function() {
            if (!this.item.chara) {
                return {};
            }
            return Data.get("chara", this.item.chara) || {};
        },
        name: function() {
            if (!this.chara.id) {
                return "";
            }
            if (this.item.charaNameOverride) {
                var override =
                    Data.get("chara", this.item.charaNameOverride) || {};
                return (
                    override.name ||
                    "？？？override" + this.item.charaNameOverride
                );
            }
            return this.chara.name || "？？？" + this.item.chara;
        },
        icon: function() {
            if (!this.chara.id) {
                return "";
            }
            return this.chara.icon2 || this.chara.icon || "";
        },
        iconPath: function() {
            if (!this.icon) {
                return "";
            }
            if (this.icon.startsWith("npc")) {
                return "/src/img/scenarioicon/" + this.icon + ".png";
            }
            return "/src/img/chara/" + this.icon + ".png";
        }
    }
};
</script>
<style scoped>
.location {
    font-size: 1.25rem;
    text-align: center;
}
.narration {
    position: relative;
    background: rgba(255, 255, 255, 0.75);
}
.narration .narration-name {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
}
</style>
