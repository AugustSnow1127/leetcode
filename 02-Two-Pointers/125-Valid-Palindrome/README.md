# Valid Palindrome
**LeetCode**: #125 | **Difficulty**: Easy |
**Category**: Two Pointers

## 🔍 Problem Statement
給定一個字串 `s`，判斷它是否是迴文。只考慮字母和數字，忽略大小寫。

**Example 1:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" 是迴文
```

**Example 2:**
```
Input: s = "race a car"
Output: false
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：迴文從頭讀和從尾讀是一樣的，可以用兩個指標從兩端向中間比較
- **問題特徵**：需要過濾非字母數字字元，並忽略大小寫

### 演算法選擇
- **為什麼選 Two Pointers？**
  - 暴力法：比較所有可能的子字串，太慢
  - 反轉字串：需要 O(n) 額外空間
  - **Two Pointers**：一次遍歷 O(n)，空間 O(1)

- **適用場景**
  - 當需要從兩端向中間處理時
  - 當需要就地操作，不使用額外空間時
  - 複雜度分析：時間 O(n)，空間 O(1)

### 時機判斷
看到以下特徵時，考慮使用 Two Pointers：
- 🔄 關鍵字：「從兩端」、「從頭尾」、「迴文」
- 📊 結構：有序或可從兩端訪問的資料結構
- ⚡ 優化：減少嵌套迴圈從 O(n²) 到 O(n)

## 🎯 實作細節

### 步驟分解
1. **初始化指標**：left = 0（頭），right = len(s) - 1（尾）
2. **向中間移動**：while left < right
3. **跳過無效字元**：如果不是字母數字，移動指標
4. **比較字元**：轉小寫後比較，不相等返回 false
5. **返回結果**：循環結束返回 true

### 關鍵程式碼片段
```python
def isPalindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        # 跳過非字母數字
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        # 比較（忽略大小寫）
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
```

**為什麼這樣寫？**
- 同時從兩端向中間，一次比較一對字元
- `isalnum()` 和 `lower()` 是 Python 內建方法，效率高
- 邊界檢查 `left < right` 防止越界

### 易錯點
⚠️ **坑點1**：忘記處理空字串或只有特殊字元 - 應返回 true
⚠️ **坑點2**：忘記大小寫轉換 - "A" 和 "a" 應視為相同
⚠️ **坑點3**：指標越界 - 移動指標前要檢查 left < right

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 反轉字串 | O(n) | O(n) | 簡單直觀 | 需要額外空間 |
| **Two Pointers** | O(n) | O(1) | **節省空間** | 需要處理邊界 |

## 🤔 相關問題
- [Valid Palindrome II] - 允許刪除一個字元
- [Two Sum II - Input Array Is Sorted] - 經典 Two Pointers

## 📝 學習筆記
- **初學重點**：理解 Two Pointers 如何減少空間複雜度
- **模式識別**：看到「兩端對比」就想到 Two Pointers
- **技巧**：`isalnum()` 判斷字母數字，`lower()` 統一大小寫

## 🔑 關鍵模式
**Two Pointers 基本模式**
```python
left, right = 0, len(arr) - 1
while left < right:
    # 處理左指標
    # 處理右指標
    # 比較或合併
    left += 1
    right -= 1
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試用其他方法解題（反轉字串法）
- [ ] 向他人解釋這題

---
**題目連結**: [LeetCode 125](https://leetcode.com/problems/valid-palindrome/)
