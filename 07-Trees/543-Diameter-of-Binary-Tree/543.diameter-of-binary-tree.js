/*
 * @lc app=leetcode id=543 lang=javascript
 *
 * [543] Diameter of Binary Tree
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
var diameterOfBinaryTree = function(root) {
    if (!root) return 0;

    const findDiameter = function(root) {
        if (!root) return 0;

        const dfs = function(node, step = 0) {
            if (!node) return step;
            step++;
            return Math.max(dfs(node.left, step), dfs(node.right, step))
        }

        return dfs(root.left) + dfs(root.right);
    };

    return Math.max(findDiameter(root), diameterOfBinaryTree(root.left), diameterOfBinaryTree(root.right));
};

// [看解答後自己寫一次]
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let step = 0;

    const dfs = function(node) {
        if (!node) return 0;

        let left = dfs(node.left);
        let right = dfs(node.right);

        step = Math.max(step, left + right);

        return 1 + Math.max(left, right);
    }

    dfs(root);
    return step;
};
// @lc code=end

/**
 * 這題要求的是，左節點最底部的 層數-1 + 右節點最底部的層數-1
 * 所以只要左DFS + 右DFS
 * 
 * [錯誤 -> AI引導]: 你的思路對了 一半。
你提到的公式： 左邊深度 + 右邊深度，確實算出了 「如果有穿過當前這個 root 節點」 的最長路徑。
但請試著想像一種情況： 如果這棵樹長得很「歪」，根節點的左邊只有 1 個點，但右邊有一坨非常龐大、分岔很多的子樹。
思考題： 這棵樹真正的「最長路徑 (Diameter)」，一定要經過最上面的那個 root 嗎？有沒有可能這條最長路徑完全藏在右邊的某個子樹裡面，形成一個倒 V 字型，但碰不到最上面的頭？
如果存在這種情況，那你只算最上面的 左+右 還夠嗎？需不需要對每一個節點都做一次同樣的判斷？

    [修正] 把dfs改成算出單個node作為root的diameter length
    再用diameterOfBinaryTree作為dfs func，求出每一個node的diameter length

    [看解答後自己寫一次]
    
    [檢討]
    自己好像還不太熟悉邊dfs邊算步數，都會需要再let step當參數，但這樣其實很浪費空間
    還有有時候對dfs還是有點卡住，想像不太出來dfs怎麼寫，但其實自己已經知道找出答案的邏輯是什麼
    要多熟悉dfs怎用
 */