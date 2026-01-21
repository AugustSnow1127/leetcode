/*
 * @lc app=leetcode id=39 lang=javascript
 *
 * [39] Combination Sum
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const res = [];

    // idx作為candidates的指針，arr紀錄目前的選擇，sum則記錄目前選擇的總和
    const dfs = function(idx, arr, sum) {
        // 停止條件
        if (idx === candidates.length) return;
        if (sum > target) return;
        if (sum === target) {
            res.push([...arr]);
            return;
        }

        // 選
        arr.push(candidates[idx]);
        sum += candidates[idx];
        dfs(idx, arr, sum); // 選了之後，因為已經選的candidate還能用，所以idx不用+1

        // 不選
        arr.pop();
        sum -= candidates[idx];
        dfs(idx + 1, arr, sum);
    };

    dfs(0, [], 0);

    return res;
};
// @lc code=end

/**
 * 我已經知道這題是backtracking的題型
 * 
 * 看起來是要建立決策樹
 * 在每一層的選擇candidate
 * 只要不等於target就前往下一層
 * 直到sum === target為止
 * 
 * 但candidate可以選很多次，問題是"選"和"不選"在這題要怎麼做?
 * 
 * 如果 第一次選，candidates是有限的
 * 例如第一輪(選2 or 不選2) -> 第二輪(選3 or 不選3) -> 第3輪(選6 or 不選6)  -> 第4輪(選7 or 不選7) 
 * 選完後，再重新用現有的結果，繼續選新的一輪
 * Q: 什麼時候停下一直都沒選的那一條路?
 * 
 * [思考錯誤，AI引導] 不是選了一輪之後再重新選一輪
 * 而是在"選"的時候，因為已經選的candidate還能用，所以idx不用前進
 */