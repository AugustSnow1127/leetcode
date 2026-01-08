# Subsets
**LeetCode**: #78 | **Difficulty**: Medium |
**Category**: Backtracking

## 🔍 Problem Statement
給定一組不同整數 `nums`，返回所有可能的子集（power set）。

解集不能包含重複的子集。你可以按任意順序返回解集。

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**Example 2:**
```
Input: nums = [0]
Output: [[],[0]]
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：對於每個元素，有兩個選擇：包含或不包含
- **問題特徵**：需要探索所有可能，產生 2^n 個子集

### 演算法選擇
- **為什麼選 Backtracking？**
  - 迭代法：需要複雜的索引管理
  - **Backtracking**：自然的遞迴結構，容易理解和實作

- **適用場景**
  - 當需要產生所有組合或排列時
  - 當問題可以分解為「選或不選」的決策時
  - 複雜度分析：時間 O(n * 2^n)，空間 O(n)（遞迴堆疊）

### 時機判斷
看到以下特徵時，考慮使用 Backtracking：
- 🔍 關鍵字：「所有可能」、「組合」、「排列」、「子集」
- 🔄 模式：需要探索所有決策路徑
- 📊 結構：問題可以分解為相同的子問題

## 🎯 實作細節

### 步驟分解
1. **初始化結果列表**：`result = []`
2. **定義回溯函數**：`backtrack(start, path)`
3. **探索選擇**：
   - 將當前 path 加入 result（一個完整的子集）
   - 從 start 開始遍歷：
     - 將 nums[i] 加入 path
     - 遞迴：backtrack(i + 1, path)
     - 回溯：從 path 移除 nums[i]

### 關鍵程式碼片段
```python
def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:])  # 加入當前子集的副本
        for i in range(start, len(nums)):
            path.append(nums[i])       # 選擇
            backtrack(i + 1, path)     # 遞迴
            path.pop()                   # 回溯（不選擇）
    backtrack(0, [])
    return result
```

**為什麼這樣寫？**
- `path[:]` 創建副本，否則後續修改會影響已加入的結果
- 從 `i + 1` 開始，避免重複使用同一元素
- `path.pop()` 回溯，回到上一決策點

### 易錯點
⚠️ **坑點1**：忘記創建副本 - 所有結果都變成最後的空列表
⚠️ **坑點2**：從 0 開始遍歷 - 會產生重複子集
⚠️ **坑點3**：忘記回溯 - path 會不斷增長

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 迭代法 | O(n * 2^n) | O(n * 2^n) | 不用遞迴 | 代碼複雜 |
| **Backtracking** | O(n * 2^n) | O(n) | **簡潔** | 堆疊空間 |

## 🤔 相關問題
- [Subsets II] - 有重複元素的子集
- [Combination Sum] - 目標和的組合

## 📝 學習筆記
- **初學重點**：理解「選擇-遞迴-回溯」的流程
- **模式識別**：看到「所有子集/組合」就想到 Backtracking
- **技巧**：畫出決策樹，每個節點代表「選或不選」

## 🔑 關鍵模式
**Backtracking 基本模板**
```python
def backtrack(參數):
    if 滿足條件:
        result.append(副本)
        return
    for choice in choices:
        做選擇
        backtrack(新參數)
        撤銷選擇（回溯）
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試迭代版本
- [ ] 向他人解釋回溯的決策樹

---
**題目連結**: [LeetCode 78](https://leetcode.com/problems/subsets/)
