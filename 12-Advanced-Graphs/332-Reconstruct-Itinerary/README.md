# Reconstruct Itinerary
**LeetCode**: #332 | **Difficulty**: Medium |
**Category**: Advanced Graphs

## 🔍 Problem Statement
給定一個機票列表 `tickets`，其中 `tickets[i] = [from_i, to_i]`，表示一張從 `from_i` 到 `to_i` 的機票。

請構建一個行程單，使用所有機票。如果有多個有效的行程單，返回字典序最小的。

行程單是按順序排列的機票目的地列表。

**Example 1:**
```
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
```

**Example 2:**
```
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：這是一個有向圖，需要找到一條使用所有邊的歐拉路徑（Eulerian Path）
- **問題特徵**：需要訪問每條邊一次，返回路徑

### 演算法選擇
- **為什麼選 Hierholzer's Algorithm（DFS + 小頂堆）？**
  - 貪心法：選字典序最小，但可能卡住
  - **Hierholzer's**：用 DFS 構建歐拉路徑，堆確保最小字典序

- **適用場景**
  - 當需要訪問所有邊時
  - 當需要歐拉路徑或迴路時
  - 複雜度分析：時間 O(E log E)，空間 O(V + E)

### 時機判斷
看到以下特徵時，考慮使用 Hierholzer's Algorithm：
- 🗺️ 關鍵字：「重建」、「所有路徑」、「歐拉路徑」
- 📊 結構：有向圖，每條邊都要使用
- 🎯 需求：字典序最小或其他排序要求

## 🎯 實作細節

### 步驟分解

1. **構建鄰接表**：
   - 對於每個起點，用小頂堆存儲目的地
   - 確保每次取字典序最小的

2. **DFS 構建路徑**：
   - 從 "JFK" 開始
   - 對於當前節點，從堆中取出最小目的地
   - 遞迴處理該目的地
   - 當堆為空時，將節點加入結果

3. **反轉結果**：
   - DFS 結果是反向的，需要反轉

### 關鍵程式碼片段
```python
import heapq
from collections import defaultdict

def findItinerary(tickets):
    # 構建鄰接表（用堆自動排序）
    graph = defaultdict(list)
    for frm, to in tickets:
        heapq.heappush(graph[frm], to)

    result = []

    def dfs(node):
        # 訪問所有鄰居
        while graph[node]:
            next_node = heapq.heappop(graph[node])
            dfs(next_node)
        result.append(node)

    dfs("JFK")
    return result[::-1]  # 反轉
```

**為什麼這樣寫？**
- 小頂堆確保每次取字典序最小的目的地
- DFS 後加入節點，結果是反向的
- 反轉後得到正確的行程順序

### 易錯點
⚠️ **坑點1**：忘記反轉結果 - 行程順序錯誤
⚠️ **坑點2**：用普通列表代替堆 - 無法保證字典序最小
⚠️ **坑點3**：DFS 前加入節點 - 會先加入子節點再父節點

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 回溯法 | O(E!) | O(E) | 概念簡單 | 太慢 |
| **Hierholzer's** | O(E log E) | O(V + E) | **高效** | 需要理解歐拉路徑 |

## 🤔 相關問題
- [Course Schedule II] - 拓樸排序
- [Alien Dictionary] - 圖構建

## 📝 學習筆記
- **初學重點**：理解歐拉路徑的概念
- **模式識別**：看到「重建路徑」「使用所有邊」就想到歐拉路徑
- **技巧**：用堆自動維護字典序，簡化代碼

## 🔑 關鍵模式
**Hierholzer's Algorithm**
```python
def dfs(node):
    while graph[node]:
        next_node = pop_smallest(graph[node])
        dfs(next_node)
    result.append(node)
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 研究歐拉路徑的理論
- [ ] 向他人解釋為什麼需要堆

---
**題目連結**: [LeetCode 332](https://leetcode.com/problems/reconstruct-itinerary/)
