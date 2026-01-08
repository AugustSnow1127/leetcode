# Implement Trie (Prefix Tree)
**LeetCode**: #208 | **Difficulty**: Medium |
**Category**: Tries

## 🔍 Problem Statement
實作一個 Trie（前綴樹），包含以下功能：
- `insert(word)`：插入單詞到 Trie 中
- `search(word)`：搜尋單詞是否存在於 Trie 中
- `startsWith(prefix)`：搜尋是否有任何單詞以該前綴開頭

**Example:**
```
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");      // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");
trie.search("app");      // 返回 true
```

## 💡 解題思路

### 關鍵洞察
- **核心觀察**：Trie 是樹形結構，每個節點代表一個字元，路徑代表單詞或前綴
- **問題特徵**：需要高效處理前綴匹配問題

### 演算法選擇
- **為什麼選 Trie？**
  - Hash Set：O(n) 時間，但前綴搜尋不高效
  - **Trie**：插入/搜尋/前綴搜尋都是 O(L)，L 是單詞長度

- **適用場景**
  - 當需要大量字串的前綴操作時
  - 當需要高效的自動完成功能時
  - 複雜度分析：時間 O(L)，空間 O(N*L)，N 是單詞數量

### 時機判斷
看到以下特徵時，考慮使用 Trie：
- 🔤 關鍵字：「前綴」、「字串匹配」、「自動完成」
- 📊 操作：頻繁的 insert/search/prefix 操作
- ⚡ 優化：前綴搜尋需要更快 than Hash Set

## 🎯 實作細節

### 步驟分解

**Trie 節點設計：**
1. `children`：字典，存儲子節點（字元 -> 節點）
2. `is_end`：布爾值，標記是否為單詞結尾

**操作實作：**

1. **insert(word)**：
   - 從根節點開始
   - 對於每個字元：
     - 如果字元不在 children 中，建立新節點
     - 移動到該子節點
   - 最後一個節點標記 is_end = True

2. **search(word)**：
   - 從根節點開始
   - 對於每個字元：
     - 如果字元不在 children 中，返回 False
     - 移動到該子節點
   - 返回最後節點的 is_end

3. **startsWith(prefix)**：
   - 從根節點開始
   - 對於每個字元：
     - 如果字元不在 children 中，返回 False
     - 移動到該子節點
   - 成功遍歷完所有前綴字元，返回 True

### 關鍵程式碼片段
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

**為什麼這樣寫？**
- `children` 用字典可以快速查找 O(1)
- `is_end` 區分前綴和完整單詞
- 三個操作都從根開始，共享遍歷邏輯

### 易錯點
⚠️ **坑點1**：忘記標記 is_end - 無法區分前綴和單詞
⚠️ **坑點2**：children 用陣列（大小26）- 浪費空間，字典更靈活
⚠️ **坑點3**：搜尋空字串 - 應根據需求處理

## 📊 複雜度分析

| 資料結構 | 插入 | 搜尋 | 前綴搜尋 | 空間 |
|----------|------|------|----------|------|
| Hash Set | O(L) | O(L) | O(N*L) | O(N*L) |
| **Trie** | O(L) | O(L) | O(L) | O(N*L) |

*註：N 是單詞數量，L 是平均單詞長度*

## 🤔 相關問題
- [Design Add and Search Words Data Structure] - Trie 支持通配符
- [Word Search II] - Trie 處理字板搜尋

## 📝 學習筆記
- **初學重點**：理解 Trie 如何節省空間（共享前綴）
- **模式識別**：看到「前綴」就想到 Trie
- **技巧**：畫出 Trie 的結構，理解共享前綴的概念

## 🔑 關鍵模式
**Trie 基本結構**
```
root
 ├─ a
 │   ├─ p
 │   │   ├─ p (is_end=True)
 │   │   │   └─ l (is_end=True)
 │   │   │       └─ e (is_end=True)
```

## 🎯 追蹤你的進度
- [ ] 完成第一次解題
- [ ] 不看解答重新解題
- [ ] 嘗試實作 delete 操作
- [ ] 向他人解釋 Trie 的優勢

---
**題目連結**: [LeetCode 208](https://leetcode.com/problems/implement-trie-prefix-tree/)
