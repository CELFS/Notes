window.$docsify = {
    auto2top: true,
    name: '编程内外',
    repo: 'https://github.com/CELFS/Notes',
    loadSidebar: true,
    loadNavbar: false,
    mergeNavbar: true,
    coverpage: false,
    maxLevel: 5,
    subMaxLevel: 4,
    sidebarDisplayLevel: 0,
    pagination: {
        previousText: 'PREV',
        nextText: 'NEXT',
    },
    count: {
        countable: true,
        position: 'top',
        margin: '10px',
        float: 'right',
        fontsize:'0.9em',
        color:'rgb(90,90,90)',
        language:'chinese',
        isExpected: true
    },
    search: {
        maxAge: 86400000,
        paths: 'auto',
        depth:10,
        noData: {
            '/es/': '¡No hay resultados!',
            '/de-de/': 'Keine Ergebnisse!',
            '/ru-ru/': 'Никаких результатов!',
            '/zh-cn/': '没有结果!',
            '/': 'No results!',
        },
        placeholder: {
            '/es/': 'Buscar',
            '/de-de/': 'Suche',
            '/ru-ru/': 'Поиск',
            '/zh-cn/': '搜索',
            '/': 'Search',
        },
        hideOtherSidebarContent: true,
        pathNamespaces: ['/es', '/de-de', '/ru-ru', '/zh-cn'],
    },
    plugins: [
        function(hook, vm) {
            hook.beforeEach(function(html) {
                // Markdown highlight syntax "== =="
                let res = html.match(/==(.+?)==/g);
                if (res) {
                for (var i = 0; i < res.length; i++) {
                    html = html.replace(res[i], `<mark>` + res[i].replace(/==/g, "") + `</mark>`);
                }
            }
                // update time, show on the top
                // return '> Last Modified {docsify-updated}' + '\n----\n' + html;
                return html;
            })
        }
    ],
}