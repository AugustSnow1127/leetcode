/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
    // 邊界條件：如果輸入是 null，直接回傳 null
    if (!node) return null;

    // 備忘錄：用來記錄舊節點 (key) 到新節點 (value) 的映射
    // 這有兩個作用：
    // 1. 避免重複建立節點 (如果已經建立過，直接拿來用)
    // 2. 避免無窮迴圈 (因為圖可能有環)
    const oldToNew = new Map();

    const dfs = (node) => {
        // 如果這個節點已經複製過，直接回傳它的分身
        if (oldToNew.has(node)) {
            return oldToNew.get(node);
        }

        // 建立新節點 (只複製值，鄰居先留空)
        const copy = new _Node(node.val);

        // 關鍵步驟：在新節點建立後，必須「立刻」把它存入 Map
        // 這樣在遞迴處理鄰居時，如果是環狀結構回到自己，就能在上面那一步找到並返回
        oldToNew.set(node, copy);

        // 處理所有鄰居
        for (const neighbor of node.neighbors) {
            // 遞迴呼叫 dfs，它會回傳鄰居的分身 (不管是剛建立的還是舊有的)
            copy.neighbors.push(dfs(neighbor));
        }

        return copy;
    };

    return dfs(node);
};
