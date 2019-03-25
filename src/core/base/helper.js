let helper = {};

/**
 * 生成唯一标识
 */
helper.guid = () =>
{
    return "xxxxxxxxxxxx".replace(/[xy]/g, function(c)
    {
        let r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3) | 0x8;

        return v.toString(16);
    });
};

/**
 * 对象合并
 */
function merge ()
{
    let target = {};

    for (let i in arguments)
    {
        if (typeof arguments[i] === "object")
        {
            Object.assign(target, arguments[i]);
        }
    }

    return target;
}

/**
 * 对象合并
 */
helper.merge = merge;



merge("1", "2");
export default helper;