import React from "react";
import PropTypes from "prop-types";

/*滚动条*/
export default class ScrollBar extends React.Component
{
    static defaultProps =
    {
        minThumb : 30, /*最小Thumb*/
        timeout : 0.2, /*隐藏倒计时*/
        autoHide : true, /*自动隐藏滚动条*/
        showTrack : true, /*是否显示滚动条*/
        ref : "id" + Math.random(), /*随机标识*/
        top : function () {}, /*滚动到顶部*/
        bottom : function () {}, /*滚动到底部*/
    };

    /*属性类型*/
    static propTypes =
    {
        minThumb : PropTypes.number.isRequired,
        timeout : PropTypes.number.isRequired,
        ref : PropTypes.string.isRequired,
        autoHide : PropTypes.bool.isRequired,
        showTrack:PropTypes.bool.isRequired,
        top : PropTypes.func.isRequired,
        bottom : PropTypes.func.isRequired,
    };

    /*待计算高度*/
    thumbHeight;
    /*是否按下鼠标*/
    mouseDown = false;
    /*是否绑定全局事件*/
    globalEvent = false;
    /*滚动容器*/
    container;
    /*滚动条偏移量*/
    clientY     = 0;
    /*初始偏移量*/
    scrollTop   = 0;
    /*原生宽度*/
    diffWidth   = 0;
    /*当前滚动高度*/
    scrollHeight;

    constructor (props)
    {
        super (props);

        this.state =
        {
            thumbStyle : {},
            style : {},
            showTrack : false
        };
    }

    render()
    {
        return <div className="scrollbar" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            {/*滚动容器*/}
            <div className="scrollbar-container" style={this.state.style} ref={this.props.ref} onScroll={this.handleScroll}>
                {this.props.children}
            </div>

            {this.track()}
        </div>
    }

    /**
     * 滚动条轨道
     */
    track = () =>
    {
        if (true === this.props.showTrack)
        {
            return <div className={"scrollbar-track" + (this.state.showTrack ?  " fadeIn" : " fadeOut")}>
                <div className="scrollbar-thumb" style={this.state.thumbStyle} onMouseDown={this.handleTrackMouseDown}/>
            </div>
        }

        return "";
    };

    /*加载完成*/
    componentDidMount()
    {
        /*容器对象*/
        this.container = this.refs[this.props.ref];
        /*计算高度*/
        this.scrollHeight = this.container.scrollHeight;
        /*计算滚动属性*/
        this.resetStyle();
    }

    /*更新完成*/
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /*有数据加入则重新计算属性*/
        if (this.scrollHeight !== this.container.scrollHeight)
        {
            this.scrollHeight = this.container.scrollHeight;
            this.resetStyle();
        }
    }

    /*计算滚动属性, 在滑动结束时触发*/
    resetStyle ()
    {
        /*计算高度*/
        this.thumbHeight = ( 1 - (this.container.scrollHeight - this.container.offsetHeight) / this.container.scrollHeight ) * this.container.offsetHeight;
        /*最小处理*/
        if (this.thumbHeight < this.props.minThumb) this.thumbHeight = this.props.minThumb;
        /*宽度差值*/
        if (this.diffWidth === 0) this.diffWidth = this.container.offsetWidth - this.container.clientWidth;

        let style = { thumbStyle: {height:this.thumbHeight} };

        /*计算额外的宽度*/
        if (this.diffWidth && this.container.offsetWidth - this.container.clientWidth === this.diffWidth) style.style = {width: this.container.offsetWidth - this.container.clientWidth + this.container.offsetWidth};

        /*重新设置样式*/
        this.setState(style);
    }

    /*处理滚动*/
    handleScroll = (e) =>
    {
        this.setState({thumbStyle : {
            height : this.thumbHeight,
            top : e.currentTarget.scrollTop / (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight) * (e.currentTarget.offsetHeight - this.thumbHeight)
        }});

        /*滚动到顶部*/
        if (e.currentTarget.scrollTop === 0) this.handleToTop(e);
        /*滚动到底部*/
        if (e.currentTarget.scrollTop + e.currentTarget.offsetHeight === e.currentTarget.scrollHeight) this.handleToBottom(e);
    };

    /*滚动到顶部处理*/
    handleToTop = (e) =>
    {
        this.props.top();
    };

    /*滚动到底部处理*/
    handleToBottom = (e) =>
    {
        /*其他处理*/
        this.props.bottom();
    };

    /*处理滚动条拖拽*/
    handleTrackMouseDown = (e) =>
    {
        if (false === this.props.showTrack) return ;

        this.mouseDown = true;
        this.clientY   = e.clientY;
        this.scrollTop = this.container.scrollTop;

        if (!this.globalEvent)
        {
            window.addEventListener("mousemove", this.handleTrackMouseMove);
            window.addEventListener("mouseup", this.handleTrackMouseUp);
        }
    };

    /*处理滚动条拖拽*/
    handleTrackMouseUp = (e) =>
    {
        /*鼠标松开*/
        this.mouseDown = false;
        /*鼠标离开隐藏滚动条*/
        this.hideScrollBar(e);
    };

    /*处理滚动条拖拽*/
    handleTrackMouseMove = (e) =>
    {
        if (!this.mouseDown) return false;

        this.container.scrollTop = this.scrollTop + (e.clientY - this.clientY) / ((this.container.offsetHeight - this.thumbHeight) / (this.container.scrollHeight - this.container.offsetHeight));
    };

    /*鼠标划上显示*/
    handleMouseEnter = (e) =>
    {
        if (true === this.props.showTrack && this.container.scrollHeight > this.container.offsetHeight) this.setState({showTrack:true});
    };

    /*鼠标离开隐藏滚动条*/
    handleMouseLeave = (e) =>
    {
        this.hideScrollBar(e);
    };

    /*判断鼠标是否在区域内*/
    isMouseOver = (e) =>
    {
        return e.clientX < this.container.offsetLeft || this.container.offsetLeft + this.container.offsetWidth < e.clientX || e.clientY < this.container.offsetTop || this.container.offsetTop + this.container.offsetHeight < e.clientY;
    };

    /*隐藏滚动条*/
    hideScrollBar = (e) =>
    {
        if (this.container.scrollHeight > this.container.offsetHeight && this.props.autoHide && this.props.timeout)
        {
            /*鼠标离开*/
            if ( ("mouseleave" === e.type && !this.mouseDown) || ("mouseup" === e.type && this.isMouseOver(e)) )
            {
                let timeout = window.setTimeout(() =>
                {
                    this.setState({showTrack:false});
                    window.clearTimeout(timeout);
                }, 1000 * this.props.timeout);
            }
        }
    };
}