# Valid Parentheses
**LeetCode**: #20 | **Difficulty**: Easy |
**Category**: Stack

## 🔍 Problem Statement
給定一個只包含括號字元 `'(){}[]'` 的字串 `s`，判斷字串是否有效。

有效字串需滿足：
1. 開括號必須用相同類型的閉括號關閉
2. 開括號必須以正確的順序關閉

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```

**Example 3:**
```
Input: s = "(]"
Output: false
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：最近開啟的括號必須最先關閉（LIFO 原則），這是 Stack 的典型應用
- **問題特徵**：需要追蹤括號的嵌套順序

### 演算法選擇
- **為什麼選 Stack？**
  - 暴力法：嘗試所有可能的刪除組合，不實際
  - 計數器：無法處理嵌套順序
  - **Stack**：自然地處理嵌套和順序

- **適用場景**
  - 當需要處理嵌套結構時
  - 當需要追溯最近的歷史時
  - 複雜度分析：時間 O(n)，空間 O(n)

### 時機判斷
看到以下特徵時，考慮使用 Stack：
- 📚 關鍵字：「括號」、「嵌套」、「順序」
- 🔄 結構：後進先出（LIFO）的需求
- ⏳ 記憶：需要記住「最近的」元素

## 🎯 實作細節

### 步驟分解
1. **初始化 Stack**：用來存放開括號
2. **建立映射**：閉括號 -> 對應的開括號
3. **遍歷字串**：
   - 如果是開括號，push 進 Stack
   - 如果是閉括號，檢查 Stack 頂部是否匹配
4. **檢查結果**：Stack 為空表示所有括號都正確關閉

### 關鍵程式碼片段
```python
def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping.values():  # 開括號
            stack.append(char)
        elif char in mapping:        # 閉括號
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
    return len(stack) == 0
```

**為什麼這樣寫？**
- 遇到閉括號時，必須與 Stack 頂部的開括號匹配
- `stack[-1]` 訪問頂部元素但不移除
- `stack.pop()` 移除頂部元素

### 易錯點
⚠️ **坑點1**：Stack 為空時彈出元素 - 會報錯，要先檢查
⚠️ **坑點2**：忘記處理最後的情況 - Stack 必須為空
⚠️ **坑點3**：只檢查數量不檢查順序 - "([)]" 應返回 false

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 計數器 | O(n) | O(1) | 節省空間 | 無法處理嵌套 |
| **Stack** | O(n) | O(n) | **正確處理嵌套** | 需要額外空間 |

## 🤔 相關問題
- [Min Stack] - Stack 的變體
- [Daily Temperatures] - 用 Stack 找下一個更大元素

## 📝 學習筆記
- **初學重點**：理解 Stack 的 LIFO 特性
- **模式識別**：看到「嵌套」就想到 Stack
- **技巧**：用 Dictionary 建立閉括號到開括號的映射

## 🔑 關鍵模式
**Stack 基本操作**
```python
stack = []
stack.append(x)    # push
stack.pop()         # pop
stack[-1]          # peek（查看頂部）
len(stack) == 0    # empty check
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試用其他方法（遞迴）解題
- [ ] 向他人解釋為什麼需要 Stack

---
**題目連結**: [LeetCode 20](https://leetcode.com/problems/valid-parentheses/)
