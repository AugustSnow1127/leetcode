/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (!s.length) return 0;

    const arr = [];
    const set = new Set();
    let max = 0;

    for (let i = 0; i < s.length; i++) {
        if (set.has(s[i])) {
            max = Math.max(max, arr.length);

            // 把相同的字前的字全部取出來
            while(arr[0] !== s[i]) {
                set.delete(arr[0]);
                arr.shift();
            }
            arr.shift();

            arr.push(s[i]);
        } else {
            set.add(s[i]);
            arr.push(s[i]);
            max = Math.max(max, arr.length);
        }
    }

    return max;
};
// @lc code=end

/**
 * 找出連續字母之間最長的間隔
 * 
 * 設定一個FIFO array，和set紀錄array裡有那些不重複值
 * 和max紀錄最大length
 * 如果指針指到set裡有的值，就max = Math.max(max, array.length)
 * 
 * 答案正確，但要注意shift()是O(n)操作，應該改用左指標
 */
