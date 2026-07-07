// API 配置
export const API_CONFIG = {
  // 解析服务 API 地址：从环境变量 VITE_API_BASE_URL 读取，未配置时使用默认地址
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8097',

  // 鉴权密钥：从环境变量 VITE_API_KEY 读取，会以 Bearer Token 形式加入请求头
  apiKey: import.meta.env.VITE_API_KEY || '',

  // 请求超时时间（毫秒）
  timeout: 300000,

  // 模型名称
  model: 'qwen3-addr-extract',

  // 默认请求参数
  defaults: {
    temperature: 0.1,
    max_tokens: 256
  }
}

// 信息抽取系统提示词
export const SYSTEM_PROMPT = `你是一个专业的信息抽取助手，专门负责从中文文本中提取收件人的JSON信息。
你必须且只能输出一个合法的 JSON 对象，不要输出任何其他文字、解释或 markdown 格式。
包含的Key有：province（省份）、city（城市名称）、district（区县名称）、specific_location（街道、门牌号、小区、楼栋等详细信息）、name（收件人姓名）、phone（联系电话）。
输出格式示例：
{"province": "山东省", "city": "青岛市", "district": "崂山区", "specific_location": "海尔路1号B座803", "name": "程书韵", "phone": "20089255898"}`

// API 端点
export const API_ENDPOINTS = {
  extract: '/v1/chat/completions',
  health: '/health'
}