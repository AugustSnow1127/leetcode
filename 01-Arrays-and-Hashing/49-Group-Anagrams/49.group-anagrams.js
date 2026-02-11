/*
 * @lc app=leetcode id=49 lang=javascript
 *
 * [49] Group Anagrams
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // 先把所有Str重新排列
    const arr = [];
    for (let str of strs) {
        arr.push(Array.from(str).sort().toString())
    }

    // arr [ 'a,e,t', 'a,e,t', 'a,n,t', 'a,e,t', 'a,n,t', 'a,b,t' ]
    const map = new Map();
    const res = [];
    for (let i = 0; i < strs.length; i++) {
        // 如果相同的anagrams還沒推進去res過，則新增map對應index，並多開一個res位置
        if (!map.has(arr[i])) {
            map.set(arr[i], res.length); // 用map紀錄每個重組字串對應的index
            res.push([]); // res多加一格放新的陣列
        }

        // 把原本strs的str推到相同的anagrams index
        res[map.get(arr[i])].push(strs[i]);
    }

    return res;
};
// @lc code=end

// 優化
var groupAnagrams = function(strs) {
    let ans = {};

    for (let s of strs) {
        let key = s.split('').sort().join('');
        if (!ans[key]) {
            ans[key] = [];
        }
        ans[key].push(s);
    }

    return Object.values(ans);    
};

/**
 * 利用function transfer(str) {Array.from(str).sort().toString()}讓所有anagrams都能轉換成完全相同的字串
 * 建立const res = [strs[0]]; 和const transferredStrs = [[transfer(strs[0])]];
 * 逐個檢查剩餘的strs transfer後有沒有和transferredStrs裡的字串相等，有就根據index推進res，沒有就推新的陣列到res和transferredStrs
 * [解對了]
 * 
 * [看答案] 邏輯跟我想的一樣，只是寫得更優雅
 * [自己嘗試寫一次答案的寫法]
 */