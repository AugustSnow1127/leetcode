/*
 * @lc app=leetcode id=128 lang=javascript
 *
 * [128] Longest Consecutive Sequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    const countedSet = new Set();
    let maxSeqLength = 0;

    // 向+-1查找數字
    function findNum(num, addNum) {
        if (!set.has(num)) return 0;

        countedSet.add(num);
        return 1 + findNum(num + addNum, addNum);
    }
    
    for (let n of nums) {
        // 數過了就跳過
        if (countedSet.has(n)) continue;

        let temp = 0;
        countedSet.add(n);

        temp = 1 + findNum(n + 1, 1) + findNum(n - 1, -1);
        maxSeqLength = Math.max(maxSeqLength, temp);
    }

    return maxSeqLength;
};

// 優化
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let max = 0;

    for (let n of set) {
        if (set.has(n - 1)) continue;

        let length = 1
        while (set.has(n + length)) {
            length++;
        }

        max = Math.max(max, length);
    }

    return max;
};
// @lc code=end

/**
 * 要找出最長的連續數組
 * 要一個存最長的array
 * 一個暫存array
 * [AI引導] 建議我先找到連續序列的頭，再需要一個快速查找的機制，來連續找x+1
 * 
 * 我不知道怎麼找序列的頭
 * 但我覺得可以先把nums存入Set，用while遍歷
 * 遍歷的過程中找x-1和x+1，如果有就把最大長度+1，並把找到的數字從set中拿掉
 * 
 * [優化]
 * 只找出序列最小值，再數連續數列有幾個
 */