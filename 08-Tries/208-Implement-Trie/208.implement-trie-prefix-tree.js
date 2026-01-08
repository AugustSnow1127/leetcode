/*
 * @lc app=leetcode id=208 lang=javascript
 *
 * [208] Implement Trie (Prefix Tree)
 */

// @lc code=start

class TrieNode {
    // 根據Trie的定義，TrieNode要有children和isEndOfWord判斷是否為字的結尾
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        /**
         * 思考
         * [錯誤] 我需要一個{}來記錄trie
         * [AI引導] root要是TrieNode
         */
        this.root = new TrieNode();
    }

    insert(word) {
        /**
         * 思考
         * 假設要insert 'apple'要做的事
         * 1. 要用迴圈，一次插入一個字母，所以資料應該會是
         * 'a', 'pple'
         * 'p', 'ple,
         * ...
         * 2. 要檢查當前的trie是否已經有要插入的單字，有的話就直接移動到下一層
         * 3. 要決定isEndOfWord是true false
         */
        
        // 需要node用來移動
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];

            // 沒有存過該節點就新增一個
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }

            // 移動到下個節點
            node = node.children[char];
        }

        node.isEndOfWord = true;
    }

    search(word) {
        /**
         * 思考
         * 搜尋是要搜出完全一樣的字，所以只要做DFS就能找到
         */
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];

            // 檢查下一個字是否有存過
            if (!node.children.hasOwnProperty(char)) return false;

            node = node.children[char];
        }

        // 如果遍歷完都存在，則檢查是不是最後一個字
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        /**
         * 思考
         * 邏輯應該跟search一模一樣，只是最後不用檢查是不是結尾
         */
        let node = this.root;

        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];

            // 檢查下一個字是否有存過
            if (!node.children.hasOwnProperty(char)) return false;

            node = node.children[char];
        }

        return true;
    }
}

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

/**
 * 思考
 * 1. [AI引導] 
 * 簡單說Trie就是把單字用樹的方式存起來的一種資料結構
 * 由於相同前綴的字母會共用前綴，所以除了節省空間外，查找的速度也很快。
 * [AI總結]
Trie 的核心特性
樹形結構，從根到葉子的路徑構成單詞
共享前綴的單詞共享相同節點
搜索和前綴搜索都是 O(m) 時間
特別適合字符串相關操作

適合使用 Trie 的情況
需要頻繁的前綴搜索
字典很大但單詞平均長度較短
需要按字典序遍歷
自動完成功能

不適合使用 Trie 的情況
需要隨機訪問
單詞都很長且前綴不重複
只需要精確匹配，不需要前綴搜索
空間限制嚴格

 * 2. 換句話說，這一題就是要我手寫一個Trie功能
 */