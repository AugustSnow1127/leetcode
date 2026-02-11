/*
 * @lc app=leetcode id=242 lang=javascript
 *
 * [242] Valid Anagram
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    const counts = new Map();

    for (let i = 0; i < s.length; i++) {
        const count = counts.get(s[i]) || 0;
        counts.set(s[i], count + 1);
    }

    for (let i = 0; i < t.length; i++) {
        if (!counts.get(t[i])) return false;
        counts.set(t[i], counts.get(t[i]) - 1);
    }

    return true;
};
// @lc code=end

/**
 * anagram 變位詞，指的是字母完全一樣的兩個字，只是排序不同
 * 1. 可以遍歷s，計算所有字母出現次數後，再遍歷t，確認是不是所有字母出現次數相同
 */