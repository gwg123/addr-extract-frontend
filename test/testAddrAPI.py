import requests
import json

BASE_URL = "http://localhost:8080"

SYSTEM_PROMPT = """你是一个专业的信息抽取助手，专门负责从中文文本中提取收件人的JSON信息。
你必须且只能输出一个合法的 JSON 对象，不要输出任何其他文字、解释或 markdown 格式。
包含的Key有：province（省份）、city（城市名称）、district（区县名称）、specific_location（街道、门牌号、小区、楼栋等详细信息）、name（收件人姓名）、phone（联系电话）。
输出格式示例：
{"province": "山东省", "city": "青岛市", "district": "崂山区", "specific_location": "海尔路1号B座803", "name": "程书韵", "phone": "20089255898"}"""

def extract_address(text: str) -> dict:
    payload = {
        "model": "qwen3-addr-extract",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text}
        ],
        "temperature": 0.1,
        "max_tokens": 256
    }
    
    response = requests.post(
        f"{BASE_URL}/v1/chat/completions",
        headers={"Content-Type": "application/json"},
        json=payload
    )
    response.raise_for_status()
    
    result = response.json()
    content = result["choices"][0]["message"]["content"]
    
    # 解析 JSON
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        print(f"JSON 解析失败，原始输出：{content}")
        raise

# 测试
if __name__ == "__main__":
    test_text = "石家庄市裕华区东岗路88号世茂天玺小区2号楼1203室  联系方式22244914407  收货人冯芷妍"
    result = extract_address(test_text)
    print(json.dumps(result, ensure_ascii=False, indent=2))