/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const res = [];
    const digitMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    };

    const dfs = function(digitIdx, str) {
        if (str.length === digits.length) {
            res.push(str);
            return;
        }

        const letters = digitMap[digits[digitIdx]];
        for (let i = 0; i < letters.length; i++) {
            str += letters[i];
            dfs(digitIdx + 1, str);
            str = str.slice(0, -1);
        }
    }

    dfs(0, '');
    return res;
};
// @lc code=end

/**
 * 要先建立一個map裝數字和字母對應
 * 
 * 就直接做backtrack應該就行
 */