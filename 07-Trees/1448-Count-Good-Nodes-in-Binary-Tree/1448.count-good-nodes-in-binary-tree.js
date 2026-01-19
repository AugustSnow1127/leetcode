/*
 * @lc app=leetcode id=1448 lang=javascript
 *
 * [1448] Count Good Nodes in Binary Tree
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
var goodNodes = function(root) {
    let res = 0;

    const dfs = function(node, max) {
        if (!node) return;

        if (node.val >= max) res++;

        max = Math.max(node.val, max);

        if (node.left) dfs(node.left, max);
        if (node.right) dfs(node.right, max);
    }

    dfs(root, root.val);

    return res;
};
// @lc code=end

/**
 * 用dfs，確保最後一個值是最大值就+1
 */