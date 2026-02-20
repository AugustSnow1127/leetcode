/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const ans = new Array(nums.length).fill(1);

    // 第一次遍歷，取得prefix
    for (let i = 0; i < nums.length; i++) {
        ans[i] =(ans[i - 1] ?? 1) * (nums[i - 1] ?? 1);
    }

    // 第二次遍歷，取得suffix
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        suffix = suffix * (nums[i + 1] ?? 1);
        ans[i] = ans[i] * suffix;
    }

    return ans;
};
// @lc code=end

// 更簡潔的寫法
var productExceptSelf = function(nums) {
    const output = Array(nums.length).fill(1);

    let left = 1;
    for (let i = 0; i < nums.length; i++) {
        output[i] *= left;
        left *= nums[i];
    }

    let right = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        output[i] *= right;
        right *= nums[i];
    }

    return output;    
};

/**
 * answer[i]要取得每個自己以外的乘積
 * 且限制要在O(n)，還有不能用除法
 * 
 * [leetcode提示] 想想怎麼處理前綴和後綴
 * 
 * 如果要在不浪費空間的情況下儲存前綴，應該要把前綴的乘積存在answer[]裡
 * 
 * 把每個 answer[i] 拆成 i 左邊的所有元素 和 i 右邊的所有元素：

 * answer[0] =  1 * (b * c * d)
 * answer[1] = (a) * (c * d)
 * answer[2] = (a * b) * (d)
 * answer[3] = (a * b * c) * 1
 * 
 * [有想到要遍歷兩次，但不知道為什麼腦袋超卡想不出來，可能太久沒練, 或是對array很不熟]
 */