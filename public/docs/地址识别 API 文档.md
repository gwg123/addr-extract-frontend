

## 地址识别接口文档（API Documentation）

```markdown
# 地址提取 API 文档

> **版本**: 1.0.0  
> **基础地址**: `https://xxxx.ngrok-free.app`（ngrok 动态地址，实际使用时替换）  
> **协议**: HTTPS  
> **数据格式**: JSON

---

## 1. 概述

基于微调 Qwen3 模型的智能地址信息提取服务，支持从非结构化文本中提取收件人姓名、电话、省市区及详细地址等结构化信息。

---

## 2. 接口列表

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 服务信息 | GET | `/` | 获取 API 基本信息 |
| 健康检查 | GET | `/health` | 检查服务及模型推理状态 |
| 地址提取 | POST | `/extract` | 从文本中提取地址信息 |

---

## 3. 接口详情

### 3.1 健康检查

**请求**
```http
GET /health
```

**成功响应** (200 OK)

```json
{
  "status": "ok",
  "llama_server": "connected",
  "version": "1.0.0",
  "timestamp": "2026-06-09 13:18:00"
}
```

**异常响应** (200 OK，但 llama_server 为 disconnected)

```json
{
  "status": "ok",
  "llama_server": "disconnected",
  "version": "1.0.0",
  "timestamp": "2026-06-09 13:18:00"
}
```

> 注：API 服务本身正常，但底层 llama.cpp 模型推理服务未连接，需检查模型服务是否启动。

---

### 3.2 地址提取

**请求**

```http
POST /extract
Content-Type: application/json
```

**请求参数**

| 字段          | 类型      | 必填  | 默认值 | 约束        | 说明           |
| ----------- | ------- | --- | --- | --------- | ------------ |
| text        | string  | 是   | -   | 1-2000 字符 | 包含地址信息的原始文本  |
| temperature | float   | 否   | 0.1 | 0.0 - 1.0 | 生成温度，越低输出越确定 |
| max_tokens  | integer | 否   | 256 | 1 - 1024  | 最大输出 token 数 |

**请求示例**

```json
{
  "text": "丽江市古城区南屏街88号宏达小区2栋  收件人：和映蓉  电话号码：23690273589",
  "temperature": 0.1,
  "max_tokens": 256
}
```

**成功响应** (200 OK)

```json
{
  "success": true,
  "data": {
    "province": "云南省",
    "city": "丽江市",
    "district": "古城区",
    "specific_location": "南屏街88号宏达小区2栋",
    "name": "和映蓉",
    "phone": "23690273589"
  },
  "raw_output": "{\"province\": \"云南省\", \"city\": \"丽江市\", ...}",
  "error": null,
  "processing_time": 1.234
}
```

**字段说明**

| 字段              | 类型      | 说明                                                               |
| --------------- | ------- | ---------------------------------------------------------------- |
| success         | boolean | 是否成功提取                                                           |
| data            | object  | 提取结果，包含 province, city, district, specific_location, name, phone |
| raw_output      | string  | 模型原始输出（用于调试）                                                     |
| error           | string  | 错误信息，成功时为 null                                                   |
| processing_time | float   | 处理耗时（秒）                                                          |

---

**错误响应**

### 400 Bad Request - 请求格式错误

```json
{
  "success": false,
  "error": "请求参数格式错误",
  "error_type": "validation_error",
  "detail": "具体错误信息"
}
```

### 422 Unprocessable Entity - 参数验证失败

```json
{
  "success": false,
  "error": "请求参数格式错误",
  "error_type": "validation_error",
  "detail": "1 validation error for ExtractRequest\ntext: field required"
}
```

### 502 Bad Gateway - 模型推理服务异常

```json
{
  "success": false,
  "error": "模型推理服务异常",
  "error_type": "http_error",
  "detail": "模型推理服务返回格式异常"
}
```

### 503 Service Unavailable - 模型推理服务未连接

```json
{
  "success": false,
  "error": "模型推理服务未启动或连接失败，请检查 llama-server 是否运行",
  "error_type": "http_error",
  "detail": "HTTP 503"
}
```

### 504 Gateway Timeout - 模型推理超时

```json
{
  "success": false,
  "error": "模型推理超时，请稍后重试或减小输入文本长度",
  "error_type": "http_error",
  "detail": "HTTP 504"
}
```

### 500 Internal Server Error - 服务器内部错误

```json
{
  "success": false,
  "error": "服务器内部错误",
  "error_type": "internal_error",
  "detail": "请联系管理员"
}
```

---

## 4. 状态码汇总

| 状态码 | 场景        | 说明                       |
| --- | --------- | ------------------------ |
| 200 | 成功        | 请求处理完成，注意检查 `success` 字段 |
| 400 | 请求格式错误    | JSON 解析失败等               |
| 422 | 参数验证失败    | 缺少必填字段、类型错误、超出范围等        |
| 500 | 服务器内部错误   | 未预期的异常                   |
| 502 | 模型推理服务异常  | llama.cpp 返回错误响应或格式异常    |
| 503 | 模型推理服务未连接 | llama.cpp 未启动或网络不通       |
| 504 | 模型推理超时    | 请求处理超过 60 秒              |

---

## 5. 前端接入示例

### JavaScript / Fetch

```javascript
const API_BASE = "https://xxxx.ngrok-free.app";

async function extractAddress(text) {
  const response = await fetch(`${API_BASE}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: text,
      temperature: 0.1,
      max_tokens: 256
    })
  });

  if (!response.ok) {
    // 处理 HTTP 错误状态码
    const error = await response.json();
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    // 处理业务逻辑错误
    throw new Error(result.error || "提取失败");
  }

  return result.data;  // { province, city, district, specific_location, name, phone }
}

// 使用示例
extractAddress("青岛市崂山区海尔路1号B座803|接收者程书韵|联系电话20089255898")
  .then(data => {
    console.log("提取结果:", data);
    // 填充表单
    document.getElementById('name').value = data.name;
    document.getElementById('phone').value = data.phone;
    document.getElementById('province').value = data.province;
    document.getElementById('city').value = data.city;
    document.getElementById('district').value = data.district;
    document.getElementById('address').value = data.specific_location;
  })
  .catch(err => {
    console.error("提取失败:", err.message);
    alert("地址识别失败，请手动填写");
  });
```

### 错误处理建议

```javascript
async function extractAddressWithRetry(text, maxRetries = 2) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await extractAddress(text);
    } catch (err) {
      if (i === maxRetries) throw err;
      // 502/503/504 时重试
      if (err.message.includes("模型推理")) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        continue;
      }
      throw err;
    }
  }
}
```

---



---

## 7. 部署架构

```
┌─────────────────┐     HTTPS      ┌─────────────────┐     HTTP      ┌─────────────────┐
│   Cloudflare    │ ─────────────→ │    ngrok        │ ────────────→ │  API Server     │
│  (前端静态页面)  │                │  (内网穿透)      │               │  (localhost:3000)│
└─────────────────┘                └─────────────────┘               └─────────────────┘
                                                                           ↓
                                                                    ┌─────────────────┐
                                                                    │  llama.cpp      │
                                                                    │  (localhost:8080)│
                                                                    │  + qwen3模型     │
                                                                    └─────────────────┘
```

---

## 8. 更新日志

| 版本    | 日期         | 变更            |
| ----- | ---------- | ------------- |
| 1.0.0 | 2026-06-09 | 初始版本，支持基础地址提取 |

---

**文档维护**: daluYoo  
**联系方式**: 如有问题请联系后端服务维护者

---


