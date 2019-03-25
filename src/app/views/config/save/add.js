import Save from "./save";
import ConfigModel from "../../../models/Config";

export default class Add extends Save
{
    /**
     * 面包屑
     */
    breadcrumb = [{title:"添加配置"}];

    /**
     * 提交数据
     */
    submit = (e) =>
    {
        e.preventDefault();

        if (true === this.submitLock) return;

        let model = new ConfigModel(e), [ok, message] = model.validate();

        if (false === ok)
        {
            window.Toast(message, {scene:"warn", duration:2});
            return ;
        }

        // bind submit event & insert
        model.create(result =>
        {
            if (1 === result.status)
            {
                this.submitLock = true;
            }

            window.Toast(result.message, {scene:result.status ? "info" : "warn", duration:2});
        });
    };
}