/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
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
var isValidBST = function(root) {
    const dfs = function(node, min, max) {
        if (!node) return true;
        if (!(node.val > min && node.val < max)) return false;
        return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
    }

    return dfs(root, -Infinity, Infinity);
};
// @lc code=end

/**
 * 做第二遍，複習Tree的手感
 * 
 * 看起來是要檢查每個節點是否是left樹 < root < right樹
 * 且整棵樹都要符合規則，不是只檢查當下節點
 * [AI引導] 要把範圍也傳遞到子樹
 */