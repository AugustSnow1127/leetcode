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
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];
    const set = [];

    function backtrack(start, sum) {
        // 剪枝
        if (sum > target) return;
        // 停止
        if (sum === target) {
            res.push([...set]);
            return;
        }
        
        // candidates = [1,1,2,5,6,7,10] target = 8
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            
            set.push(candidates[i]);
            backtrack(i + 1, sum + candidates[i]);
            set.pop();
        }
    }

    backtrack(0, 0);

    return res;
};
// @lc code=end

/**
 * [嘗試用AI給的"去重"的backtrack模板做一次]
 * 
 * 這很正常，Backtracking 的「去重邏輯」本來就很難憑空想出來，幾乎所有人（包括我）第一次學都是直接背起來這個 Pattern。

這不是作弊，這叫建立 Model。 你不需要每次都重新發明輪子。只要記住這個模板：

nums.sort(); // 1. 記得排序
function backtrack(start) {
    // ...
    for (let i = start; i < nums.length; i++) {
        // 2. 背下來這行去重咒語：
        if (i > start && nums[i] === nums[i - 1]) continue;
        
        // 3. 標準 backtrack 三部曲
        path.push(nums[i]);
        backtrack(i + 1);
        path.pop();
    }
}
 */
