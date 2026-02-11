/*
 * @lc app=leetcode id=242 lang=javascript
 *
 * [242] Valid Anagram
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 *
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 *
 * Constraints:
 * 1 <= s.length, t.length <= 5 * 10^4
 * s and t consist of lowercase English letters.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    // 在這裡寫你的解答...

};


// 簡單測試
console.log('Testing Example 1: s = "anagram", t = "nagaram" -> expect true');
console.log(isAnagram("anagram", "nagaram") === true ? 'PASS' : 'FAIL');

console.log('Testing Example 2: s = "rat", t = "car" -> expect false');
console.log(isAnagram("rat", "car") === false ? 'PASS' : 'FAIL');
