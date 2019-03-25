import React from "react";
import Helper from "../helper";

//表单文件上传
export default class File extends React.Component
{
    static defaultProps =
    {
        title: "选择图片",
        name : "", /*表单name*/
        defaultValue : "", /*默认值*/
        id : "upload" + Helper.guid(), /*唯一*/
        size : 1048576, /*图片大小限制,单位B,默认1M*/
        mime : [], /*文件MIME限制*/
        ext : [], /*文件后缀限制*/
        errorTips : "请上传有效的图片",/*错误提示*/
        uploadTips : "上传中...",/*上传提示*/
        url : "",/*上传地址*/
    };

    constructor (props)
    {
        super (props);

        this.state = 
        {
            showUploadTips : false,
            defaultValue   : props.defaultValue
        };
    }

    render()
    {
        return <div className="upload">
            <input type="text" name={this.props.name} className="upload-input upload-item" defaultValue={this.state.defaultValue} readOnly={true}/>
            <button className="btn btn-middle btn-edit upload-item" onClick={this.trigger}> {this.props.title} </button>
            <div className="upload-item uploading">
                {this.state.showUploadTips === true ? <i className="fas fa-spinner-third fa-spin"/> + this.props.uploadTips : ""}
            </div>
            <input type="file" ref={this.props.id} style={{display:"none"}} onChange={this.upload}/>
        </div>
    }

    /*触发上传*/
    trigger = () =>
    {
        this.refs[this.props.id].click();
    };

    /*开始上传*/
    upload = (e) =>
    {
        if (e.currentTarget.files === undefined)
        {
            alert("抱歉，您的浏览器不支持文件上传,推荐使用谷歌浏览器");
            return false;
        }

        let file = e.currentTarget.files[0];

        if (file === undefined)
        {
            return false;
        }

        let ext = file["name"].substring(file["name"].lastIndexOf('.') + 1).toLowerCase();

        if (this.props.ext.length > 0 && -1 === this.props.ext.indexOf(ext))
        {
            alert(this.props.errorTips+"("+ext+"后缀不支持)");
            return false;
        }

        if (this.props.mime.length > 0 && -1 === this.props.mime.indexOf(file["type"]))
        {
            alert(this.props.errorTips+"(文件类型不支持)");
            return false;
        }

        if (this.props.size.length > file["size"])
        {
            alert(this.props.errorTips+"(文件大小不能超过"+(file["size"]/1024)+"KB)");
            return false;
        }

        if (typeof(this.props.url) !== "string" || this.props.url === "")
        {
            alert("文件上传地址错误");
            return false;
        }

        this.handler(file);
    };

    /*上传处理*/
    handler = (file) =>
    {
        this.setState({showUploadTips : true});

        let formData = new FormData();

        formData.append(this.props.name, file);

        alert("上传完成");
    };
}