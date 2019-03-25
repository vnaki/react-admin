import React from "react";
import "./style.css";

export default class Toast extends React.Component
{
    /**
     * 消息队列, [{message:"", scene:"", duration:0, trigger:()=>{}}, ...]
     */
    queue  = [];

    /**
     * 消息唯一性
     */
    unique = [];

    /**
     * 当前消息对象
     */
    current = null;

    /**
     * 默认属性
     */
    static defaultProps =
    {
        /**
         * 默认场景, normal/info/warn/notice
         */
        scene   : "normal",

        /**
         * 默认显示信息
         */
        message : "Toast message",

        /**
         * 默认显示时长,单位秒,0:一直显示
         */
        duration : 0,
    };

    constructor (props)
    {
        super(props);

        this.state = {
            status  : "stop", // stop/running
        };
    }

    componentDidMount()
    {
        window.Toast = this.show;
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (this.state.status === "running")
        {
            if (this.current.duration > 0)
            {
                let t1 = setTimeout(() =>
                {
                    if (null !== this.current && typeof this.current.trigger === "function")
                    {
                        this.current.trigger();
                    }

                    window.clearTimeout(t1);

                    this.close();

                    if (this.size() > 0)
                    {
                        let t2 = setTimeout(() => {
                            this.fire();
                            window.clearTimeout(t2);
                        }, 500);
                    }
                }, this.current.duration * 1000);
            }
        }
        else if (this.state.status === "stop")
        {
            this.current = null;
        }
    }

    render()
    {
        let scene = "", message = "";

        if (null !== this.current) {
            scene   = this.current.scene;
            message = this.current.message;
        }

        return <div className={"message-toast" + (this.state.status === "running" ? " show" : "")}>
            <div className={"message-toast-wrapper " + scene}>
                <i className="fas fa-info-circle"/> {message}
            </div>
        </div>
    }

    /**
     * 添加消息到队列
     */
    push = (message, params) =>
    {
        if (-1 < this.unique.indexOf(message)) {
            return ;
        }

        let item = {
            scene    : this.props.scene,
            trigger  : null,
            message  : message,
            duration : this.props.duration,
        };

        // 记录消息不重复
        this.unique.push(message);

        if (params !== undefined) {
            if (-1 < ["normal", "info", "warn", "notice"].indexOf(params.scene)) {
                item.scene = params.scene;
            }

            if (typeof params.duration === "number") {
                item.duration = parseFloat(params.duration);
            }

            if (typeof params.trigger === "function") {
                item.trigger = params.trigger;
            }
        }

        this.queue.push(item);
    };

    /**
     * 消息队列长度
     */
    size = () =>
    {
        return this.queue.length
    };

    fire = () =>
    {
        if ("stop" === this.state.status && this.size() > 0)
        {
            this.current = this.queue.shift();

            let pos = this.unique.indexOf(this.current.message);

            if (pos > -1) {
                this.unique.splice(pos, 1)
            }

            this.setState({status:"running"});
        }
    };

    /**
     * 消息显示
     */
    show = (message, params) =>
    {
        if (message === null)
        {
            this.flush();
        }
        else
        {
            this.push(message, params);
            this.fire()
        }
    };

    close = () =>
    {
        if (this.state.status === "running") {
            this.setState({status:"stop"});
        }
    };

    flush = () =>
    {
        let timeout = setTimeout(() => {
            this.queue = [];
            this.close();
            window.clearTimeout(timeout);
        }, 500);
    };
}