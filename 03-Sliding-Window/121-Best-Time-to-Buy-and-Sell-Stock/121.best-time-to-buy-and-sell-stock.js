/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let min = prices[0];
    let left = 1; // 從1開始，因為prices[0]跟prices[0]比較沒意義
    let maxProfit = 0;

    while (left < prices.length) {
        // 先更新min value
        min = Math.min(min, prices[left]);

        // 比較利潤
        maxProfit = Math.max(prices[left] - min, maxProfit);

        left++;
    }
    return maxProfit;
};
// @lc code=end

/**
 * 思考
 * 1. 買的日期一定 < 賣的日期，所以是"有序"的概念，換句話說要找到最小的left和最大的right
 * 2. 我需要two pointer從左邊找最小值，和從右邊找最大值，直到pt交會
 * 3. 2的思路錯了，如果是two pointer，左右指針只會走到中間就停下來，那如果最大利潤發生在陣列的左半邊或右半邊就不會檢查到
 * 4. [AI引導]
 *  思考問題1：
    我們需要找到某一天買入和某一天賣出，使得利潤最大。

    假設我們從左到右遍歷數組（第一天、第二天、第三天...），當我們處理到第 i 天時：

    我們已經知道前 i-1 天的價格
    我們還不知道 i 天之後的價格
    問題：在第 i 天，如果我們想賣出，那麼最優的買入點應該在哪裡？

    思考問題2：
    如果我們在遍歷過程中，能夠記錄某個資訊，這樣在每個第 i 天，都能立即算出「如果在第 i 天賣出，最大利潤是多少」。

    問題：這個資訊是什麼？

    思考問題3：
    整個演算法需要幾次遍歷？一次？還是多次？還是兩個指針？

    試著回答這三個問題！
 * 5. 大概懂了，我只需要一個ptr從左邊出發，並且做兩件事，一是要找出走到目前為止的最小值，二是要找出目前的值和最小值的利潤
    這樣只要O(N)就能找出最大利潤
 */