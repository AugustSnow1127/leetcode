/*
 * @lc app=leetcode id=297 lang=javascript
 *
 * [297] Serialize and Deserialize Binary Tree
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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) return '';

    const q = [root];
    const arr = [];

    while(!q.every((n) => n === null)) {
        const size = q.length;
        
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            
            if (!node) {
                arr.push(null);
                continue;
            }
            
            arr.push(node.val);
            q.push(node.left);
            q.push(node.right);
        }
    }
    
    return arr.toString();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (!data.length) return null;

    const arr = data.split(',');
    let root = new TreeNode(getVal(arr.shift()));
    let q = [root];
    
    // arr [ '2', '3', '', '', '4', '5' ]
    while (arr.length) {
        const node = q.shift();

        // 處理node.left
        let val = getVal(arr.shift());
        if (val !== null) {
            node.left = new TreeNode(val);
            q.push(node.left);
        }

        // 如果arr沒值了就不用繼續處理node.right
        if (!arr.length) break;

        // 處理node.right
        val = getVal(arr.shift());
        if (val !== null) {
            node.right = new TreeNode(val);
            q.push(node.right);
        }
    }

    return root;
};

const getVal = function(str) {
    return str === '' ? null : Number(str);
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

/**
 * 直覺想到的是把inorder和preorder array重建成tree的那一題
 * 但這樣效率似乎太差
 * 
 * 看了leetcode自己的how LeetCode serializes a binary tree.
 * 平常題目給的tree都是用bfs遍歷tree所呈現的陣列
 * 確實是個非常簡單易懂的方法
 * serialize用bfs取得字串
 * deserialize用preorder dfs就能還原
 * [思考錯誤] deserialize也應該用bfs
 * 
 * 也許還有其他方法，但總之先用這個方法解題
 * 
 * [修正] 一開始deserialize用dfs是錯的，改成bfs
 * [有點不太知道怎麼用bfs建樹，AI引導]
 * BFS Deserialize 的邏輯：

建立 root ( array[0] )，塞進 Queue。
While Queue 不空：
拿出一個父節點 parent。
shift 一個值給左小孩，如果不是 null 就 new 出來掛上去，並把左小孩推進 Queue。
shift 一個值給右小孩，如果不是 null 就 new 出來掛上去，並把右小孩推進 Queue。

 * 檢討
 * 從頭建TreeNode的寫法還不熟悉
 * 應該不用寫getVal，可以優化
 * serialize bfs多計算了一短都是null的情況
 * 用dfs才是最快的，下一次應練習dfs的寫法
 */