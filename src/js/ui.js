import _ from 'lodash';

var supportedLang = [{
        key: 'ja-JP',
        text: '日本語'
    },
    {
        key: 'zh-TW',
        text: '正體中文'
    },
    {
        key: 'en-US',
        text: 'English'
    },
    {
        key: 'zh-CN',
        text: '简体中文'
    }
];
var currentLang = '';
var data = [];
//navbar
data["search"] = { "ja-JP": "検索", "zh-TW": "搜尋", "en-US": "Search", "zh-CN": "查询" };
data["searchall"] = { "ja-JP": "すべて検索", "zh-TW": "搜尋全部", "en-US": "Search All", "zh-CN": "查询全部" };
data["clear"] = { "ja-JP": "クリア", "zh-TW": "清空", "en-US": "Clear", "zh-CN": "清空" };

data["currentversion"] = { "ja-JP": "バージョン：", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["officalannouncement"] = { "ja-JP": "お知らせ", "zh-TW": "遊戲公告", "en-US": "Offical Announcement", "zh-CN": "游戏公告" };

data["ui"] = { "ja-JP": "UI言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

data["server"] = { "ja-JP": "サーバー", "zh-TW": "伺服器", "en-US": "Server", "zh-CN": "服务器" };
data["disablecache"] = { "ja-JP": "キャッシュを無効化", "zh-TW": "停用快取", "en-US": "Disable Cache", "zh-CN": "禁用缓存", };
data["enablecache"] = { "ja-JP": "キャッシュを有効化", "zh-TW": "啟用快取", "en-US": "Enable Cache", "zh-CN": "启用缓存", };
data["disablecachewarning"] = {
    "ja-JP": "キャッシュを無効化にすると、ページの読み込みが遅くなります。無効化にしますか？",
    "zh-TW": "停用快取會使網頁載入變慢，是否確認停用？",
    "en-US": "Disabling caching will cause the page to load slowly, CONFIRM?",
    "zh-CN": "禁用缓存会导致网页加载缓慢，是否确认禁用？"
};

data["back"] = {
    "ja-JP": "前のページ",
    "zh-TW": "返回",
    "en-US": "Back",
    "zh-CN": "返回",
};

data["actress"] = {
    "ja-JP": "アクトレス",
    "zh-TW": "角色",
    "en-US": "Actress",
    "zh-CN": "角色",
};

data["actressGroupActress"] = {
    "ja-JP": "キャラエピソード",
    "zh-TW": "角色劇情",
    "en-US": "Character Episodes",
    "zh-CN": "角色剧情",
};

data["actressGroupComu"] = {
    "ja-JP": "絆エピソード",
    "zh-TW": "羈絆劇情",
    "en-US": "Bond Episodes",
    "zh-CN": "牵绊剧情",
};

data["story"] = {
    "ja-JP": "ストーリー",
    "zh-TW": "劇情",
    "en-US": "Story",
    "zh-CN": "剧情",
};

data["event"] = {
    "ja-JP": "イベント",
    "zh-TW": "活動",
    "en-US": "Event",
    "zh-CN": "活动",
};

data["frontier"] = {
    "ja-JP": "調査",
    "zh-TW": "調查",
    "en-US": "Frontier",
    "zh-CN": "调查",
};

data["festa"] = {
    "ja-JP": "フェスタ",
    "zh-TW": "嘉年華",
    "en-US": "Festa",
    "zh-CN": "庆典",
};

var getText = function (key) {
    if (!data[key]) {
        console.log("ui language data missing:" + key);
        return key;
    }
    return data[key][getLang()] || data[key]['en-US'];
};
var getLang = function () {
    if (!currentLang) {
        setLang();
    }
    return currentLang;
};
var getLangText = function () {
    if (!currentLang) {
        setLang();
    }
    return _.find(supportedLang, function (o) {
        return o.key == currentLang;
    }).text;
};
var setLang = function (lang) {
    lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
    if (_.some(supportedLang, function (o) { return o.key == lang }) == false) {
        lang = 'ja-JP';
    }
    currentLang = lang;
    localStorage["uilang"] = lang;
};
var renderDesc = function (text) {
    if (!text) {
        return text;
    }
    var html = text.replace(/\n/g, '<br />')
        .replace(/<color=#(.*?)>/g, "<span style='color:#$1;'>")
        .replace(/<\/color>/g, "</span>");
    if (html.endsWith("<br />")) {
        html += "　"; //fix for empty newline
    }
    return html;
};

const Ui = {
    supportedLang,
    getText,
    getLang,
    getLangText,
    setLang,
    renderDesc
};

export { Ui };
export default Ui;
