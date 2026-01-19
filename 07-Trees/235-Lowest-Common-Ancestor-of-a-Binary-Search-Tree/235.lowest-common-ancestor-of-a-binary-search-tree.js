/*
 * @lc app=leetcode id=235 lang=javascript
 *
 * [235] Lowest Common Ancestor of a Binary Search Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // 確保 p <= q
    let temp = p.val < q.val ? p : q;
    q = p.val > q.val ? p : q;
    p = temp;

    // 確保p <= node <= q
    while (root.val < p.val || root.val > q.val) {
        if (root.val > q.val) root = root.left;
        else root = root.right;
    }

    return root;

};
// @lc code=end

/**
 * 題目要找兩個node的LCA(最接近的父輩(可能是node本身))
 * Q1. 怎麼知道自己節點的父輩有誰?
 * 因為演算法只能從父到子，所以我需要在走到每一個node的時候去判斷LR是否有p和q
 * 
 * Q2. 怎麼知道最近的是誰?
 * 最近代表，層數的差距卻小 -> 要知道node的層數
 * 
 * 我需要dfs可以幫我找到當前節點到p, q的層數，並在最後比較哪一個節點的層數差最小
 * 
 * Q3. 怎麼處理p, q其中一個就是LCA的情況?
 * 
 * 也許用BFS更好?
 * 檢查每一層是否包含p, q的val，若有包含，則紀錄當前層數
 * 最後每個節點要得到兩個值 -> node到p,q的距離
 * 找出有最小差值的節點就是LCA
 * 
 * 沒注意到題目給的是BST，之前沒做過BST的題型
 * [AI引導] BST的重要特性是，left tree的值都小於根節點，right tree的值都大於根節點
 * 
 * 有了BST的特性，就可以知道，只要找到 p <= root <= q的位置，root就是LCA
 */