/*
 * @lc app=leetcode id=572 lang=javascript
 *
 * [572] Subtree of Another Tree
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    if (!root || !subRoot) return false;

    if (root && subRoot && root.val === subRoot.val) {
        return isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    
    // 找root裡的subRoot
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

const isSameTree = function(root, subRoot) {
    if (!root && !subRoot) return true;

    if (root && subRoot && root.val === subRoot.val) {
        return isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right);
    }

    return false;
}
// @lc code=end

/**
 * 這題類似is same tree，只是多了一個前置動作，要先找到相同的root的位置
 * 1. 找到相同的root，可能有多個
 * 2. 找到後用isSameTree確認
 */