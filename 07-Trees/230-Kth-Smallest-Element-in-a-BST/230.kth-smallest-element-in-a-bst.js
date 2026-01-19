/*
 * @lc app=leetcode id=230 lang=javascript
 *
 * [230] Kth Smallest Element in a BST
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    const arr = [];

    const dfs = function(node) {
        if (!node) return;
        if (arr.length > k) return; // 節省效能

        dfs(node.left);
        arr.push(node.val);
        dfs(node.right);
    }

    dfs(root);
    return arr[k-1];
};
// @lc code=end

/**
 * 第一想法，維護k個節點的minHeap
 * 不過BST不會一直動態更新，好像還不需要用到Heap?
 * 
 * 根據BST的特性，由小到大的順序，就是從最左下的節點開始數
 * 
 * Q1. k要怎麼拿來利用?
 * 
 * [AI引導]如果我想要把整棵二元樹的所有數字，從小到大排成一列印出來。 你覺得用哪一種走訪順序 (Traversal Order) 最自然？ （DFS 有三種：Pre-order, In-order, Post-order）
 * 
 * 大概懂了，要把BST轉換成普通的陣列，這樣就可以取arr[k - 1]
 * 如果使用in-order dfs，就能按照BST的大小順序印出結果
 */