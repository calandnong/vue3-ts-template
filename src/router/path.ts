/**
 * 路由地址
 */
export enum RoutePath {
  /**
   * 项目根页面
   */
  ROOT = '',
  /**
   * 用户部分
   */
  // 登录
  USER_LOGIN = 'user_login',
  // 用户快速登录
  USER_QUICK_LOGIN = 'user_quick_login',
  // 用户重置密码
  USER_RESET = 'user_reset',
  // 用户注册
  USER_REGISTER = 'user_register',
  // 用户中心
  USER_CENTER = 'user_center',

  /**
   * 首页
   */
  HOME = 'home',
  /**
   * 广场
   */
  SQUARE = 'square',
  /**
   * 我的
   */
  ME = 'me',
  /**
   * 404
   */
  NOT_FOUND = 'not-found',
  /**
   * 动态列表
   */
  DYNAMIC_LIST = 'dynamic-list',
}
