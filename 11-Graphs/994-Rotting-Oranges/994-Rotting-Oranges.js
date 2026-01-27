/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    const queue = [];
    const m = grid.length;
    const n = grid[0].length;
    let mins = 0;

    // 蒐集所有rotten fruit
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            if (grid[y][x] === 2) queue.push([y, x]);
        }
    }

    const rot = function(x, y) {
        if (x < 0 || y < 0 || x >= n || y >= m || grid[y][x] !== 1) return;

        grid[y][x] = 2;
        queue.push([y, x]);
    };

    while (queue.length) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const [y, x] = queue.shift();
            
            rot(x - 1, y);
            rot(x + 1, y);
            rot(x, y - 1);
            rot(x, y + 1);
        }

        // 只有在「還有下一輪」時才加分鐘數
        if (queue.length > 0) mins++;
    }

    // 最後檢查是否還有1
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            if (grid[y][x] === 1) return -1;
        }
    }
    
    return mins;
};

/**
 * 看起來是要用DFS找max minutes
 * 
 * Q: 如何檢查是否還有fresh fruit存活?
 * 1. 用set紀錄每顆fresh fruit的位置，如果被rotten要刪掉，最後檢查set是否還有東西
 * 
 * [思考錯誤，AI引導]
 * 有一個地方想錯了，就是rotten fruit是"同時"腐爛，所以如果出現以下情況，上面的作法會有錯
 * 初始狀態 (t=0):
2 1 1 1
1 1 1 1
1 1 1 2

正確答案: 2 分鐘

 * 所以1. 要使用BFS
 * 2. 因為要"同時"，所以不能邊遍歷邊做BFS，只能先蒐集全部的rotten fruit座標後，再一次處理
 */