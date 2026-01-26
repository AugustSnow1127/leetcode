/*
 * @lc app=leetcode id=131 lang=javascript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const res = [];

    const dfs = function(start, subStrings) {
        if (start === s.length) {
            res.push([...subStrings]);
            return;
        }

        for (let i = start; i < s.length; i++) {
            // 檢查目前選到的substring是否為回文
            // 如果是就推進subStrings，開始那條線的循環
            if (isPalindrome(s.slice(start, i+1))) {
                subStrings.push(s.slice(start, i+1));
                dfs(i+1, subStrings);
                
                // 把subStrings取出來，繼續檢查下一個字加進來是不是回文
                subStrings.pop()
            }
        }
    };

    dfs(0, []);
    return res;
};

const isPalindrome = function(str) {
    for(let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) return false;
    }
    return true;
}
// @lc code=end

/**
 * 看到 return all possible ...就可以知道是backtracking
 * 
 * 回文檢查要建立一個stack(FILO)，並能夠被完整取完
 * 
 * 這題反悔的重點應該是，"先選擇，再確認能否回文"，然後"反悔選擇，檢查回文"
 * dfs需要的參數
 * 1. stack，共用、傳參
 * 2. start紀錄應該開始選partition的位置
 * 
 * 
 * dfs裡需要
 * 1. 一個for迴圈確保每個值都被partition
 * 2. 一個共用的stack，找到回文後就放進去，放完後反悔，繼續找下一個回文
 */