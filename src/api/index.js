import { API_CONFIG, API_ENDPOINTS, SYSTEM_PROMPT } from './config'

/**
 * 构造带鉴权信息的请求头
 * @param {Object} extra - 额外的请求头
 * @returns {Object} 请求头对象
 */
function buildHeaders(extra = {}) {
  const headers = { ...extra }
  if (API_CONFIG.apiKey) {
    headers['Authorization'] = `Bearer ${API_CONFIG.apiKey}`
  }
  return headers
}

/**
 * 从模型返回的文本中解析出 JSON 对象
 * 兼容模型可能输出 ```json ... ``` 包裹或前后夹带说明文字的情况
 * @param {string} content - 模型输出的原始文本
 * @returns {Object} 解析后的地址对象
 */
function parseModelJSON(content) {
  if (typeof content !== 'string') {
    throw new Error('模型返回内容为空')
  }

  // 直接尝试解析
  try {
    return JSON.parse(content.trim())
  } catch (e) {
    // 回退：截取第一个 { 到最后一个 } 之间的内容
    const start = content.indexOf('{')
    const end = content.lastIndexOf('}')
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(content.slice(start, end + 1))
    }
    throw new Error('无法解析模型返回的 JSON')
  }
}

/**
 * 地址提取 API
 * @param {string} text - 包含地址信息的原始文本
 * @returns {Promise<Object>} 提取结果 { province, city, district, specific_location, name, phone }
 */
export async function extractAddress(text) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

  try {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.extract}`, {
      method: 'POST',
      headers: buildHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ],
        temperature: API_CONFIG.defaults.temperature,
        max_tokens: API_CONFIG.defaults.max_tokens
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message = errorData?.error?.message || errorData?.error || `HTTP ${response.status}`
      throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
    }

    const result = await response.json()
    const content = result?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('模型未返回有效结果')
    }

    return parseModelJSON(content)
  } catch (error) {
    clearTimeout(timeoutId)

    if (error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试')
    }

    throw error
  }
}

/**
 * 健康检查 API
 * @returns {Promise<Object>} 健康状态
 */
export async function healthCheck() {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.health}`, {
      method: 'GET',
      headers: buildHeaders(),
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}