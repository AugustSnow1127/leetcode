/*
 * @lc app=leetcode id=100 lang=javascript
 *
 * [100] Same Tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // 邊界
    if (!p && !q) return true;
    if (!p || !q) return false; // 若其中一個點存在，另一個點不存在，則false
    if (p && q && p.val !== q.val) return false; // 若點都存在但值不相同，false

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
// @lc code=end

/**
 * 要判斷是否一樣，非得要兩顆tree都遍歷過才能知道
 * 用DFS或BFS都行，只是要怎麼兩顆同時遍歷
 * 
 * DFS:
 * 整棵樹都相等代表子樹也是相等的 -> 可以直接把isSameTree當成dfs function
 */