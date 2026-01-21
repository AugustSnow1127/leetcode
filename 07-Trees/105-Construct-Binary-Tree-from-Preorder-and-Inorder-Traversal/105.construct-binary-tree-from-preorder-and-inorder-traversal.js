/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// var buildTree = function(preorder, inorder) {
//     const dfs = function(node) {
//         console.log('', );
//         if (!preorder.length || !inorder.length) return;
//         console.log('preorder', preorder);
//         console.log('inorder', inorder);
//         console.log('root', root);
//         console.log('node', node);
//         console.log('inorder', inorder);
        
//         node.val = preorder.shift();
//         // 碰到inorder[0]要停下來
//         if (node.val === inorder[0]) {
//             // inorder shift兩次
//             inorder.shift();
//             inorder.shift();
//         } else {
//             // 如果不用停下來，才要開左節點
//             node.left = new TreeNode();
//             dfs(node.left);
//         }

//         // preorder還有代表還需要向右長
//         if (preorder.length) {
//             node.right = new TreeNode();
//             dfs(node.right);
//         }
//     }

//     const root = new TreeNode();
//     dfs(root);

//     return root;
// };
// @lc code=end

// 根據AI引導，再做一次
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;

    // 根據preorder的第一個值(root)，找出root的左右兩邊分別有哪些節點
    const rootIdx = inorder.indexOf(preorder[0]);
    const leftInorder = inorder.slice(0, rootIdx);
    const rightInorder = inorder.slice(rootIdx + 1, inorder.length);

    // 根據leftInorder的長度，可以知道preorder的root左樹是哪些
    const leftPreorder = preorder.slice(1, leftInorder.length + 1);
    const rightPreorder = preorder.slice(leftInorder.length + 1, preorder.length)

    // 用in-order的方式插入值
    const root = new TreeNode(preorder[0]);
    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);

    return root;
};
// @lc code=end

/**
 * 上一題是做230-Kth-Smallest-Element-in-a-BST，第一次知道
 * preorder, inorder, postorder的dfs會導致遍歷tree的結果完全不同
 * 
 * 這一題則是要我從 preorder 和 inorder 的結果
 * "反推"tree原本的長相
 * 
 * preorder的特性是，先取得中間節點 -> 再取得左節點 -> 再取得右節點
 * inorder的特性是，先取得左節點 -> 再取得中間節點 -> 再取得右節點
 * 
 * 從example1可以看到，preorder給的線索是[3,9,20]是一棵樹，[20,15,7]是一棵樹，陣列的開頭是根節點
 * 而inorder則是從每棵樹的左下出發，[9,3]是樹的左半邊，[15,20]是樹的左半邊
 * 
 * 若想要建一顆樹，終究還是要用dfs或bfs，重點在於
 * 1. 什麼時候該停止
 * 2. 遍歷中應該怎麼塞值
 * 
 * 看起來preorder比較適合做為dfs塞值的queue，因為她的前幾項是樹的最左邊，換句話說我的dfs也會是preorder
 * 而他應該在inorder[0]的數字停下來，停下來後inorder要shift兩次(左節點跟中節點)
 * 接下來的inorder[0]就是下一次dfs要停下來的點
 * 
 * [執行錯誤，重新思考]
 * [AI引導] 用inorder shift兩次的作法不太對
 * 你無論如何只要 preorder 還有剩，就無條件會給當前節點生一個右小孩。 但事實上，很多時候當前節點（比如葉子節點）其實根本不應該有右小孩，但你強制幫它 new 了一個空殼，並且進去 dfs。

進去 dfs 後，你又嘗試 preorder.shift() 把原本屬於別人（屬於上層節點的右兄弟）的值，塞給了這個不該存在的右小孩。

核心問題： 你用 preorder.shift() 是對的（抓出根節點），但你沒有正確利用 inorder 來「切分」出誰屬於左邊，誰屬於右邊。

引導思考： 在 preorder 吐出一個值（比如 3）當作根節點後。 你去看看 inorder 陣列：[9, 3, 15, 20, 7]

3 把這串列切成了兩半：

左邊這坨 [9]：一定全都是 3 的左子樹成員。
右邊這坨 [15, 20, 7]：一定全都是 3 的右子樹成員。
有了這個資訊：

你知道 左子樹有幾個成員（這裡是 1 個）。
那你就可以告訴 preorder：「嘿，接下來的 1 個 數字，是屬於我左邊的，你去遞迴處理它們。」
再告訴 preorder：「剩下的那些數字，是屬於我右邊的，你去遞迴處理它們。」
如果不利用這個「切分範圍」的概念，只靠 inorder[0] 來判斷是否停止，會非常難處理（因為 shift 會破壞 original index 對應關係，讓你的邏輯變得極其複雜）。

試試看： 函數 buildTree 直接回傳一個 TreeNode。 它的邏輯很單純：

preorder 第一個就是 root.val。
找到這個 root.val 在 inorder 中的位置 (index)。
切出 inorder 的左半段 leftInorder 和右半段 rightInorder。
切出 preorder 的對應左半對應數量 (leftPreorder) 和右半對應數量 (rightPreorder)。
root.left = buildTree(leftPreorder, leftInorder)
root.right = buildTree(rightPreorder, rightInorder)
回傳 root。
這樣寫雖然空間不是最省（因為一直切陣列），但邏輯最清晰，也最容易寫對。

 * 也就是說，preorder是用來塞值，inorder可以幫忙判斷當前node的左子樹和右子樹有什麼值
 * 透過不斷地取得新的樹的左右邊界，就能逐漸把完整的樹拼出來
 * 
 * 
 * 檢討:
 * 這題感覺說難滿難的，但好像也沒有到想不到的地步
 * 如果非常熟悉preorder和inorder的陣列結構應該就解的出來
 * 主要是前面的思考搞錯兩件事
 * 1. 應該用in-order插值，而不是用pre-order
 * 2. 對於dfs的參數應該放什麼還是覺得有點抽象，主要還是要掌握dfs的本質就是重複執行的DP
 * 所以不管怎樣一定要"先找到微觀部位的通則，再遞迴擴展"，既然可以從root就判斷左右子樹，代表接下來的節點也都可以這麼做
 * 以此來判斷最底層的值要怎麼放
 */