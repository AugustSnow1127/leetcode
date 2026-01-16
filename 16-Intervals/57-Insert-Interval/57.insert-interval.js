/*
 * @lc app=leetcode id=57 lang=javascript
 *
 * [57] Insert Interval
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    // [看解答] 要分開處理前中後段
    const result = [];

    // 處理前段，end的數字會 < newInterval[0]
    let i = 0;
    while (i < intervals.length // 確保邊界
        && intervals[i][1] < newInterval[0]
    ) {
        result.push(intervals[i]);
        i++;
    }

    // 處理中段，找到start的數字 <= newInterval[1]，代表overlap出現在i的陣列中
    // 
    while (i < intervals.length // 確保邊界
        && intervals[i][0] <= newInterval[1]
    ) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }

    result.push(newInterval);

    // 把剩下的interval直接推進去
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
};
// @lc code=end

/**
 * 思考
 * 1. 思考overlap的定義
 *  第一個有overlap的值會 <= newInterval的start
 *  第二個有overlap的值會 >= newInterval的end
 * 2. 直接遍歷interval應該太慢，要從中間開始找(binary search)
 * 也就是說，這是binary search的延伸題目，要找出 第一個>=start的值 和 第一個<=end 的值
 * [AI 引導]
 * 你的思路分析：
1. "找出第一个>=start的值" - 这个想法是合理的，能帮你快速定位可能重叠的起始位置
2. "第一个<=end的值" - 这里需要再想想，这个表述准确吗？
引导思考：
你没有想错，但需要考虑完整的时间复杂度：
你的想法在部分情况下是对的，但有一个关键问题：
思考题：
假设：
intervals = [[1,3], [4,6], [7,9], [10,12], [13,15]]
newInterval = [2,14]  // 重叠了几乎所有区间
即使你用binary search O(log n)找到了插入位置：
1. 你需要合并多少个区间？
2. 合并这些区间的总时间复杂度是多少？
你的binary search思路的问题：
- 找位置：O(log n) ✓
- 合并所有重叠区间：最坏情况 O(n) ⚠️
- 总时间复杂度：仍然是O(n)
真正的问题：
- 用binary search确实能减少一些不重叠区间的遍历
- 但为了这点优化，代码复杂度增加不少
- O(n) vs O(log n) + O(n) = O(n)
思考：
对于这类算法题，什么情况下值得用更复杂的binary search？什么情况下简单的O(n)遍历就够用？
提示：考虑数据规模和实际应用场景。

**问题1：**
假设你有这样一个数组：
```
intervals = [[1,2], [3,4], [5,6], [7,8], [9,10]]
newInterval = [4,7]
```

你观察这些interval，它们可以被分成几类？每一类有什么特征？

**问题2：**
对于上面的例子，哪些interval是"肯定不需要处理的"？哪些是"需要合并的"？哪些是"直接可以放的"？

**问题3：**
如果你要写一个循环来处理这个，你的循环变量什么时候停止向左？什么时候开始向右？什么时候又应该把新的interval插进去？

**问题4：**
在合并重叠区间时，新的interval的start应该是多少？新的interval的end应该是多少？这些值从哪里来？

**问题5：**
当你处理完重叠部分后，还需要处理什么？


 * [看README] 大概懂了，問題是出在我沒有認真計算時間複雜度。如果先用binary search(O(log n))找到應該合併的左側和右側index
   最後還是要花O(n)來整理最後的陣列，總共是O(n * log n)
   但如果是直接遍歷，由於interval已經排序好了，所以只要用O(n)遍歷，找到"應合併左側"和"應合併右側"就能組出完整的overlap陣列

 * [過了幾天] 重新思考一次
   1. 要從左到右遍歷
   2. 一次放一個數進去陣列

 * [看別人的解答]
    1. 他們用3個while分別處理前、中(需要插入)、後段
---

 */