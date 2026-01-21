/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    let max = root.val;

    const dfs = function(node) {
        if (!node) return 0;

        let l = Math.max(0, dfs(node.left)); // 左樹的和
        let r = Math.max(0, dfs(node.right)); // 右樹的和

        // 在遍歷的過程中，紀錄當前node能取得的path的最大值
        max = Math.max(max, node.val + l + r);
        
        // dfs要選擇較大的左樹或右樹，並加回自己
        return node.val + Math.max(l, r);
    }

    dfs(root);
    return max;
};
// @lc code=end

/**
 * 這題給我感覺跟[53] Maximum Subarray很像
 * 只是換成樹的形式
 * [AI說明] 53題的核心精神是：「如果前面的累積和是負的，我就把它拋棄，從我自己重新開始算；如果是正的，我就繼續累積。」
 * 
 * 最大的限制就是path要是"一直線"，換句話說走過的路不能回頭
 * 也許是節點的左樹 + 右樹 = 一直線，所以要找左樹最大值 + 右樹最大值
 * 
 * 如果用pre-order把BT變成陣列，也許就變成53題了?
 * 
 * [AI提示] 這題是Diameter of Binary Tree (543)的孿生題型
 * 
 * 換句話說，要在每個節點，找出最大左樹和最大右樹 + 自己
 * 
 * [中間寫得有點錯，請AI提示怎麼改]
 * 
 * 檢討
 * 首先沒注意到跟543題一樣有點可惜，不過一部分是因為當初543題也沒解出來
 * 所以很難聯想，但這題確實就是543 + 53題的綜合題型
 * 解完這題後開始對dfs到底該怎麼思考有些概念了，重點在於能不能找到微觀的Tree的規則
 * 找到規則後再規模化(dfs)到整棵樹，基本上答案就出來了
 */