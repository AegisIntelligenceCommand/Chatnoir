<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a class="pr-2" href="../">
            <i class="icon icon-murakumo"></i>
        </a>
        <a class="navbar-brand" title="AIC Historical Archives" href="#">
            <span class="d-none d-md-inline-block">AIC</span>
            <span class="d-md-none">MI</span>
            <span>Historical Archives</span>
            <!--<span class="d-none d-sm-inline-block"></span>-->
        </a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <form @submit.prevent="openSearch()" class="form-inline my-2 my-lg-0">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button
                                class="btn btn-outline-danger"
                                type="button"
                                @click="closeSearch()"
                            >{{Ui.getText('clear')}}</button>
                        </div>
                        <input
                            class="form-control"
                            type="search"
                            v-model="searchQuery"
                            :placeholder="Ui.getText('search')"
                        />
                        <div class="input-group-append">
                            <button
                                class="btn btn-outline-primary"
                                type="button"
                                @click="openSearch()"
                            >{{Ui.getText('search')}}</button>
                            <button
                                class="btn btn-outline-primary"
                                type="button"
                                @click="openSearchAll()"
                            >{{Ui.getText('searchall')}}</button>
                        </div>
                    </div>
                </form>
            </ul>

            <ul class="navbar-nav my-0">
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="icon icon-version"></i>
                        <div
                            class="d-inline-block"
                            style="vertical-align: top; height: 0; margin-top: -0.325rem; padding-right: 0.25rem;"
                        >
                            <div id="server">{{currentServer.name}}</div>
                            <div class="m-0" id="version">
                                <i
                                    v-show="isUpdating"
                                    class="material-icons version-text spin"
                                >autorenew</i>
                                <span v-show="isUpdating" class="version-text">Updating...</span>
                                <span
                                    v-show="isUpdateReady"
                                    class="version-text"
                                    style="font-weight: bold;color: #ff5588;"
                                >NEW!</span>
                                <span
                                    v-show="!(isUpdating||isUpdateReady)"
                                    class="version-text"
                                >{{currentServer.version}}</span>
                            </div>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <h6 class="dropdown-header">{{Ui.getText("server")}}</h6>
                        <a
                            v-for="o in allServers"
                            :key="o.id"
                            :class="['dropdown-item',o.id == currentServer.id ? 'active' : '']"
                            :href="'#!/server/' + o.id"
                        >
                            {{o.name}}
                            <p
                                class="m-0"
                                style="font-size:0.75rem;line-height:0.75rem;"
                            >{{o.version}}</p>
                        </a>
                        <div class="dropdown-divider" id="serverDivider"></div>
                        <h6 class="dropdown-header">{{Ui.getText("externallink")}}</h6>
                        <a
                            class="dropdown-item"
                            href="https://colopl.co.jp/alicegearaegis/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span class="mr-4">{{Ui.getText("officalsite")}}</span>
                            <i
                                class="material-icons text-black-50"
                                style="position:absolute;right:1rem;"
                            >open_in_new</i>
                        </a>
                        <a
                            class="dropdown-item"
                            href="https://alice.colopl.jp/news/show"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span class="mr-4">{{Ui.getText("officalannouncement")}}</span>
                            <i
                                class="material-icons text-black-50"
                                style="position:absolute;right:1rem;"
                            >open_in_new</i>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a
                            class="dropdown-item"
                            href="#"
                            @click="toggleCache()"
                        >{{Ui.getText(cacheDisabled?"enablecache":"disablecache")}}</a>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="material-icons">language</i>
                        <span id="currentLang">{{langText}}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <a
                            v-for="lang in Ui.supportedLang"
                            v-bind:key="lang.key"
                            class="dropdown-item"
                            v-bind:href="'#!/lang/'+lang.key"
                            @click="langText=lang.text"
                        >{{lang.text}}</a>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { Data } from "../js/data.js";
import { Ui } from "../js/ui.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            langText: Ui.getLangText(),
            isUpdating: false,
            isUpdateReady: false,
            searchQuery: ""
        };
    },
    created: function() {
        var $vm = this;
        Event.$on("new-version-updating", function() {
            console.log("new-version-updating");
            $vm.isUpdating = true;
            $vm.isUpdateReady = false;
        });
        Event.$on("new-version-update-ready", function() {
            console.log("new-version-update-ready");
            $vm.isUpdating = false;
            $vm.isUpdateReady = true;
        });
    },
    methods: {
        toggleCache: function() {
            if (this.cacheDisabled) {
                localStorage["MI_Chatnoir_Disable_Cache"] = false;
                location.reload();
                return;
            }
            if (!confirm(Ui.getText("disablecachewarning"))) {
                return;
            }
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .getRegistration()
                    .then(function(registration) {
                        registration &&
                            registration.unregister().then(function(r) {
                                localStorage[
                                    "MI_Chatnoir_Disable_Cache"
                                ] = true;
                                location.reload();
                            });
                    });
            }
        },
        openSearch: function() {
            Event.$emit("open-search", this.searchQuery);
        },
        openSearchAll: function() {
            Event.$emit("open-search", this.searchQuery, 99999999);
        },
        closeSearch: function() {
            this.searchQuery = "";
            Event.$emit("close-search");
        }
    },
    computed: {
        currentServer: function() {
            return Data.getCurrentServer();
        },
        allServers: function() {
            return Data.getAllServers();
        },
        cacheDisabled: function() {
            return localStorage["MI_Chatnoir_Disable_Cache"] === "true";
        }
    }
};
</script>
<style scoped>
.icon {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    display: inline-block;
    vertical-align: middle;
}

.icon.icon-version {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: -1rem;
    margin-bottom: -1rem;
    opacity: 0.5;
    background-image: url(../img/version.png);
}

.icon.icon-murakumo {
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(../img/aegis-circle.png);
}

.version-text {
    font-size: 0.75rem;
    line-height: 0.75rem;
    vertical-align: top;
}

.spin {
    animation: spin 2s infinite linear;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
