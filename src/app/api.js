let api = {}, host = "http://localhost:8080/backend";

//系统配置
api.config =
{
    rows :   host + "/config",
    create : host + "/config",
    update : host + "/config",
    delete : host + "/config",
    info   : host + "/config"
};

export default api;