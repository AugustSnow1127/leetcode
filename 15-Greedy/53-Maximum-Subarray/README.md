# Maximum Subarray
**LeetCode**: #53 | **Difficulty**: Medium |
**Category**: Greedy

## 🔍 Problem Statement
給定一整數陣列 `nums`，找到具有最大和的連續子陣列（至少包含一個數）並返回其和。

**Example 1:**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: 連續子陣列 [4,-1,2,1] 的和最大，為 6。
```

**Example 2:**
```
Input: nums = [1]
Output: 1
```

**Example 3:**
```
Input: nums = [5,4,-1,7,8]
Output: 23
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：對於每個位置，最大子陣列和 = 要麼是當前元素開始的新子陣列，要麼是繼續之前的子陣列
- **問題特徵**：可以局部最優（局部最大子陣列和）推導全局最優

### 演算法選擇
- **為什麼選 Kadane's Algorithm（貪心）？**
  - 暴力法：枚舉所有子陣列，O(n²)
  - **Kadane's**：一次遍歷，O(n)

- **適用場景**
  - 當需要找連續子陣列的最大/最小值時
  - 當問題有最優子結構時
  - 複雜度分析：時間 O(n)，空間 O(1)

### 時機判斷
看到以下特徵時，考慮使用 Greedy/Kadane's：
- 📊 關鍵字：「最大子陣列」、「連續」、「最大和」
- 🎯 需求：連續區間的最大/最小值
- ♻️ 模式：可以用局部最優推導全局最優

## 🎯 實作細節

### 步驟分解
1. **初始化**：
   - `max_sum` = nums[0]（全局最大）
   - `current_sum` = nums[0]（當前最大子陣列和）
2. **遍歷陣列**（從索引 1 開始）：
   - 決定：是繼續之前的子陣列，還是從當前元素開始？
   - `current_sum = max(nums[i], current_sum + nums[i])`
   - 更新全局最大：`max_sum = max(max_sum, current_sum)`
3. **返回結果**：`max_sum`

### 關鍵程式碼片段
```python
def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        # 決定：繼續之前的子陣列還是從當前開始？
        current_sum = max(nums[i], current_sum + nums[i])
        # 更新全局最大
        max_sum = max(max_sum, current_sum)

    return max_sum
```

**為什麼這樣寫？**
- `max(nums[i], current_sum + nums[i])` 是核心：貪心地選擇局部最優
- 如果之前的和是負數，直接從當前元素開始新的子陣列
- 同時追蹤當前最大和全局最大

### 易錯點
⚠️ **坑點1**：從 0 開始迭代 - 應從 1 開始，初始化時已處理 nums[0]
⚠️ **坑點2**：忘記更新全局最大 - 會漏掉中間的最大值
⚠️ **坑點3**：空陣列 - 題目保證至少一個元素

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 暴力法 | O(n²) | O(1) | 簡單 | 太慢 |
| DP | O(n) | O(n) | 清晰 | 節省空間 |
| **Kadane's** | O(n) | O(1) | **最高效** | 需要理解貪心 |

## 🤔 相關問題
- [Best Time to Buy and Sell Stock] - 類似的 DP 模式
- [Maximum Product Subarray] - 乘積版本

## 📝 學習筆記
- **初學重點**：理解「局部最優推導全局最優」的貪心思想
- **模式識別**：看到「最大連續子陣列」就想到 Kadane's Algorithm
- **技巧**：同時追蹤當前和全局最大是常見模式

## 🔑 關鍵模式
**Kadane's Algorithm 模板**
```python
max_sum = current_sum = nums[0]
for i in range(1, len(nums)):
    current_sum = max(nums[i], current_sum + nums[i])
    max_sum = max(max_sum, current_sum)
return max_sum
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試找最大子陣列的起止位置
- [ ] 向他人解釋為什麼是貪心算法

---
**題目連結**: [LeetCode 53](https://leetcode.com/problems/maximum-subarray/)
