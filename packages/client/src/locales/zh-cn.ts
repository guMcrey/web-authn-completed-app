export default {
  nav: {
    product: '项目',
    example: '示例',
    github: 'Github',
    userGuide: '用户引导',
  },
  product: {
    title: 'WebAuthn Completed App',
    subtitle1: '一个基于',
    subtitle2:
      '实现的完整应用程序。这是一种完全不需要密码的新登录方式，它允许网站使用内置的验证器(如 Apple TouchID 和 Windows Hello) 或移动设备生物识别传感器来验证用户身份, 不再担心忘记密码或密码被盗引发的一切问题, 可以为用户提供更安全便捷的登录体验。',
    tryDemo: '尝试 Demo',
    viewGithub: '查看 Github',
    and: '和',
    users: '用户已经体验',
    workBestTitle: '能够很好的运行于',
  },
  login: {
    signIn: '登录',
    signInWithPasskey: '使用密钥登录',
    or: '或',
    username: '用户名',
    usernamePlaceholder: '请输入你的用户名',
    usernameRequired: '用户名不能为空',
    usernameValidate: '请输入 4-8 位以字母开头, 由字母、数字、下划线组成',
    password: '密码',
    passwordPlaceholder: '请输入你的密码',
    passwordRequired: '密码不能为空',
    passwordValidate: '请输入 6-10 位以字母开头, 由字母、数字、下划线组成',
    tips: '对于新用户, 将自动为您注册账号',
    usernamePrompt:
      '请输入已添加 WebAuthn 设备的用户名。若没有，请先使用用户名和密码登录',
    noPasskey: '未找到密钥',
    noPassKeyDescription:
      '您还没有密钥。请先使用用户名和密码登录，添加 WebAuthn 设备后重试。',
  },
  home: {
    hello: '你好',
    cardTitle: '无密码认证',
    cardSubtitle: '遵循',
    cardSubtitle2: '标准为无密码身份验证设置您的账号',
    deviceTitle: '为您的账号配置了以下设备',
    addDeviceBtn: '添加 WebAuthn 设备',
    noData: '未配置任何设备',
    logout: '登出',
    noSupport: '当前设备或浏览器不支持 WebAuthn 用户验证平台',
    noAdd: ', 您暂时无法添加 WebAuthn 设备',
  },
  message: {
    loginSuccess: '登录成功',
    deleteSuccess: '删除成功',
    passkeyNotAvailableTitle: '密钥不可用',
    passkeyNotAvailableSubtitle:
      '请使用用户名和密码登录后, 重新添加 WebAuthn 设备',
    passkeyNotAvailableNoCatch:
      '( 由于清除了缓存，密钥相关的重要数据已不存在 )',
    noPublicKey: '未匹配到可用的公钥',
    noPublicKeyDescription:
      '找不到与该账号关联的公钥, 无法使用密钥验证登录。请使用用户名和密码登录后, 添加 WebAuthn 设备后重试。',
    confirmData: '好的',
    logoutConfirm: '确认登出吗?',
    tips: '提示',
    confirmBtn: '确认',
    cancelBtn: '取消',
    deleteDescription:
      '从服务器中删除公钥后, 您将无法使用此密钥登录。是否要继续？',
  },
}
