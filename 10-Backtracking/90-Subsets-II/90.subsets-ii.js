/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    // [看著解答寫一遍]
    nums.sort((a,b) => a - b);
    const res = [];
    const subset = [];

    const bt = function(i) {
        if (i === nums.length) {
            res.push([...subset]);
            return;
        }

        subset.push(nums[i]);
        bt(i + 1);
        subset.pop();

        // 跳過重複的數字
        while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
            i++;
        }

        bt(i + 1);
    }
    bt(0);

    return res;
};
// @lc code=end

/**
 * 上一題是用決策樹的形式，透過"選"和"不選"建立出二元決策樹
 * 
 * 這次會遇到的問題是數字有重複，所以會導致set有重複
 * 顯然不能用"挑選"的
 * 
 * 也許可以移動雙指針start, end
 * 用來作為slice的左右邊界
 * 用for迴圈移動start指針，再用DFS移動end
 * 移動end之後，如果end !== for迴圈的i，就要倒退回來
 * [不對，畫圖之後就知道行不通]
 * 
 * [AI引導]
 * 思考關鍵：重複的元素怎麼辦？

假設輸入是 [1, 2, 2]。

如果我們用最傳統的「Pick or Leave (選或不選)」策略：

第一個 2:

選它 -> [1, 2]
不選 -> [1]
第二個 2:

如果前面選了第一個 2 -> 再選第二個 2 -> [1, 2, 2] (OK)
如果前面不選第一個 2 -> 再選第二個 2 -> [1, 2] (重複了！)
觀察規律： 我們發現，如果當前的數字(第二個2) 跟前面的數字(第一個2) 長得一樣。 且前面的數字 「沒有被選到 (Leave)」 的話。 那現在這個數字也 「絕對不能選」。 因為如果前面不選但我選，就會創造出跟「前面選但我現在不選」一模一樣的重複組合。

這就是 Backtracking 中最經典的去重邏輯：

Sort: 先排序，把一樣的數字排在一起。
Skip: 如果 nums[i] == nums[i-1] 且 i 是這層決策的第一個選擇之後（代表前一個相同的 loop 已經處理過這種情況了），就 continue 跳過。
或者用 Pick/Leave 的思維： 「如果不選這個 2，那後面所有長得像 2 的兄弟，我這次全部都要跳過不選。」

你可以試著畫一下決策樹，特別標記出哪邊會產生重複的 [1, 2]。

 * 換句話說，只要排序之後，讓相同數字的subset在同一個樹處理
 */