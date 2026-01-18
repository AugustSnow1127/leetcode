# 572. Subtree of Another Tree

## 問題描述

給定兩棵二元樹 `root` 和 `subRoot`。檢查 `root` 中是否包含和 `subRoot` 具有相同結構和節點值的子樹。如果存在，返回 `true`；否則返回 `false`。

## 解題思路

這題是 "Same Tree" 問題的延伸。我們可以把問題拆解成兩個部分：

1. **遍歷 (`Traversal`)**：我們需要遍歷主樹 `root` 的每一個節點，把每個節點當作潛在的起點。
2. **比對 (`Comparison`)**：對於每一個遍歷到的節點，我們檢查「以該節點為根的子樹」是否和 `subRoot` 完全相同 (即 `isSameTree`)。

### 核心邏輯
- 寫一個輔助函數 `isSameTree(p, q)` 用來判斷兩棵樹是否完全相同（結構與值都要一樣）。
- 在主函數 `isSubtree(root, subRoot)` 中：
    - 如果 `subRoot` 是空的，題目定義為 true（視情況而定，本題 constraint 說節點數 >= 1）。
    - 如果 `root` 是空的但 `subRoot` 不是，當然找不到，回傳 false。
    - **檢查當前節點**：如果 `root` 和 `subRoot` 值相同，嘗試跑 `isSameTree`。
    - **遞迴搜尋**：不管當前有沒有找到，繼續去 `root.left` 和 `root.right` 找。只要左右任何一邊有找到 (`||`) 就算成功。

## 複雜度分析

假設 `root` 有 M 個節點，`subRoot` 有 N 個節點。

- **時間複雜度**: **O(M * N)**
    - 最壞情況下，對於 `root` 的每一個節點（共 M 個），我們都要執行一次 `isSameTree`。
    - `isSameTree` 最多會遍歷 `subRoot` 的所有節點（共 N 個）。
    - 因此總運算量約為 M * N。

- **空間複雜度**: **O(M + N)**
    - 這是因為遞迴堆疊（Call Stack）的深度。
    - 主遞迴深度最大為 `root` 的高度 (H_root)。
    - 內層 `isSameTree` 遞迴深度最大為 `subRoot` 的高度 (H_sub)。
    - 總空間為 O(H_root + H_sub)。通常 N << M，所以可以近似看作 O(M) 或 O(height of root)。

## 學習重點

1. **模組化思維**：將複雜問題拆解成已知的簡單問題 (`isSameTree`)。
2. **遞迴的雙重結構**：外層遞迴負責「找位置」，內層遞迴負責「比對內容」。
3. **邏輯判斷的短路 (Short-circuit)**：利用 `||` 運算子，只要找到一個符合的就立刻回傳 True，不用找完全部。
