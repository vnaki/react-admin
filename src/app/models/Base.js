import Form from "../form";

/**
 * 基础数据层
 */
export default class Base
{
    /**
     * Input object
     */
    elements = {};

    /**
     * form data
     */
    data     = {};

    /**
     * 构造函数
     */
    constructor (e)
    {
        if (e.type === "submit")
        {
            this.data = Form.parseForm(e.currentTarget.elements);
        }
    }

    /**
     * 表单数据验证
     */
    validate ()
    {
        return [];
    }
}