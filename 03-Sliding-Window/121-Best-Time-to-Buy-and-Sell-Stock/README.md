# Best Time to Buy and Sell Stock
**LeetCode**: #121 | **Difficulty**: Easy |
**Category**: Sliding Window

## 🔍 Problem Statement
給定一個陣列 `prices`，其中 `prices[i]` 是第 i 天的股票價格。返回你能獲得的最大利潤。如果無法獲利，返回 0。

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: 第 2 天買（價格=1），第 5 天賣（價格=6），利潤 = 6-1 = 5
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: 價格持續下跌，不交易
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：最大利潤 = (最大賣出價 - 最小買入價)，但賣出必須在買入之後
- **問題特徵**：需要同時追蹤兩個值：最低買入價和最大利潤

### 演算法選擇
- **為什麼選一次遍歷？**
  - 暴力法：兩層迴圈比較所有買賣組合，O(n²)
  - **一次遍歷**：記錄到目前為止的最低價和最大利潤，O(n)

- **適用場景**
  - 當需要同時追蹤多個值時
  - 當「最大/最小」問題可以邊遍歷邊更新時
  - 複雜度分析：時間 O(n)，空間 O(1)

### 時機判斷
看到以下特徵時，考慮使用一次遍歷優化：
- 📈 關鍵字：「最大利潤」、「最大差值」、「最佳組合」
- 🎯 限制：某個操作必須在另一個操作之後
- 💡 優化：從 O(n²) 降為 O(n)

## 🎯 實作細節

### 步驟分解
1. **初始化**：min_price = ∞，max_profit = 0
2. **遍歷價格**：對於每一天
3. **更新最低價**：如果當前價格更低，更新 min_price
4. **計算利潤**：計算當前價 - min_price
5. **更新最大利潤**：如果利潤更大，更新 max_profit
6. **返回結果**：max_profit

### 關鍵程式碼片段
```python
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)      # 更新最低買入價
        profit = price - min_price            # 計算當前利潤
        max_profit = max(max_profit, profit)   # 更新最大利潤
    return max_profit
```

**為什麼這樣寫？**
- 每次迭代都考慮「如果在這天賣出」的最佳情況
- `min_price` 保存到目前為止的最佳買入時機
- 不需要追蹤買入的具體日期，只要價格

### 易錯點
⚠️ **坑點1**：假設第一個價格是最低的 - 必須動態更新
⚠️ **坑點2**：負利潤沒有正確處理 - 利潤應取 max(0, profit)
⚠️ **坑點3**：空陣列 - 應返回 0

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 暴力法 | O(n²) | O(1) | 直觀 | 太慢 |
| **一次遍歷** | O(n) | O(1) | **快速且省空間** | 需要理解狀態轉移 |

## 🤔 相關問題
- [Best Time to Buy and Sell Stock II] - 可以多次交易
- [Longest Substring Without Repeating Characters] - 滑動窗口

## 📝 學習筆記
- **初學重點**：理解如何在遍歷中同時追蹤多個變數
- **模式識別**：看到「最大利潤/差值」想到一次遍歷
- **技巧**：`float('inf')` 初始化最小值，避免特殊處理

## 🔑 關鍵模式
**同時追蹤模式**
```python
min_val = float('inf')
max_val = 0
for x in array:
    min_val = min(min_val, x)
    max_val = max(max_val, x - min_val)
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試用雙指標解題
- [ ] 向他人解釋為什麼只需一次遍歷

---
**題目連結**: [LeetCode 121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
