/*
 * @lc app=leetcode id=125 lang=javascript
 *
 * [125] Valid Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let lp = 0;
    let rp = s.length - 1;

    while (lp < rp) {
        if (s[lp] !== s[rp]) return false;
        lp++;
        rp--;
    }
    return true
};
// @lc code=end

/**
 * 思考
 * 1. 判斷回文，代表頭跟尾應該都要一樣 -> 用two pointer
 * 2. 怎麼把s變成純文字? -> 正則表達式判斷是否為Alphanumeric characters
 */