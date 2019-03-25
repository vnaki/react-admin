if (!window.XMLHttpRequest)
{
    throw new Error ("您的浏览器不支持XMLHttpRequest,推荐使用谷歌浏览器！");
}

/**
 * 将键值对转为查询字符串
 * @param data 要格式的数据
 * @param encode 是否编码
 */
let qs = function (data, encode)
{
    if (typeof data === "object")
    {
        let qs = [];

        for (let key in data)
        {
            qs.push(key+"="+ (encode === true ? encodeURIComponent(data[key]) : data[key]) );
        }

        data = qs.join("&");
    }

    return data || null;
};

/**
 * 创建请求实例
 * @param url    请求地址
 * @param props  附加属性
 * @param events 事件定义
 * 额外属性:
 * props : {
 *    method:"GET",
 *    timeout:5000,
 *    models:null,
 *    dataType:"json",
 *    async:true,
 *    withCredentials:false,
 *    headers:{}
 * }
 */
XMLHttpRequest.create = function (url, props, events)
{
    return (new XMLHttpRequest()).fetch(url, (function (props)
    {
        let init =
        {
            method:"GET",
            timeout:5000,
            data:null,
            query:null,
            dataType:"json",
            async:true,
            withCredentials:false,
            header: {
                "X-Requested-With" : "XMLHttpRequest",
                "Content-type" : "application/x-www-form-urlencoded"
            }
        };

        if (typeof props !== "object")
        {
            props = {};
        }

        if (-1 < ["GET", "POST", "PUT", "PATCH", "DELETE"].indexOf(props.method))
        {
            init.method = props.method;
        }

        if (typeof props.timeout === "number" && props.timeout > 0)
        {
            init.timeout = props.timeout;
        }

        if (-1 < ["text", "json", "xml", "html"].indexOf(props.dataType) )
        {
            init.dataType = props.dataType;
        }

        if (typeof props.async === "boolean")
        {
            init.async = props.async;
        }

        if (typeof props.withCredentials === "boolean")
        {
            init.withCredentials = props.withCredentials;
        }

        if (typeof props.header === "object")
        {
            Object.assign(init.header, props.header);
        }

        if (props.data !== undefined)
        {
            init.data = props.data;
        }

        if (typeof props.query === "object")
        {
            init.query = qs(props.query, true);
        }

        return init;
    })(props), events || {});
};

/**
 * 响应处理队列
 * @param handler
 */
XMLHttpRequest.prototype.then = function (handler)
{
    if (typeof handler === "function") this.queue.push(handler);
    return this;
};

/**
 * 发出请求
 * @param url    请求地址
 * @param props  额外属性
 * @param events 定义事件
 */
XMLHttpRequest.prototype.fetch = function (url, props, events)
{
    if (typeof props.query === "string" && props.query !== "")
    {
        url += "?" + props.query;
    }

    this.queue = [];

    this.open(props.method, url, props.async);

    this.timeout         = props.timeout;
    this.withCredentials = props.withCredentials;

    //发送请求头
    for (let key in props.header)
    {
        this.setRequestHeader(key, props.header[key]);
    }

    //监听事件
    for (let event in events)
    {
        if (this["on"+event] !== undefined)
        {
            this["on"+event] = events[event];
        }
    }

    //监听状态变化
    this.onreadystatechange = function ()
    {
        if (this.readyState === XMLHttpRequest.DONE)
        {
            for (let i in this.queue)
            {
                if (false === this.queue[i]({status:this.status, statusText:this.statusText, response:this.response})) break;
            }
        }
    };

    switch (props.dataType)
    {
        case "xml" :
            this.responseType = "document";
            this.overrideMimeType("text/xml");
            break;
        case "html" :
            this.responseType = "document";
            this.overrideMimeType("text/html");
            break;
        default :
            this.responseType = props.dataType;
            break;
    }

    let body = null;

    if (-1 === ["GET", "DELETE"].indexOf(props.method))
    {
        body = qs(props.data);
    }

    this.send(body);

    return this;
};

export default XMLHttpRequest;