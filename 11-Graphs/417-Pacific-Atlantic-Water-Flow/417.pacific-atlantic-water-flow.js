/*
 * @lc app=leetcode id=417 lang=javascript
 *
 * [417] Pacific Atlantic Water Flow
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    const res = [];
    const pSet = new Set();
    const aSet = new Set();
    const m = heights.length;
    const n = heights[0].length;

    const dfs = function(x, y, set) {
        if (x < 0 || y < 0 || x >= n || y >= m) return;
        
        const coordinate = `${y},${x}`
        if (set.has(coordinate)) return;
        set.add(coordinate);

        if (y - 1 >= 0 && (heights[y - 1][x] >= heights[y][x])) dfs(x, y - 1, set);
        if (y + 1 < m && (heights[y + 1][x] >= heights[y][x])) dfs(x, y + 1, set);
        if (x - 1 >= 0 && (heights[y][x - 1] >= heights[y][x])) dfs(x - 1, y, set);
        if (x + 1 < n && (heights[y][x + 1] >= heights[y][x])) dfs(x + 1, y, set);

        return;
    };

    for (let x = 0; x < n; x++) {
        dfs(x, 0, pSet);
        dfs(x, m - 1, aSet);
    }

    for (let y = 0; y < m; y++) {
        dfs(0, y, pSet);
        dfs(n - 1, y, aSet);
    }

    for (let pacificSet of pSet.values()) {
        if (aSet.has(pacificSet)) res.push(pacificSet.split(',').map(Number));
    }

    return res;
};
// @lc code=end

/**
 * 遍歷每個節點，並向上下左右dfs
 * 同時碰過左or上 && 右or下，則可以推入res
 * 
 * 不過我在意的點是，題目給的m, n很大，不確定在效率上會不會太差
 * 如果要節省資源，要在"有人碰到ocean"就立即停止?
 * 
 * [AI引導] 你的直覺非常敏銳。
如果對地圖上的每一個點都做一次 DFS 來尋找兩個海洋，最差的時間複雜度會接近 $O((M \times N)^2)$。當地圖變大時，這確實會造成超時 (Time Limit Exceeded)。
為了優化，我們試著逆向思考一下：
與其問山上的每一個點：「你可以流到哪裡？」 不如站在海岸邊問：「哪些點的水流得下來？」
 * 
 * 假設只對m = 0, n = 0, m = heights.length - 1, n = heights[r].length - 1
 * 這四條邊界，用for迴圈dfs把可以進入pacific ocean的地填'P'，可以進Atlantic ocean填'A'
 * 遍歷過程中如果找到'PA'就可以推進res
 * 
 * [AI引導] 可以建立兩個set，最後用O(MN)遍歷找重疊
 */