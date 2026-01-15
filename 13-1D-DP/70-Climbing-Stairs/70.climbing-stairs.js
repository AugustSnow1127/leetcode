/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 */

// @lc code=start

// O(2^n) 時間複雜度太高
// /**
//  * @param {number} n
//  * @return {number}
//  */
// var climbStairs = function(n) {
//     let res = 0;

//     // 需要的參數
//     // 1. 目前爬的步數
//     const climb = function(steps) {
//         console.log('steps', steps);
//         // 爬一步
//         steps++;

//         if (steps > n) return;
//         if (steps == n) {
//             res++;
//             return;
//         } else {
//             climb(steps);
//         }
//         console.log('steps2', steps);

//         // 爬兩步
//         steps++;
//         if (steps > n) return;
//         if (steps == n) {
//             res++;
//             return;
//         } else {
//             climb(steps);
//         }
//     }

//     climb(0);

//     return res;
// };
// @lc code=end

// @lc code=start

// [應優化成迭代]
/**
 * @param {number} n
 * @return {number}
 */
// var climbStairs = function(n) {
//     // 已知這題的解答是費比那西數列
//     // 則寫出費比那西函數即可
//     if (n === 1) return 1;
//     if (n === 2) return 2;

//     const n1 = 1;
//     const n2 = 2;

//     const fe = function(a, b, i) {
//         let c = a + b;

//         if (i === n) return c;

//         return fe(b, c, i + 1);
//     }
//     const res = fe(n1, n2, 3);

//     return res;
// };

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // 已知這題的解答是費比那西數列
    // 則寫出費比那西函數即可
    if (n === 1) return 1;
    if (n === 2) return 2;

    let prev = 1;
    let curr = 2;
    let next;

    for (let i = 3; i <= n; i++) {
        next = prev + curr;
        prev = curr;
        curr = next;
    }

    return next;
};

// @lc code=end

/**
 * 思考
 * 這題有點像78題，也是類似要遍歷所有決策樹的感覺
 * 只要在走到n步的時候就停下來
 * [Time Limit Exceeded 錯誤]
 * [AI引導] 暴力枚舉的時間複雜度是O(2^n)
 * 78題只會有2^10個節點，但這一題要2^45個節點，計算量太大
 * [AI引導] DP的重點在"大問題的解，能透過小問題得到"
 * 這一題觀察每個n得到的結果，會得出費比納西數列
 * n	結果	遞推關係
    1	1	-
    2	2	-
    3	3	n1 + n2
    4	5	n2 + n3
    5	8	n3 + n4
 * 換句話說，為了避免backtracking的作法消耗太多空間和時間
    就用"邊走邊紀錄"的技巧來算出最終結果

    [優化] 用遞迴的時間複雜度和空間複雜度都是O(n)，但用迭代則可以降低空間複雜度到O(1)
    寫的時候要時刻記得時間和空間O
 */
