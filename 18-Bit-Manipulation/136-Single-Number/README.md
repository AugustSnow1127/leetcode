# Single Number
**LeetCode**: #136 | **Difficulty**: Easy |
**Category**: Bit Manipulation

## 🔍 Problem Statement
給定一個非空整數陣列 `nums`，其中每個元素出現兩次，除了某個元素只出現一次。找出只出現一次的那個元素。

必須實作一個具有線性時間複雜度和使用恆定額外空間的演算法。

**Example 1:**
```
Input: nums = [2,2,1]
Output: 1
```

**Example 2:**
```
Input: nums = [4,1,2,1,2]
Output: 4
```

**Example 3:**
```
Input: nums = [1]
Output: 1
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：利用 XOR 的性質：`a ^ a = 0` 和 `a ^ 0 = a`
- **問題特徵**：其他元素都出現兩次，可以用 XOR 消除

### 演算法選擇
- **為什麼選 Bit Manipulation（XOR）？**
  - Hash Map：O(n) 時間，O(n) 空間
  - **XOR**：O(n) 時間，O(1) 空間，且線性時間

- **適用場景**
  - 當需要消除成對的元素時
  - 當需要恆定空間時
  - 複雜度分析：時間 O(n)，空間 O(1)

### 時機判斷
看到以下特徵時，考慮使用 Bit Manipulation：
- 🔢 關鍵字：「出現兩次」、「恆定空間」、「線性時間」
- 🎯 限制：O(1) 空間複雜度
- ♻️ 模式：成對出現的元素可以通過 XOR 消除

## 🎯 實作細節

### 步驟分解
1. **初始化結果**：`result = 0`
2. **遍歷陣列**：
   - 對每個元素執行 XOR：`result = result ^ num`
3. **返回結果**：`result`

### 關鍵程式碼片段
```python
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

**為什麼這樣寫？**
- XOR 性質 1：`a ^ a = 0`（成對元素互相消除）
- XOR 性質 2：`a ^ 0 = a`（0 是單位元）
- XOR 性質 3：`a ^ b ^ b = a`（交換律和結合律）
- 因此所有成對元素 XOR 後變成 0，剩下的就是單個元素

### 易錯點
⚠️ **坑點1**：用 AND 或 OR - 無法得到正確結果
⚠️ **坑點2**：忘記初始化為 0 - 0 是 XOR 的單位元
⚠️ **坑點3**：用 Hash Map - 雖然正確但不滿足恆定空間要求

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| Hash Map | O(n) | O(n) | 簡單 | 空間不是 O(1) |
| 排序 | O(n log n) | O(1) | 無需額外空間 | 不是線性時間 |
| **XOR** | O(n) | O(1) | **完美滿足要求** | 需要理解 XOR 性質 |

## 🔑 XOR 性質回顧
1. `a ^ a = 0`：任何數與自己 XOR 為 0
2. `a ^ 0 = a`：任何數與 0 XOR 為自己
3. `a ^ b ^ a = b`：可交換和可結合
4. `a ^ b ^ b = a`：成對元素消除

## 🤔 相關問題
- [Single Number II] - 每個元素出現三次
- [Single Number III] - 兩個元素只出現一次

## 📝 學習筆記
- **初學重點**：理解 XOR 的神奇性質
- **模式識別**：看到「出現兩次」+「O(1) 空間」就想到 XOR
- **技巧**：XOR 是位運算，效率極高

## 🔑 關鍵模式
**XOR 消除成對元素**
```python
result = 0
for num in nums:
    result ^= num
return result
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 用紙筆驗證 XOR 的步驟
- [ ] 向他人解釋 XOR 的性質

---
**題目連結**: [LeetCode 136](https://leetcode.com/problems/single-number/)
