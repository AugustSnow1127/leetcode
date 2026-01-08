# Insert Interval
**LeetCode**: #57 | **Difficulty**: Medium |
**Category**: Intervals

## 🔍 Problem Statement
給定一組**無重疊且按起始端點排序**的區間 `intervals`，以及一個要插入的新區間 `newInterval`。

插入 `newInterval` 並確保區間仍然**有序且無重疊**。如果需要，合併區間。

**Example 1:**
```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

**Example 2:**
```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: 因為新區間 [4,8] 與 [3,5],[6,7],[8,10] 重疊，所以合併成 [3,10]
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：區間可以分為三類：在 newInterval 左邊、重疊、在右邊
- **問題特徵**：已排序且無重疊，可以順序處理

### 演算法選擇
- **為什麼選一次遍歷？**
  - 排序法：插入後再排序，O(n log n)
  - **一次遍歷**：O(n)，利用已有的排序特性

- **適用場景**
  - 當區間已排序時
  - 當需要插入並合併區間時
  - 複雜度分析：時間 O(n)，空間 O(n)（結果）

### 時機判斷
看到以下特徵時，考慮使用一次遍歷：
- 📊 關鍵字：「插入區間」、「合併」、「排序」
- 🎯 條件：區間已排序
- ⚡ 優化：避免不必要的重新排序

## 🎯 實作細節

### 步驟分解
1. **分類處理區間**：
   - 在 newInterval 左邊：完全無重疊，結束 < newInterval 開始
   - 與 newInterval 重疊：需要合併
   - 在 newInterval 右邊：完全無重疊，開始 > newInterval 結束
2. **初始化結果列表**
3. **遍歷所有區間**：
   - 將左邊的區間直接加入結果
   - 遇到重疊時，更新 newInterval 的範圍
   - 將右邊的區間直接加入結果
4. **加入合併後的 newInterval**

### 關鍵程式碼片段
```python
def insert(intervals, newInterval):
    result = []
    i = 0
    n = len(intervals)

    # 加入所有在 newInterval 左邊的區間
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # 合併所有重疊的區間
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)

    # 加入所有在 newInterval 右邊的區間
    while i < n:
        result.append(intervals[i])
        i += 1

    return result
```

**為什麼這樣寫？**
- 三個 while 循環分別處理三種情況
- 合併時不斷擴展 newInterval 的範圍
- 利用已排序的特性，不需要重新排序

### 易錯點
⚠️ **坑點1**：忘記處理空列表
⚠️ **坑點2**：合併邏輯錯誤 - 需要同時更新開始和結束
⚠️ **坑點3**：忘記加入 newInterval 到結果

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 插入後排序 | O(n log n) | O(n) | 簡單 | 慢 |
| **一次遍歷** | O(n) | O(n) | **快速** | 需要分類邏輯 |

## 🤔 相關問題
- [Merge Intervals] - 合併所有重疊區間
- [Non-overlapping Intervals] - 移除最少區間以消除重疊

## 📝 學習筆記
- **初學重點**：理解區間合併的邏輯
- **模式識別**：看到「插入區間」+「已排序」就想到一次遍歷
- **技巧**：分類處理（左邊、重疊、右邊）是清晰的方法

## 🔑 關鍵模式
**區間插入模板**
```python
result = []
# 處理左邊區間
while 區間.結束 < newInterval.開始:
    result.append(區間)
# 處理重疊區間
while 區間.開始 <= newInterval.結束:
    合併
result.append(合併後的區間)
# 處理右邊區間
while 還有區間:
    result.append(區間)
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試用其他語言實作
- [ ] 向他人解釋三種分類情況

---
**題目連結**: [LeetCode 57](https://leetcode.com/problems/insert-interval/)
