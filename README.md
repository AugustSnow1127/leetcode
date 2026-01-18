# LeetCode 解題練習紀錄

這個專案記錄我在 LeetCode 上的解題歷程，包含解題思路、演算法分析和複雜度評估。

## 📊 進度概覽

### NeetCode 150 進度
- **總題數**: 150
- **已完成**: 22/150 (14.7%)
- **進行中**: 0
- **待解決**: 134

### 難度分佈
- **Easy**: 14/28 (50%)
- **Medium**: 7/101 (7%)
- **Hard**: 1/21 (5%)

### 分類進度

| 分類 | 數量 | 進度 |
|------|------|------|
| Arrays & Hashing | 9 | 1/9 |
| Two Pointers | 5 | 1/5 |
| Sliding Window | 6 | 1/6 |
| Stack | 7 | 1/7 |
| Binary Search | 7 | 1/7 |
| Linked List | 11 | 1/11 |
| Trees | 15 | 4/15 |
| Tries | 3 | 1/3 |
| Heap / Priority Queue | 7 | 1/7 |
| Backtracking | 10 | 1/10 |
| Graphs | 13 | 1/13 |
| Advanced Graphs | 6 | 1/6 |
| 1-D Dynamic Programming | 12 | 1/12 |
| 2-D Dynamic Programming | 11 | 1/11 |
| Greedy | 8 | 1/8 |
| Intervals | 6 | 1/6 |
| Math & Geometry | 8 | 2/8 |
| Bit Manipulation | 7 | 1/7 |

## 📁 專案結構

```
leetcode/
├── README.md                           # 總覽文件
├── NeetCode-150-TodoList.md             # 完整題目清單
├── 01-Arrays-and-Hashing/
│   ├── 217-Contains-Duplicate/
│   │   ├── README.md                   # 解題思路
│   │   ├── solution.py                 # 程式碼
│   │   └── test_solution.py           # 測試案例
│   └── ...
├── 02-Two-Pointers/
│   ├── 125-Valid-Palindrome/
│   │   ├── README.md
│   │   ├── solution.py
│   │   └── test_solution.py
│   └── ...
├── 03-Sliding-Window/
├── 04-Stack/
├── 05-Binary-Search/
├── 06-Linked-List/
├── 07-Trees/
├── 08-Tries/
├── 09-Heap-Priority-Queue/
├── 10-Backtracking/
├── 11-Graphs/
├── 12-Advanced-Graphs/
├── 13-1D-DP/
├── 14-2D-DP/
├── 15-Greedy/
├── 16-Intervals/
├── 17-Math-Geometry/
└── 18-Bit-Manipulation/
```

## 🎯 使用指南

### 如何開始解題

1. **選擇題目**：查看 `NeetCode-150-TodoList.md`，選擇一個題目
2. **閱讀 README**：了解問題描述、解題思路和關鍵模式
3. **實作 solution.py**：根據 README 的提示實作解法
4. **執行測試**：運行 `test_solution.py` 驗證你的解法
5. **更新進度**：在 README 中標記進度

### 測試你的解法

```bash
# 運行測試案例
cd 01-Arrays-and-Hashing/217-Contains-Duplicate
python test_solution.py

# 或使用 unittest（詳細輸出）
python -m unittest test_solution -v
```

### 文件寫作原則

每個題目的 README.md 應包含：

- ✅ **問題描述**：簡潔的問題摘要和範例
- ✅ **解題思路**：為什麼選這個演算法
- ✅ **時機判斷**：何時使用這個模式
- ✅ **實作細節**：步驟分解和關鍵程式碼
- ✅ **易錯點**：常見陷阱和注意事項
- ✅ **複雜度分析**：不同方法的對比
- ✅ **學習筆記**：個人理解和進度追蹤

## 🔑 核心模式總結

### Arrays & Hashing
- **Set 用於存在性檢查**：O(1) 查詢，用於去重和查找
- **Hash Map 用於計數和映射**：統計頻率、關聯鍵值對

### Two Pointers
- **從兩端向中間**：處理迴文、容器問題
- **同向雙指標**：處理有序陣列、窗口問題

### Sliding Window
- **固定窗口**：窗口大小固定，滑動處理
- **動態窗口**：根據條件動態調整窗口大小

### Stack
- **LIFO 特性**：處理嵌套結構、括號匹配
- **追蹤歷史**：存儲「最近的」元素

### Binary Search
- **有序數據**：在有序陣列中快速查找
- **搜索空間減半**：每次迭代排除一半的可能性

### Dynamic Programming
- **重疊子問題**：避免重複計算
- **最優子結構**：組合子問題的最優解

### Graph Algorithms
- **DFS**：深度優先，適合路徑探索
- **BFS**：廣度優先，適合最短路徑

### Bit Manipulation
- **位運算操作**：XOR、AND、OR、位移
- **O(1) 空間**：用位運算節省空間

## 📚 學習資源

### 推薦平台
- [LeetCode](https://leetcode.com/) - 主要練習平台
- [NeetCode](https://neetcode.io/) - 視頻教程和題目分類
- [Visual Algo](https://visualgo.net/) - 演算法視覺化

### 參考書籍
- "Introduction to Algorithms" (CLRS)
- "Cracking the Coding Interview"
- "Elements of Programming Interviews"

## 🎯 下一步計劃

- [ ] 完成每個分類的第一題
- [ ] 建立完整的測試覆蓋率
- [ ] 添加更多演算法模式的總結
- [ ] 定期複習已解題目

## 📝 學習目標

1. **短期目標**（1-2 個月）
   - 完成所有 Easy 題目
   - 掌握基礎資料結構和演算法

2. **中期目標**（3-6 個月）
   - 完成所有 Medium 題目
   - 深入理解常用模式

3. **長期目標**（6-12 個月）
   - 完成所有 Hard 題目
   - 能夠快速識別和解決新問題

## 💡 解題建議

### 練習方法
1. **先自己想**：不看解答，嘗試自己解決
2. **時間限制**：設定 30 分鐘，超時再看提示
3. **記錄思路**：寫下你的想法，即使解不出來
4. **複習再解**：隔天不看解答重新解題
5. **教給別人**：向他人解釋你的解法

### 常見錯誤
- ❌ 只記程式碼，不記解題思路
- ❌ 複習題目時直接看答案
- ❌ 只刷簡單題，避免困難題
- ❌ 不複習已解題目

### 正確習慣
- ✅ 理解為什麼用這個演算法
- ✅ 學習模式和識別技巧
- ✅ 分析複雜度和優化
- ✅ 嘗試多種解法並對比

## 🔗 外部資源

- [NeetCode 150 官網](https://neetcode.io/practice)
- [LeetCode 討論區](https://leetcode.com/discuss/)
- [Algorithm Visualizer](https://algorithm-visualizer.org/)

---

**最後更新**: 2026-01-08

**祝你在 LeetCode 的旅程中順利！加油！💪**
