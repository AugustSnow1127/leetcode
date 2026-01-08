# Invert Binary Tree
**LeetCode**: #226 | **Difficulty**: Easy |
**Category**: Trees

## 🔍 Problem Statement
給定二叉樹的根節點 `root`，反轉二叉樹並返回根節點。

**Example 1:**
```
Input:
    4
   / \
  2   7
 / \ / \
1  3 6  9

Output:
    4
   / \
  7   2
 / \ / \
9  6 3  1
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：反轉二叉樹就是交換每個節點的左右子節點
- **問題特徵**：樹的遍歷，需要訪問每個節點

### 演算法選擇
- **為什麼選遞迴法？**
  - 迭代法（BFS/DFS）：需要 Queue 或 Stack
  - **遞迴法**：簡潔直觀，符合樹的遞迴定義

- **適用場景**
  - 當問題可以分解為相同子問題時
  - 當需要遍歷整棵樹時
  - 複雜度分析：時間 O(n)，空間 O(h)，h 是樹高

### 時機判斷
看到以下特徵時，考慮使用遞迴：
- 🌳 關鍵字：「樹」、「子樹」、「反轉」
- 🔄 結構：樹形結構（自然的遞迴結構）
- ♻️ 模式：問題可以分解為相同的子問題

## 🎯 實作細節

### 步驟分解
1. **基准情況**：如果 root 是 None，返回 None
2. **交換子節點**：交換 root.left 和 root.right
3. **遞迴調用**：
   - 反轉左子樹：invertTree(root.left)
   - 反轉右子樹：invertTree(root.right)
4. **返回根節點**：root

### 關鍵程式碼片段
```python
def invertTree(root):
    if not root:
        return None
    # 交換左右子節點
    root.left, root.right = root.right, root.left
    # 遞迴反轉子樹
    invertTree(root.left)
    invertTree(root.right)
    return root
```

**為什麼這樣寫？**
- Python 的多重賦值 `a, b = b, a` 可以一行的交換
- 遞迴到底（葉子節點）後，逐步返回並交換
- 每個節點訪問一次，時間複雜度 O(n)

### 易錯點
⚠️ **坑點1**：忘記基准情況 - 會造成無限遞迴
⚠️ **坑點2**：交換後沒有遞迴 - 只反轉了根節點
⚠️ **坑點3**：空樹 - 應返回 None

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| BFS（隊列） | O(n) | O(n) | 迭代 | 需要隊列 |
| **遞迴** | O(n) | O(h) | **簡潔** | 堆疊空間 |

*註：h 是樹高，最壞情況 h = n（傾斜樹），最好情況 h = log n（平衡樹）

## 🤔 相關問題
- [Same Tree] - 比較兩棵樹
- [Binary Tree Level Order Traversal] - BFS 遍歷

## 📝 學習筆記
- **初學重點**：理解樹的遞迴遍歷
- **模式識別**：看到「樹」就想到遞迴或 BFS/DFS
- **技巧**：畫出樹的變化幫助理解遞迴流程

## 🔑 關鍵模式
**樹的遞迴模板**
```python
def traverse(node):
    if not node:  # 基准情況
        return None
    # 處理當前節點
    # 遞迴處理子節點
    traverse(node.left)
    traverse(node.right)
    return node
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試迭代版本（BFS）
- [ ] 向他人解釋遞迴流程

---
**題目連結**: [LeetCode 226](https://leetcode.com/problems/invert-binary-tree/)
