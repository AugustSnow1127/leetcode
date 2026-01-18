/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
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
var maxDepth = function(root) {
    if (!root) return 0;

    let maxStep = 0;

    const dfs = function(node, step) {
        step++;
        maxStep = Math.max(maxStep, step);

        if (node.left) dfs(node.left, step);
        if (node.right) dfs(node.right, step);
    }

    dfs(root, 0);

    return maxStep;
};

// 嘗試用BFS做做看
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;

    let queue = [root];
    let step = 0;

    while (queue.length > 0) {
        const size = queue.length; // 因為只要處理該層的node數量，所以先取得該層的size
        for (let i = 0; i < size; i++) {
            const {left, right} = queue.shift();
            if (left) queue.push(left);
            if (right) queue.push(right);
        }

        step++;
    }

    return step;
};

// @lc code=end

/**
 * 應該DFS走到最底，計算步數就行了
 * 
 * 嘗試用BFS做做看
 * [AI引導]想像一下你站在樹的根節點 (Root)，這是第 1 層。 接著你看遍了根節點的所有孩子，這是第 2 層。 再接著看所有孫子輩，這是第 3 層... 以此類推，直到沒有下一層為止。
 * 為了要這樣「一層一層」推進，我們需要一個地方暫存「目前這一層」的節點，然後再去把它們的孩子找出來放到後面。
 * 思考題 1： 在實作典型的 BFS 時，我們通常會使用哪一種資料結構來保存節點，以確保我們是依照「先進先出」的順序來處理它們？
 * 
 * 照AI的說法，應該要有一個queue暫存"目前正在查看的節點"
 * 看完之後沒問題，depth就要+1
 * 
 * 思考題 2： 在 while queue is not empty 的迴圈一開始，我們要如何知道「現在在 Queue 裡面的這群節點，也僅僅是這群節點」就是當前這一整層的所有成員呢？
 * 
 * 所以邏輯應該是queue裡面放"某一層的所有節點"，只要queue裡面"還有"節點，就代表還沒有走完
 * while要判斷的是: 還需不需要放下一層的節點進去queue
 */