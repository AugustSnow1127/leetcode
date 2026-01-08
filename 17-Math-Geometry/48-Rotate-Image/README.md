# Rotate Image
**LeetCode**: #48 | **Difficulty**: Medium |
**Category**: Math & Geometry

## 🔍 Problem Statement
給定一個 `n x n` 的二維矩陣 `matrix` 表示一張圖像，請將圖像順時針旋轉 90 度。

你必須**就地**旋轉圖像，這意味著你需要直接修改輸入的二維矩陣。請不要使用另一個矩陣來旋轉圖像。

**Example 1:**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

**Example 2:**
```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：旋轉 90 度可以先轉置（transpose）再水平翻轉（reverse each row）
- **問題特徵**：就地操作，需要交換元素

### 演算法選擇
- **為什麼選轉置 + 水平翻轉？**
  - 直接旋轉：需要複雜的索引計算
  - **轉置 + 翻轉**：兩步操作，直觀易懂

- **適用場景**
  - 當需要旋轉矩陣時
  - 當需要就地操作時
  - 複雜度分析：時間 O(n²)，空間 O(1)

### 時機判斷
看到以下特徵時，考慮使用轉置 + 翻轉：
- 📐 關鍵字：「旋轉 90 度」、「矩陣變換」
- 🔄 限制：就地操作（不能用額外矩陣）
- 📊 結構：方陣（n x n）

## 🎯 實作細節

### 步驟分解
1. **轉置矩陣**：
   - 交換 `matrix[i][j]` 和 `matrix[j][i]`
   - 注意：只需處理對角線上方的一半
2. **水平翻轉每行**：
   - 反轉每個元素順序
   - 交換 `matrix[i][j]` 和 `matrix[i][n-1-j]`
   - 注意：只需處理前半部分

### 關鍵程式碼片段
```python
def rotate(matrix):
    n = len(matrix)

    # 轉置（對角線翻轉）
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # 水平翻轉（每行反轉）
    for i in range(n):
        for j in range(n // 2):
            matrix[i][j], matrix[i][n-1-j] = matrix[i][n-1-j], matrix[i][j]
```

**為什麼這樣寫？**
- 轉置：`range(i, n)` 避免重複交換對角線元素
- 翻轉：`range(n // 2)` 只交換前半部分和後半部分
- 兩步操作就完成 90 度旋轉

### 易錯點
⚠️ **坑點1**：轉置時用 `range(n)` - 會重複交換
⚠️ **坑點2**：翻轉時用 `range(n)` - 會把已翻轉的又翻轉回去
⚠️ **坑點3**：忘記就地操作 - 用了額外矩陣

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 新矩陣 | O(n²) | O(n²) | 簡單 | 不符合就地要求 |
| **轉置 + 翻轉** | O(n²) | O(1) | **滿足就地要求** | 需要理解矩陣操作 |

## 🤔 相關問題
- [Spiral Matrix] - 順時針遍歷
- [Set Matrix Zeroes] - 就地矩陣操作

## 📝 學習筆記
- **初學重點**：理解矩陣轉置和翻轉的操作
- **模式識別**：看到「旋轉 90 度」就想到轉置 + 翻轉
- **技巧**：轉置交換 `matrix[i][j]` 和 `matrix[j][i]`

## 🔑 關鍵模式
**轉置 + 翻轉旋轉模板**
```python
# 轉置
for i in range(n):
    for j in range(i, n):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
# 水平翻轉
for i in range(n):
    for j in range(n // 2):
        matrix[i][j], matrix[i][n-1-j] = matrix[i][n-1-j], matrix[i][j]
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試直接旋轉（不轉置）
- [ ] 向他人解釋為什麼兩步就能完成

---
**題目連結**: [LeetCode 48](https://leetcode.com/problems/rotate-image/)
