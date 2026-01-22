/*
 * @lc app=leetcode id=46 lang=javascript
 *
 * [46] Permutations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var permute = function(nums) {
//     const res = [];

//     const dfs = function(restNums, arr) {
//         console.log('', );
//         console.log('qq', restNums, arr);
//         if (!restNums.length || arr.length === nums.length) {
//             res.push([...arr]);
//             return;
//         }

//         // 選
//         const n = restNums.shift();
//         arr.push(n);
//         dfs([...restNums], [...arr]);

//         // 不選
//         arr.pop();
//         restNums.push(n); // 把原本的第一個值排到最後
//         dfs([...restNums], [...arr]);
//     }

//     dfs(nums, []);
//     return res;
// };
// @lc code=end

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];

    const dfs = function(currentArr) {
        if (currentArr.length === nums.length) {
            res.push([...currentArr]);
            return;
        }

        for(let num of nums) {
            if (!currentArr.includes(num)) {
                currentArr.push(num);
                dfs(currentArr);
                // [AI提示] 應該要撤銷決定
                currentArr.pop();
            }
        }
    };

    dfs([]);
    return res;
};
// @lc code=end

/**
 * 用backtracking
 * 這次"選"與"不選"的條件在於，要不要選擇nums[0]
 * 選了: 把restNums的可能性shift掉
 * 沒有選，讓nums的第一個值排到最後
 * 選到nums.length和選過的arr長度相等為止
 * 
 * [思考錯誤，AI引導] 這題不用"選與不選"，而是有nums.length個位置，依序把每個值填進去一次即可
 */
