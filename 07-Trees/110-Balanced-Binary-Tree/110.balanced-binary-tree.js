/*
 * @lc app=leetcode id=110 lang=javascript
 *
 * [110] Balanced Binary Tree
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
 * @return {boolean}
 */
var isBalanced = function(root) {
    let isBal = true;

    // dfs用來計算root為node的時候的深度
    const dfs = function(node) {
        if (!node) return 0;

        // 需要知道left tree的高度和right tree的高度，用dfs
        let l = dfs(node.left);
        let r = dfs(node.right);
        // 每次走到某一個node，就順便算如果當前的node是root，他的左右深度是否balanced
        isBal = isBal && Math.abs(l - r) <= 1;

        // 每走一步就 + 1
        // Math.max(l, r)代表樹的深度
        return 1 + Math.max(l, r);
    }

    dfs(root);
    return isBal;
};
// @lc code=end

/**
 * Height-balanced（高度平衡）的定義是：
對於這棵樹中的每一個節點： 它的左子樹的高度和右子樹的高度，相差不能超過 1。
只要有一個節點違反這個規定（例如左邊高度 3，右邊高度 1，相差 2），整棵樹就不算 Balanced。

 * 這題算是DFS延伸應用
 * 和上一題做的543-Diameter-of-Binary-Tree有點類似，只是把l+r變成判斷l和r的差是否小於1
 */
