/*导航菜单配置*/
let nav =
[
    {
        title:"系统管理",
        icon:"fal fa-cog",
        open:true,
        items:[
            {title:"配置管理", link:"/config"},
            {title:"用户管理", link:"/user"},
            {title:"权限管理", link:"/user"},
            {title:"日志管理", link:"/log"}
        ]
    },
    {
        title:"资源管理",
        icon:"fal fa-cog",
        open:false,
        items:[
            {title:"模块列表", link:"/module"},
            {title:"文章列表", link:"/user"},
            {title:"图片资源", link:"/config"},
        ]
    },
    {
        title:"会员管理",
        icon:"fal fa-cog",
        open:false,
        items:[
            {title:"会员列表", link:"/config"},
            {title:"消费记录", link:"/user"},
            {title:"权限列表", link:"/user"},
            {title:"访问日志", link:"/log"}
        ]
    },
];

export {nav as NavData}