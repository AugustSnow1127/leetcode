/*
 * @lc app=leetcode id=703 lang=javascript
 *
 * [703] Kth Largest Element in a Stream
 */

// @lc code=start

class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        // 要把nums變成只有k個節點的minHeap
        // 先把nums做成minHeap

        // 先定義constructor的實例
        this.heap = [];
        this.k = k;

        for(let i = 0; i < nums.length; i++) {
            this.insert(nums[i]);
        }

        // 取出節點直到minHeap.length === k
        while (this.heap.length > this.k && this.heap.length !== 0) {
            this.extractMin();
        }
    }

    /** 
     * @param {number} val
     * @return {number}
     */
    add(val) {
        // insert新的val到minHeap
        // 再把最小值extract出來
        this.insert(val);
        
        // [修正錯誤] k可能比heap長度大，所以不應該每次都extract
        // 只有超過 k 個才刪除
        if (this.heap.length > this.k) {
            this.extractMin();
        }
        
        // 返回根節點（第 k 大）
        return this.heap[0];
    }

    // === MinHeap 的方法整合到 KthLargest class 中 ===

    // 因為題目提到要add節點，所以需要一個insert func
    insert(val) {
        this.heap.push(val);

        // 需要bubbleUp來維持minHeap的特性
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        // TODO: 這裡要寫什麼？
        // 提示：
        // 1. 算出當前節點的父節點索引
        // 2. 比較當前節點和父節點的值
        // 3. 如果當前節點更小，就交換
        // 4. 繼續往上冒泡
        // 5. 直到不需要交換或到達根節點

        // 思考
        // 也就是要做DFS的交換，minHeap同層的節點沒有大小關係，所以只要跟父節點比就好
        // 已知minHeap的特性是
        // 節點索引是 i：
        // 父節點：Math.floor((i - 1) / 2)
        // 左子節點：2 * i + 1
        // 右子節點：2 * i + 2

        // 比到根節點
        if (index === 0) return;

        const father = Math.floor((index - 1) / 2);
        if (this.heap[father] > this.heap[index]) {
            const temp = this.heap[father];
            this.heap[father] = this.heap[index];
            this.heap[index] = temp;

            this.bubbleUp(father);
        }
    }

    // 為了維護heap是k個節點(根節點是kth)，所以在插入一個值之後，要把最小值拿掉
    extractMin() {
        // [修正錯誤，沒有處理邊界情況]
        // 邊界情況：空堆
        if (this.heap.length === 0) return null;
        
        // 邊界情況：只有一個元素
        if (this.heap.length === 1) return this.heap.pop();
        
        // 把最小值取出，用最大值替補
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();

        // 重新排序根節點
        this.bubbleDown(0);

        return min;
    }

    // [修正上面的錯誤]重寫bubbleDown
    bubbleDown(index) {
        // TODO: 用索引來判斷
        // 不要用值來判斷

        // 和子節點比較，誰比較小就跟根節點交換
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        
        // 節點超出範圍就結束
        if (left >= this.heap.length && right >= this.heap.length) return;

        let nextIndex;
        
        if (left < this.heap.length && right < this.heap.length) {
            nextIndex = this.heap[left] < this.heap[right] ? left : right;
        } else {
            nextIndex = left < this.heap.length ? left : right;
        }

        if (this.heap[index] > this.heap[nextIndex]) {
            const temp = this.heap[nextIndex];
            this.heap[nextIndex] = this.heap[index];
            this.heap[index] = temp;
            this.bubbleDown(nextIndex);
        }
    }
}

/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end

