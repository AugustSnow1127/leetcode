# Reverse Linked List
**LeetCode**: #206 | **Difficulty**: Easy |
**Category**: Linked List

## 🔍 Problem Statement
給定單向鏈結串列（singly linked list）的頭節點 `head`，反轉鏈結串列並返回新的頭節點。

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**
```
Input: head = [1,2]
Output: [2,1]
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：反轉鏈結串列需要改變每個節點的 `next` 指向
- **問題特徵**：在遍歷時需要同時處理當前節點、下一個節點和前一個節點

### 演算法選擇
- **為什麼選迭代法（Three Pointers）？**
  - 遞迴法：簡潔但可能導致堆疊溢出
  - **迭代法**：O(n) 時間，O(1) 空間，更穩定

- **適用場景**
  - 當需要修改鏈結串列的指標時
  - 當需要就地操作時（不使用額外空間）
  - 複雜度分析：時間 O(n)，空間 O(1)

### 時機判斷
看到以下特徵時，考慮使用多指標法：
- 🔗 關鍵字：「反轉」、「修改指標」、「就地操作」
- 📊 結構：Linked List（不能隨機訪問）
- ⚡ 優化：避免額外空間使用

## 🎯 實作細節

### 步驟分解
1. **初始化三個指標**：
   - `prev` = None（新鏈結串列的尾巴）
   - `curr` = head（當前處理的節點）
   - `next_node` = None（保存下一個節點）
2. **遍歷鏈結串列**：while curr 不為 None
3. **反轉指標**：
   - 保存下一個節點：next_node = curr.next
   - 反轉指向：curr.next = prev
   - 移動指標：prev = curr, curr = next_node
4. **返回新頭節點**：prev

### 關鍵程式碼片段
```python
def reverseList(head):
    prev, curr = None, head
    while curr:
        next_node = curr.next  # 保存下一個節點
        curr.next = prev      # 反轉指標
        prev = curr          # 移動 prev
        curr = next_node     # 移動 curr
    return prev  # prev 是新的頭節點
```

**為什麼這樣寫？**
- 必須先保存 `curr.next`，否則改變 `curr.next` 後會丟失後續節點
- 三個指標分別追蹤：前一個、當前、下一個
- `prev` 最終成為新鏈結串列的頭節點

### 易錯點
⚠️ **坑點1**：忘記保存 next_node - 會造成鏈結串列斷裂
⚠️ **坑點2**：指標移動順序錯誤 - 先改變 next 再移動會出問題
⚠️ **坑點3**：空鏈結串列 - 返回 None

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 遞迴法 | O(n) | O(n) | 簡潔 | 堆疊溢出風險 |
| **迭代法** | O(n) | O(1) | **穩定且省空間** | 需要多個指標 |

## 🤔 相關問題
- [Reverse Linked List II] - 反轉部分鏈結串列
- [Reverse Nodes in k-Group] - 分組反轉

## 📝 學習筆記
- **初學重點**：理解指標操作順序的重要性
- **模式識別**：看到「反轉」就想到三指標法
- **技巧**：用紙筆畫出節點和指標的變化，容易理解

## 🔑 關鍵模式
**三指標反轉鏈結串列**
```python
prev, curr = None, head
while curr:
    next_node = curr.next
    curr.next = prev
    prev = curr
    curr = next_node
return prev
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試遞迴版本
- [ ] 向他人解釋指標操作順序

---
**題目連結**: [LeetCode 206](https://leetcode.com/problems/reverse-linked-list/)
