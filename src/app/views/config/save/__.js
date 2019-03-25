import {StatusOptions} from "../__";

//配置表单
// 0:text,1:textarea,2:password,3:file,4:select,5:radio
let inputs =
[
    {title:"配置名称", type:"text", name:"Title", value:"", placeholder:"请输入配置名称"},
    {title:"配置标识(唯一)", type:"text", name:"Name", value:"", placeholder:"配置标识由英文字母、数字、下划线组成"},
    {title:"配置值(选填)", type:"textarea", name:"Value", value:"", placeholder:""},
    {title:"配置标签", type:"text", name:"Tag", value:"", placeholder:"配置名称由英文字母组成"},
    {title:"配置排序", type:"text", name:"Sort", value:"0", placeholder:"排序"},
    {title:"配置状态", type:"radio", name:"Status", value:"1", placeholder:"", data : StatusOptions},
];

export {inputs as InputsData};