/**
 * 思考
 * 1. cut-off marks = 錄取門檻
 * 2. 題目要根據k，找出第k個高的數字，並且會逐步加入數字，每加一個就要找一次第k高的值
 * 3. 要找出特定順位的值，第一直覺是要"排序"，但排序的O太高，而且不太可能每加入一個值就排序一次
 * 4. 要解決的問題有:
 * 怎麼找出第k大的值?
 * 每插入一個值，就要找一次，要怎麼找得有效率?
 * 5. [看AI給的解題思路] -> 需要知道min heap的概念。其實算是binary search + tree的延伸題。
 * 上述兩題我已經知道了，陣列遍歷O(n)的效率很差，所以才會想到用tree的概念大幅增加效率(log n)
 * 而min heap的概念也雷同，只要能夠維護tree，就能降低每次搜尋的成本，也能夠應付題目要的多次插入值
 * 6. 問題是要怎麼寫出min heap?
 * 7. [AI引導，請他引導我怎麼寫出minHeap的功能]
 * 第一步：理解核心概念
在開始寫代碼之前，我想確認你理解 MinHeap 的關鍵概念：

問題1：MinHeap 的核心特性是什麼？
思考：

MinHeap 是什麼樣的樹形結構？
根節點的值與子節點的值有什麼關係？
如果用數組來存儲，元素之間的索引關係是什麼？
問題2：MinHeap 常見的操作有哪些？
思考：

你需要實現哪些方法？
insert：插入元素
extractMin：取出最小值
還有其他必要的嗎？
問題3：數組索引的關係
假設有這個 MinHeap（用數組表示）：[1, 3, 2, 5, 4]

       1 (index 0)
      / \
     3   2
    (1) (2)
    / \
   5   4
  (3) (4)
思考：

索引 i 的父節點索引是什麼？
索引 i 的左子節點索引是什麼？
索引 i 的右子節點索引是什麼？
試著回答這三個問題，確保你理解基本概念後，我們再開始寫代碼！

[AI解答]
很好，讓我詳細解答並引導你
問題1：MinHeap 的特性
你的回答：「從上到下的值由小到大排列的二元樹」

更準確的說法：

每個節點的值 ≤ 其子節點的值
根節點是最小值
是完全二叉樹（除了最後一層，其他層都填滿，最後一層從左到右填充）
範例
       1
      / \
     3   2
    / \
   5   4

1 ≤ 3, 1 ≤ 2
3 ≤ 5, 3 ≤ 4
問題2：MinHeap 的基本操作
你列出了：insert, extractMin, extractKth, sort

更準確的基本操作：

insert：插入元素 ✓
extractMin：取出最小值 ✓
peek：查看最小值（不取出）
size：返回元素個數
isEmpty：檢查是否為空
你多列的：

❌ extractKth：MinHeap 不支持這個操作（需要用其他數據結構）
❌ sort：Heap Sort 是一個算法，不是 MinHeap 的方法
問題3：索引關係（重要！）
這是用數組實現 MinHeap 的關鍵！

假設節點索引是 i：
父節點：Math.floor((i - 1) / 2)

左子節點：2 * i + 1

右子節點：2 * i + 2

範例驗證
數組：[1, 3, 2, 5, 4]

       1 (index 0)
      / \
     3   2
    (1) (2)
    / \
   5   4
  (3) (4)
驗證父節點：

索引 1 的父節點 = Math.floor((1-1)/2) = 0 ✓
索引 2 的父節點 = Math.floor((2-1)/2) = 0 ✓
索引 3 的父節點 = Math.floor((3-1)/2) = 1 ✓
驗證子節點：

索引 0 的左子 = 2*0+1 = 1 ✓
索引 0 的右子 = 2*0+2 = 2 ✓
索引 1 的左子 = 2*1+1 = 3 ✓
索引 1 的右子 = 2*1+2 = 4 ✓
開始實現 - 第一步：定義類和基本屬性
class MinHeap {
    constructor() {
        // 用數組存儲堆
        this.heap = [];
    }
}
第二步：實現 insert 方法
問題引導
思考：

新元素應該先放在數組的哪裡？
然後要做什麼才能恢復堆特性？
這個過程叫什麼？
試著完成 insert 方法：

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(val) {
        // 步驟1：把新元素放在數組末尾
        this.heap.push(val);
        
        // 步驟2：向上冒泡，恢復堆特性
        // 你需要寫一個 bubbleUp 方法
        this.bubbleUp(this.heap.length - 1);
    }
    
    bubbleUp(index) {
        // TODO: 這裡要寫什麼？
        // 提示：
        // 1. 算出當前節點的父節點索引
        // 2. 比較當前節點和父節點的值
        // 3. 如果當前節點更小，就交換
        // 4. 繼續往上冒泡
        // 5. 直到不需要交換或到達根節點
    }
}
試著寫出 bubbleUp 方法！如果你卡住了，我可以給你更多提示。

Q: 為什麼用minHeap而不是maxHeap?
場景對比：MaxHeap vs MinHeap
假設 k = 3，流是：[5, 8, 2, 1, 9, 3, 7]

思考問題1：如果用 MaxHeap
策略：把所有元素都放進 MaxHeap

問題：

MaxHeap 的根節點是什麼？（最大值）
你要找第 k 大，怎麼從 MaxHeap 裡得到？
如果 k = 3，你需要做什麼操作？
試著寫出步驟：

把所有元素放進 MaxHeap
取出最大值（第 1 大）
再取出最大值（第 2 大）
再取出最大值（第 3 大）
...
思考：

這樣需要執行幾次 extractMax？
每次 extractMax 的時間複雜度是多少？
如果 n 很大（比如 100 萬），k = 3，這樣效率高嗎？
思考問題2：如果用 MinHeap
策略：只維護「最大的 k 個元素」

問題：

MinHeap 的根節點是什麼？（最小值）
在「最大的 k 個元素」中，最小的是第幾大？
如果 k = 3，MinHeap 裡有 [5, 8, 9]，根節點是多少？
這個根節點就是第幾大？
試著寫出步驟：

維護一個大小為 k 的 MinHeap
每次插入新元素
如果超過 k 個，刪除最小值
查看根節點，就是第 k 大
思考：

這樣 MinHeap 裡最多有幾個元素？
每次 add 的時間複雜度是多少？
如果 n 很大，k = 3，這樣效率高嗎？
思考問題3：時間複雜度對比
假設 n = 1,000,000（一百萬），k = 3

MaxHeap 方法：

插入 n 個元素：O(n log n)
取出 k-1 個最大值：O(k log n)
每次 add 查詢第 k 大：O(k log n)
MinHeap 方法：

每次 add：O(log k)（因為最多只存 k 個元素）
查詢第 k 大：O(1)（直接看根節點）
思考：

k log n vs log k
當 k << n（k 遠小於 n）時，哪個更快？
log n 和 log k 差多少？
思考問題4：實際例子
n = 10, k = 3

MaxHeap：

堆大小：10
每次查詢需要刪除 2 個元素
複雜度：O(2 log 10) ≈ O(6.6)
MinHeap：

堆大小：3
每次查詢直接看根節點
複雜度：O(log 3) ≈ O(1.6)
思考：

如果 n = 1,000,000, k = 3 呢？
MaxHeap：O(2 log 1,000,000) ≈ O(40)
MinHeap：O(log 3) ≈ O(1.6)
差距有多大？
思考問題5：如果 k = n/2 呢？
如果 k 很大，接近 n 呢？

MaxHeap：O(k log n) ≈ O(n log n)

MinHeap：O(log k) ≈ O(log n)

思考：

這時候差距還大嗎？
但題目通常 k 是固定的，n 是流的大小（可能無限）
所以 MinHeap 還是比較穩定
總結
試著回答：

用 MaxHeap 需要 extract 多少次？
用 MinHeap 最多存多少個元素？
當 k 遠小於 n 時，哪個更高效？
當 n 越來越大時，哪個更穩定？
你覺得應該選哪個？為什麼？

A: 哦，懂了，因為只要維護k個節點的heap，所以kth的值就是根節點

花了4 5個小時終於寫完heap的功能，
現在要思考如何解題
1. kthLargest 函數傳了k值和數列，所以應該是要建立一個k個節點的minHeap
2. add則是在加入值後，要insert值後，再extractMin
 */

/**
 * 總結
 * 這題做了大概6小時吧，主要是因為對heap的概念不熟，加上要手寫heap函數
 * 反省幾個可以改善的地方
 * 1. 要注意邊界測試，很常忘記
 * 2. 條件式容易下錯，該用index判斷的地方卻用值判斷，卻忽略值可能有例外狀況導致出錯
 * 應該要畫圖檢視自己的想法是否正確，才開始寫
 * 3. 對class的用法還是小不熟，要多練習
 */