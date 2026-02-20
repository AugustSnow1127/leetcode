/*
 * @lc app=leetcode id=424 lang=javascript
 *
 * [424] Longest Repeating Character Replacement
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    let left = right = max = res = 0;
    const map = new Map();

    while(right < s.length) {
        const n = map.get(s[right]) || 0;
        map.set(s[right], n + 1);
        max = Math.max(max, n + 1);

        // 如果符合窗口條件，移動right，不符合就移動窗口
        if ((right - left + 1) - max > k) {
            map.set(s[left], map.get(s[left]) - 1);
            left++;
        }
        right++;

        // 紀錄窗口長度
        res = Math.max(res, right - left);
    }

    return res;
};
// @lc code=end

/**
 * 可以替換任意字母k次，替換後找到最長的連續字串
 * 如果要用sliding window的作法
 * 應該是right向右移動，檢查是否和left所在的字母一樣，並且可以容忍k次不一樣
 * 需要紀錄第一個不重複的值的位置，如果right的容忍值歸零的時候，把左指針移動到第一個不重複的位置
 * 
 * [AI引導] 思考錯誤，窗口不合法的條件是：窗口長度 - 窗口內最多次字母的出現次數 > k
 * 用這個條件重新想想。
 * 
 * 窗口長度是right - left
 * 窗口內的字母出現數: 用一個map管理
 * max紀錄出現最多字母的次數
 * 
 * 所以我要做的事情是:
 * 在while(left < right && right < s.length)裡面
 * 如果滿足窗口合法條件(窗口長度 - 窗口內最多次字母的出現次數 <= k)，就移動right，紀錄窗口內字母出現次數，和更新出現字母數最大值
 * 如果不滿足條件，則left移動，更新map裡的字母出現次數
 * 
 * [AI修正] 不應該回傳max + k，而是要回傳最大的窗口長度
 * 
 * 檢討: 對sliding window裡面的邏輯要怎麼寫還不太熟
 */