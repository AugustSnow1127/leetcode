/**
 * const { MaxPriorityQueue } = require('datastructures-js/priority-queue);
 */

/*
 * @lc app=leetcode id=1046 lang=javascript
 *
 * [1046] Last Stone Weight
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    // 先建立Heap
    const maxHeap = new MaxPriorityQueue();
    // 把所有石頭放入Heap
    for (let stone of stones) {
        maxHeap.enqueue(stone);
    }

    // 取出兩顆最大石頭相減，並持續到Heap只剩下0或1個石頭
    while (maxHeap.size() > 1) {
        const b1 = maxHeap.dequeue().element;
        const b2 = maxHeap.dequeue().element;

        if (b1 - b2 !== 0) maxHeap.enqueue(b1 - b2);
    }

    return maxHeap.size() ? maxHeap.front().element : 0
};
// @lc code=end

/**
 * 這個題目涉及 1. 從陣列中"多次"找出最大值 和2. 陣列會不斷變化的特性
 * 所以應該使用maxHeap來優化檢索效率
 * 
 * 1. 需要一個maxHeap，用js庫的MaxPriorityQueue
 * 2. 把最大的兩個數取出來，相減後，不為0則放回Heap
 * 3. 重複做這個動作直到剩下0 or 1個節點
 * 
 * [解答正確後的思考]
 * solution是用陣列排序的方式，雖然O(n^2 * log n)，但由於題目給的限制是1 <= stones.length <= 30
 * 所以用sorting的速度其實會比heap快
 * 也許之後會遇到這種"殺雞焉用牛刀(heap)"的情況，要多注意
 */