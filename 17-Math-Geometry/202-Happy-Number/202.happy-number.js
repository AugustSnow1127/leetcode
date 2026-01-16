/*
 * @lc app=leetcode id=202 lang=javascript
 *
 * [202] Happy Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    const set = new Set();
    while (n !== 1) {
        // 把所有數字的平方加起來
        let tempSum = 0
        const str = n.toString();
        for (let i = 0; i < String(n).length; i++) {
            tempSum += Math.pow(Number(str[i]), 2);
        }

        // 如果數字出現過，代表進入死循環
        if (set.has(tempSum)) {
            return false;
        } else {
            set.add(tempSum);
            n = tempSum;
        }
    }

    return true;
};
// @lc code=end

/**
 * 1. 把1~9的可能性列出來發現一個規律是：無法到１的數字會進入「循環」
 * 2. 所以問題變成是，能否判斷n是否會進入循環之中
 * 3. 要判斷是否進入循環，就要判斷同一個數字是否出現過了
 * 4. 所以應該只要把值都存進Set來判斷就好
1
2 -> 4
3 -> 9 -> 81 -> 65 -> 61
4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4
5 -> 25 -> 29 -> 85 -> 89
6 -> 36 -> 45 -> 41 -> 17 -> 50 -> 25
7 -> 49 -> 97 -> 130 -> 10 -> 1
8 -> 64 -> 52 -> 29
9 -> 81
 */