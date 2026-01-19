/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];

    const queue = [root];
    const res = [];

    while (queue.length) {
        const size = queue.length;
        res.push([]);
        for (let i = 0; i < size; i++) {
            const { val, left, right } = queue.shift();
            res[res.length - 1].push(val);
            if (left) queue.push(left);
            if (right) queue.push(right);
        }
    }

    return res;
};
// @lc code=end

/**
 * 看起來用BFS就可以
 */