/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // [錯誤1修正]
    if (s.length < 2) return false;

    const leftPar = ['(', '{', '['];
    const rightParMap = {
        ')': '(',
        '}': '{',
        ']': '[',
    };
    const stack = [];
    
    for (let i = 0; i < s.length; i++) {
        // 如果是左括號則放入stack
        if (leftPar.includes(s[i])) {
            stack.push(s[i]);
        }
        // 如果是右括號，則檢查stack的最後是不是對應的左括號
        else {
            if (stack[stack.length - 1] !== rightParMap[s[i]]) return false;
            stack.pop();
        }
    }

    // [錯誤2修正]
    return stack.length === 0;
};
// @lc code=end

/**
 * 思考
 * 1. 需要找到每個括號是否有對應，和217題應該是類似的概念，只是從找重複改成找是否有對應的值
 * 2. 需要一個陣列(stack)紀錄左括號，一個json定義左括號對應的右括號
 * 3. 左指針從左邊開始往右找，如果遇到左括號則放入stack，如果遇到右括號則檢查stack的最後一個字母是否為對應的左括號
 * 4. [錯誤1] 沒有檢查陣列只有一個值的情況
 * 5. [錯誤2] 要完全對應的話，最後的stack不應該有值
 */