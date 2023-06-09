/**
 * 系统全局配置映射文件.
 * json配置文件中没有配置项为全局配置.
 */
export const GLOBAL_DEFAULT_CONFIG = {
  // 服务器地址：本地地址默认127.0.0.1
  web_base_url: "",
  // 是否使用本地数据源.
  local_data_source: false,
  // 是否隐藏提示消息.
  hidden_message: false,
  // 首页布局显示：是否显示侧边栏.
  aside_layout: false,
  // 集成方式: 内部集成=inside（登录页）、外部集成=outside（单点登录）
  integration_mode: "outside",
  // 全局的主题名
  web_global_theme: '',
  // 侧边栏菜单级别：这个主要用来找默认首页菜单用的
  side_levels: 10,
  // 外部单点系统地址
  // single_point: "http://121.36.255.176:18094/SSO/logout?service=http://121.36.255.176:18094/IPRT/portal/index.html",
  single_point: "http://112.46.124.180:18094/SSO/logout?service=http://112.46.124.180:18094/IPRT/portal/index.html",
  // 视窗的宽度
  viewport_width: 1920,
  // 视窗的高度度
  viewport_height: 1080,

  // ** 下面开始都是框架扩展类配置 **
  // 实例化登录(默认是无登录)
  instance_login: "login.no",
  // 实例化response过滤器.
  instance_axios: ["response.code", "response.result"]
}
