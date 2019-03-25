import XMLHttpRequest from "../core/base/zyy/Kernel";

let Next = {};

/**
 * GET请求
 */
Next.Get = function (src, query, response)
{
    this.Fetch(src, "GET", query, {}, response);
};

/**
 * POST请求
 */
Next.Post = function (src, data, response)
{
    this.Fetch(src, "POST", {}, data, response);
};

/**
 * PUT请求
 */
Next.Put = function (src, data, response)
{
    this.Fetch(src, "PUT", {}, data, response);
};

/**
 * PATCH请求
 */
Next.Patch = function (src, data, response)
{
    this.Fetch(src, "PATCH", {}, data, response);
};

/**
 * DELETE请求
 */
Next.Delete = function (src, query, response)
{
    this.Fetch(src, "DELETE", query, {}, response);
};

/**
 * 发起网络请
 * @param src    请求地址
 * @param method 请求方法 GET/POST/PUT/PATCH/DELETE
 * @param query  查询参数
 * @param data   请求数据,只对POST/PATCH/PUT有效
 * @param response 响应处理
 */
Next.Fetch = function (src, method, query, data, response)
{
    this.method = method;

    return XMLHttpRequest.create(src,{
        method  : method,
        data    : data || null,
        query   : query || null,
        headers : {},
        withCredentials : true
    }, this.events).then((fulfilled) => {

        window.Toast(null);

        if (fulfilled.status === 200)
        {
            if (typeof response === "function")
            {
                response(fulfilled.response);
            }

            return ;
        }

        if (fulfilled.status > 0)
        {
            this.Exception(fulfilled.status, fulfilled.statusText);
        }
    });
};

/**
 * 异常处理
 */
Next.Exception = function (status, statusText)
{

};

/**
 * 事件定义
 */
Next.events = {};

//加载开始事件
Next.events.loadstart = function ()
{
    let message = "";

    switch (this.method)
    {
        case "GET"   : message = "加载中..."; break;
        case "POST"  : message = "提交中..."; break;
        case "PUT"   : message = "提交中..."; break;
        case "PATCH" : message = "提交中..."; break;
        case "DELETE": message = "删除中..."; break;
        default : message = "请求中...";
    }

    window.Toast(message);
};

//请求超时
Next.events.timeout = function ()
{
    window.Toast("请求网络超时", {scene:"warn", duration:3});
};

//网络错误,如服务端不可用
Next.events.error = function ()
{
    window.Toast("网络错误,稍后再试~", {scene:"warn", duration:3});
};

export default Next;