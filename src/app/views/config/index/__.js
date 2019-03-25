import {StatusOptions} from "../__";

//面包屑配置
let crumbs = [{title:"配置列表"}];

//配置列表头部信息
let header =
[
    {
        name:"Title",
        title:"配置名称",
        style:{width:"130px"},
        hover:true
    },
    {
        name:"Name",
        title:"配置标识",
        style:{width:"130px"}
    },
    {
        name:"Value",
        title:"配置值",
        style:{width:"150px"}
    },
    {
        name:"Tag",
        title:"配置标签",
        style:{width:"110px"}
    },
    {
        name:"Sort",
        title:"排序",
        style:{width:"100px"}
    },
    {
        name:"Status",
        title:"状态",
        style:{width:"70px"}
    },
    {
        name:"UpdatedAt",
        title:"更新时间",
        style:{width:"200px"}
    }
];

// 搜索条件
let search =
[
    {
        title:"配置标签",
        name:"Tag",
        type:"text",
        width:150,
        readOnly:false
    },
    {
        title:"配置状态",
        name:"Status",
        type:"select",
        width:150,
        defaultValue:"",
        options:[{title:"全部状态", value:""},].concat(StatusOptions),
        extra:{scene:"A"}
    },
];

// 列表操作设置
let listActionItems = [
    {title:"编辑", action: (v) => { console.log(v); }},
    {title:"禁用", action: (v) => { console.log(v); }},
];

//配置列表
export {crumbs as CrumbsData, header as HeaderData, search as SearchData, listActionItems as ListActionItems};