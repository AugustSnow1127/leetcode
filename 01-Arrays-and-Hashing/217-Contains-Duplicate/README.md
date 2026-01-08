# Contains Duplicate
**LeetCode**: #217 | **Difficulty**: Easy |
**Category**: Arrays & Hashing

## 🔍 Problem Statement
給定一個整數陣列 `nums`，如果陣列中存在任何重複的值，返回 `true`；如果每個元素都是唯一的，返回 `false`。

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: true
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: false
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：問題的核心是「檢查重複」，這是 Set 資料結構的典型應用
- **問題特徵**：不需要關注元素出現的次數，只需要知道「是否出現過」

### 演算法選擇
- **為什麼選 Hash Set？**
  - 暴力法：兩層迴圈比對，時間複雜度 O(n²)
  - 排序法：先排序 O(n log n)，再檢查相鄰元素
  - **Hash Set**：一次遍歷 O(n)，插入和查詢平均 O(1)

- **適用場景**
  - 當需要快速檢查元素是否存在時
  - 當不需要維護順序，只關心存在性時
  - 複雜度分析：時間 O(n)，空間 O(n)

### 時機判斷
看到以下特徵時，考慮使用 Hash Set：
- 🔍 關鍵字：「重複」、「唯一」、「存在」
- ❌ 不需要：計算出現次數（用 Hash Map）
- ❌ 不需要：維護順序（用陣列或 Linked List）
- ✅ 需要：快速查詢 O(1)

## 🎯 實作細節

### 步驟分解
1. **初始化 Set**：建立空的 HashSet 用來存儲已見過的元素
2. **遍歷陣列**：逐個檢查每個元素
3. **檢查重複**：如果元素已在 Set 中，立即返回 true
4. **加入 Set**：如果不存在，將元素加入 Set
5. **返回結果**：遍歷完成沒有重複，返回 false

### 關鍵程式碼片段
```python
def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:  # O(1) 查詢
            return True
        seen.add(num)    # O(1) 插入
    return False
```

**為什麼這樣寫？**
- `num in seen` 是 O(1) 操作，比陣列的 O(n) 快很多
- 一旦找到重複就立即返回，最佳化平均情況

### 易錯點
⚠️ **坑點1**：忘記處理空陣列 - 空陣列返回 false（沒有重複）
⚠️ **坑點2**：使用 List 代替 Set - 查詢效率會從 O(1) 變成 O(n)

## 📊 複雜度分析

| 方法 | 時間複雜度 | 空間複雜度 | 優點 | 缺點 |
|------|------------|------------|------|------|
| 暴力法 | O(n²) | O(1) | 不需要額外空間 | 太慢 |
| 排序法 | O(n log n) | O(1) 或 O(n) | 空間較省 | 會修改原陣列 |
| **Hash Set** | O(n) | O(n) | **快速** | 需要額外空間 |

## 🤔 相關問題
- [Group Anagrams] - 用 Hash Map 組織分組
- [Longest Consecutive Sequence] - 用 Hash Set 優化

## 📝 學習筆記
- **初學重點**：理解 Set 和 List 的查詢效率差異
- **模式識別**：看到「重複」就想到 Set
- **下次遇到類似問題**：先用 Set，思考空間換時間的取捨

## 🔑 關鍵模式
**Set 用於存在性檢查**
- 檢查元素是否存在：O(1)
- 自動去重
- 不保證順序

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試空間優化版本
- [ ] 向他人解釋這題

---
**題目連結**: [LeetCode 217](https://leetcode.com/problems/contains-duplicate/)
