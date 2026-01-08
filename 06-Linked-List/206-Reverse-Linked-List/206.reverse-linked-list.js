/*
 * @lc app=leetcode id=206 lang=javascript
 *
 * [206] Reverse Linked List
 */

// // @lc code=start
// /**
//  * Definition for singly-linked list.
//  * function ListNode(val, next) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.next = (next===undefined ? null : next)
//  * }
//  */
// /**
//  * @param {ListNode} head
//  * @return {ListNode}
//  */
// var reverseList = function(head) {
//     while (head.next) {
//         // 把下一個值的指針指到自己
//         head.next.next = head;
//         head = head.next;
//     }
//     return head;
// };
// // @lc code=end

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let current = head;
    let next;

    while (current) {
        next = current.next;
        current.next = prev; // 倒轉
        prev = current;
        current = next;
    }
    return prev;
};

// @lc code=end

/**
 * 思考
 * 1. 既然linked list只有next指針的功能，那直覺的想法是從1開始，到下一個節點的時候，就把往3的next指針指到1，以此類推
 * 2. [錯誤1] 1想錯了，如果把node2指到自己，那就走不到node3。
 * [AI引導]: 
 * 問題1：畫出每一步的狀態
原鏈表：1 → 2 → 3 → null

第一輪循環（head = node1）：

head.next.next = head;  // node2.next = node1
思考：

這一行後，node1.next 還是 node2 嗎？
現在 node2.next 指向 node1
鏈表變成什麼樣子？（提示：會形成循環）
畫出來：? ? ?
問題2：你改變了指針，但也改變了原本的結構
head.next.next = head;
head = head.next;
思考：

當 head.next.next = head 執行後，原來 node2.next 指向誰就丟失了
你現在沒辦法再找到 node3 了嗎？
為什麼？因為 node2.next 現在指向 node1
問題3：你需要追蹤幾個節點？
在反轉過程中，你同時需要知道：

當前節點（head）
下一個節點（head.next）
前一個節點（需要新的變數）
思考：

在改變指針之前，要不要先保存 head.next？
不然改了之後，要怎麼繼續往後走？
還有，要記錄前一個節點，不然下一個節點怎麼知道要指回去哪裡？
問題4：三個指針分別是什麼？
試著設計三個變數：

prev：前一個節點（初始是 null）
current：當前節點（初始是 head）
next：下一個節點（用來保存暫時的下一個位置）
思考：

在每次循環中，這三個指針應該如何更新？
先用 next 保存 current.next，然後改變指標，再移動三個指針？
試著用三個指針重新設計邏輯！
 * 2. 在將node2指到node1之前，應該要儲存node2的下一個node，這樣就能在倒轉節點後，仍能知道node3是誰
 * 3. 然後還需要暫存prev，這樣第一個node才有辦法指到null
 * 4. [錯誤] 結果是我想太複雜，應該只要有了prev跟next節點，就能知道前跟後了，接下來只要把current指到prev -> 移動current到下一個節點 -> 重複上述步驟。
 */

/**
 * 總結
 * linked list有點錯太多次，總之應該要想辦法畫圖模擬每一次的指針轉換，缺少什麼變數再加上去
 * 像這題就是一開始把current指向prev，會發現1. 沒有prev可以指，和2. 指了之後就不知道下一個節點
 * 這時候就可以直接想到需要一個變數存prev，一個變數存next
 */