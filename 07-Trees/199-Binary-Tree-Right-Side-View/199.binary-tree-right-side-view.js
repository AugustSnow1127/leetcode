/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) return [];

    const queue = [root];
    const res = [];

    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const { val, left, right } = queue.shift();
            if (i === size - 1) res.push(val);
            if (left) queue.push(left);
            if (right) queue.push(right);
        }
    }

    return res;
};
// @lc code=end

/**
 * 只要用BFS，找到每一層的最後一個值就好
 */
