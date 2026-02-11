# Course Schedule

## 問題描述

你必須修 `numCourses` 門課（編號 `0` 到 `numCourses-1`）。
有些課程有前置要求，例如 `[0, 1]` 表示修課程 0 之前必須先修課程 1。
回傳是否可能完成所有課程？（即檢測圖中是否存在環）

## 解題思路：DFS + Cycle Detection

這是一個標準的「有向圖檢測環」問題。我們可以使用 DFS 配合「三色標記法」（雖然這裡用兩個 Set 實作，概念相同）。

### 核心觀念
對於每個節點，可能有三種狀態：
1. **未訪問 (Unvisited)**: 還沒檢查過。
2. **訪問中 (Visiting)**: 正在目前的 DFS 遞迴堆疊中。如果再次遇到這個狀態的節點，表示**有環**。
3. **已訪問 (Visited)**: 該節點及其所有子節點都檢查完畢，確認沒有環。下次遇到可以直接跳過（剪枝）。

### 演算法步驟

1. **建立鄰接表 (Adjacency List)**: 將 edge list `prerequisites` 轉為 `map[pre] -> [course, ...]`。
2. **遍歷所有課程**: 因為圖可能不連通，必須對 `0` 到 `numCourses-1` 的每個節點發動 DFS。
3. **DFS 邏輯**:
   - `if (visiting.has(node))` -> **Found Cycle!** Return `false`.
   - `if (visited.has(node))` -> **Safe.** Return `true`.
   - 加入 `visiting`.
   - 對所有鄰居遞迴 DFS。如果有任一鄰居回傳 `false`，則立刻向上回傳 `false`。
   - 移除 `visiting`，加入 `visited`。
   - Return `true`.

### 複雜度分析

- **時間複雜度**: O(V + E)
  - V = numCourses, E = prerequisites.length
  - 每個節點和每條邊最多只會被訪問一次。
- **空間複雜度**: O(V + E)
  - 鄰接表 O(V + E)
  - 遞迴堆疊 O(V)
  - Set O(V)
