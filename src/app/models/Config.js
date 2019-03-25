import Base from "./Base";
import Next from "../next";
import Api from "../api";
import Validator from "../../core/base/validator";

/**
 * 系统配置
 */
export default class Config extends Base
{
    /**
     * 配置列表
     * @param query   查询参数 {key:value, ...}
     * @param handler 响应处理
     */
    static rows (query, handler)
    {
        Next.Get(Api.config.rows, query, handler);
    }

    /**
     * 创建配置
     * @param handler
     */
    create (handler)
    {
        Next.Post(Api.config.create, this.data, handler);
    }

    /**
     * 编辑配置
     * @param handler
     */
    update (handler)
    {
        Next.Post(Api.config.update, this.data, handler);
    }

    /**
     * validate data
     */
    validate()
    {
        let vd = new Validator();

        vd.require(this.data["Title"]).message               = "配置名称不能为空!";
        vd.alphaDash(this.data["Name"]).message              = "配置标识格式不正确!";
        vd.maxSize(this.data["Name"], 65535 ).message   = "配置值不超过65535个字符!";
        vd.alphaDash(this.data["Tag"]).message               = "配置标签格式不正确!";
        vd.minInt(this.data["Sort"], 0).message         = "排序值不能小于0!";
        vd.maxInt(this.data["Sort"], 65535).message     = "排序值不能大于65535!";
        vd.range(this.data["Status"], ["0", "1"]).message = "状态不正确!";

        return vd.validate();
    }
}