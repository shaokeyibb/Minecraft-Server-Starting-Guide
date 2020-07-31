module.exports = {
    title: 'Minecraft-Server-Starting-Guide',
    base: '/',
    head: [],
    plugins: [],
    themeConfig: {
        sidebar: [],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        nav: [
            { text: '主页', link: '/' },
            { text: '教程', link: '/guide/' },
            { text: 'GitHub', link: 'https://github.com/shaokeyibb/Minecraft-Server-Starting-Guide' },
          ],
        smoothScroll: true
    },
    plugins: {
        "vuepress-plugin-auto-sidebar": {
            titleMode: "titlecase",
        },
    },
    markdown: {
        plugins: [
            "footnote",
            "sup",
            "sub"
        ]
    }
}
