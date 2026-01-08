/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    // [修正錯誤2] 可能走到沒有節點狀況
    // [修正錯誤3] 節點可能不對稱，有左邊但沒右邊
    if (root && (root.left || root.right)) {
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        invertTree(root.left);
        invertTree(root.right);
    }

    return root;
};

// @lc code=end

/**
 * 思考
 * 1. tree看起來就是linked list的變形
 * 2. [AI引導]
問題1：翻轉的操作是什麼？
對於一個節點，你要做什麼操作才能「翻轉」它？

問題2：翻轉的順序？
如果你有這個樹：

     4
   /   \
  2     7
 / \
1   3
你應該：

先翻轉節點 4（根節點）？
還是先翻轉節點 2（子節點）？
還是兩者都可以？
問題3：這跟翻轉 Linked List 有什麼相似之處？
Linked List 反轉：改變每個節點的 next 指針 Binary Tree 翻轉：改變每個節點的 left 和 right 指針

有什麼相似的地方？有什麼不同的地方？

問題4：如何遍歷整個樹？
你需要訪問樹的每一個節點，然後對每個節點做什麼操作？

常用的樹遍歷方式有：

DFS（深度優先）：前序、中序、後序
BFS（廣度優先）：層序遍歷
哪種方式適合這個題目？
 * 3. 先思考"翻轉"是什麼意思 -> 意思是第一層this.left和this.right互換，接著第二層的左右互換，以此類推
 * 換句話說這應該是一個BFS問題，從上到下層層把左右節點交換
 * 4. 既然要交換，就會跟206題一樣，需要一個暫存節點來儲存待交換的node
 * 5. [錯誤1] 用了遞迴就不用再使用while
 * 6. [錯誤2] 沒有檢查root和其節點是否存在
 * 7. [錯誤3] b tree可能不對稱，所以要考慮只有左節點或右節點的情況
 */