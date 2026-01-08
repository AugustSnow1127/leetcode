/*
 * @lc app=leetcode id=704 lang=javascript
 *
 * [704] Binary Search
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // [修正錯誤2]
    if (nums.length === 1) return nums[0] === target ? 0 : -1;
    
    let leftIdx = 0;
    let rightIdx = nums.length - 1;
    
    // left 和 right 會一直靠近彼此，直到完全一樣
    // [錯誤3] 檢查最後的數字是否等於target
    while (leftIdx <= rightIdx) {
        const midIdx = Math.floor((leftIdx + rightIdx) / 2);

        if (nums[midIdx] === target) return midIdx;

        // 如果 target 在 mid 的右邊
        if (nums[midIdx] < target) {
            // [修正錯誤1]
            leftIdx = midIdx + 1;
        } else {
            // [修正錯誤1]
            rightIdx = midIdx - 1;
        }
    }

    return -1;
};
// @lc code=end

/**
 * 思考
 * 1. [AI引導]
 * 思考問題1：暴力解法
    如果不用考慮時間複雜度，你會怎麼找目標值？

    思考問題2：O(log n) 的含義
    題目要求 O(log n) 的時間複雜度。

    思考：

    O(n) 是遍歷整個數組
    O(log n) 的含義是什麼？每次操作後，搜索範圍會縮減多少？
    思考問題3：題目給的條件
    題目特別說明數組是 sorted in ascending order（升序排序）。

    思考：

    這個「有序」的條件給了我們什麼額外資訊？
    如果數組是有序的，我們能不能利用這個特性來「縮小搜索範圍」？
    思考問題4：
    想像你在玩「猜數字」遊戲：

    我心裡想一個 1-100 的數字
    你可以猜，我會告訴你「太大」、「太小」或「猜對」
    最優策略是什麼？
    這個遊戲跟二分搜索有什麼關係？

    試著回答這些問題，你應該就能找到方向了！
 * 2. 一開始是想到直接用findIndex不就能找到了嗎。但是需要用O(n)，這樣當n變大時效率會變差
 * 3. 數組是有序的，代表如果從"中間"找，不是在左邊就是右邊。換句話說可以透過不斷把數列"二分"，來縮短O(n)成O(log n)
 * 4. 用除以2和Math.floor來找出中間的idx
 * 5. [錯誤1] time limit exceed: 在判斷target在左右兩邊後，midIndex應該要+1或-1。如果把mid也包含在左右兩邊，會出現重複比對導致死循環
 * 6. [錯誤2] 應處理陣列等於一個值的情況
 * 7. [錯誤3] leftIdx === right[idx]之後還要再檢查一次
*/