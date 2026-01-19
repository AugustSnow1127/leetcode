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
    // 以subRoot為根節點的樹的值全都要小於currRoot
    const checkLower = function(currRoot, subRoot) {
        if (!subRoot) return true;

        return subRoot.val < currRoot.val && checkLower(currRoot, subRoot.left) && checkLower(currRoot, subRoot.right);
    }

    // 以subRoot為根節點的樹的值全都要大於currRoot
    const checkHigher = function(currRoot, subRoot) {
        if (!subRoot) return true;

        return subRoot.val > currRoot.val && checkHigher(currRoot, subRoot.left) && checkHigher(currRoot, subRoot.right);
    }

    // dfs遍歷整棵樹，遍歷時檢查左子樹 < node < 右子樹
    const dfs = function(node) {
        if (!node || (!node.left && !node.right)) return true;

        return checkLower(node, node.left) && checkHigher(node, node.right)
        && dfs(node.left) && dfs(node.right);
    }

    return dfs(root);
};

// 優化
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    const dfs = function(node, min = -Infinity, max = Infinity) {
        if (!node) return true;

        if (!(min < node.val && node.val < max)) return false;

        return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
    }
    return dfs(root);
};
// @lc code=end

/**
 * BST的定義，所有節點都符合 左節點 < 根節點 < 右節點
 * 所以只要遍歷一次tree，確認都符合這個條件即可
 * 
 * [思考錯了] 不是左右節點，而是整顆左子樹都要 < 根節點 < 右子樹
 * Q1. 只比較左右節點很簡單，但要確保整棵樹都大於或小於根節點該怎麼做?
 * A1. 不是確認 左節點 < 根節點 < 右節點，而是確認 dfs(左節點) < 根節點 < dfs(右節點)
 * 
 * [優化][AI引導] 應該在dfs的時候，傳遞需要檢查的"上下限"
 * 也就是說，不是在當前節點比較左右節點是否符合規則
 * 而是到左/右節點時候，檢查自己有沒有小於/大於父節點
 */