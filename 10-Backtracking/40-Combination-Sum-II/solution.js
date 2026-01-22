/*
 * @lc app=leetcode id=40 lang=javascript
 *
 * [40] Combination Sum II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    // 1. 排序是去重的前提，這一步非常關鍵。
    // 如果不排序，[1, 7, 1] 這種重複的數字就無法靠 i 和 i-1 的比較來抓出來
    candidates.sort((a, b) => a - b);

    const res = [];
    const set = [];

    // start: 當前遞迴的起點
    // sum: 當前的總和
    function backtrack(start, sum) {
        // 剪枝：如果目前的總和已經超過 target，後面再加正數也沒救了，直接放棄
        if (sum > target) return;

        // 找到答案：收錄當前這個組合
        if (sum === target) {
            res.push([...set]); // 必須做深拷貝，否則 set 內容稍後被 pop 會影響 res
            return;
        }

        // 決策迴圈：從 start 開始嘗試每一個候選人
        for (let i = start; i < candidates.length; i++) {

            // --- 去重邏輯的核心咒語 ---
            // i > start: 代表這不是這層迴圈的第一個選擇
            // candidates[i] === candidates[i - 1]: 代表這個數字跟剛剛那個被我們 pop 掉的數字長一樣
            // 如果都成立，代表我們正在做重複的事情（例如，剛剛選了第一個 '1' 開頭，現在又想選第二個 '1' 開頭）
            // 這時候直接跳過，避免產生重複的組合
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            // 還有一個可選的優化：如果單單加上這一個就爆掉了，後面的數字只會更大，所以可以直接 break
            if (sum + candidates[i] > target) break;

            // 1. 做決定 (Action)
            set.push(candidates[i]);

            // 2. 遞迴 (Recurse)
            // 傳入 i + 1，因為每個數字只能用一次，所以下一層要從下一個位置開始選
            backtrack(i + 1, sum + candidates[i]);

            // 3. 反悔 (Backtrack)
            // 把剛剛放進去的數字拿出來，恢復現場，讓迴圈可以去試下一個數字
            set.pop();
        }
    }

    backtrack(0, 0);

    return res;
};
// @lc code=end
