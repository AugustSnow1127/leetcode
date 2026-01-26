# Intuition
Initially, I thought about simulating the board by marking the "attack range" of each queen on the grid (like changing cells to `.`). However, I realized that backtracking (resetting the grid) would be complicated because multiple queens might attack the same cell. 

Then I realized we don't need to modify the grid for validation. We can use logic to check if a position is safe. The constraints for a valid N-Queens solution are:
1. No two queens share the same column.
2. No two queens share the same positive diagonal (sw-ne).
3. No two queens share the same negative diagonal (nw-se).

Using **Sets** (or boolean arrays) to track these constraints allows O(1) checking, which is much faster than scanning the board.

# Approach
We use **Backtracking (DFS)** to place queens row by row.

1. **State:**
   - `cols`, `posDiags`, `negDiags`: Track occupied lines.
   - `board`: A visual representation of the board options.

2. **DFS Process:**
   - **Base Case**: If `row == n`, we have successfully placed N queens. Add current board to results.
   - **Iterate**: Try every column `col` in the current `row`.
   - **Validate**: Check if `col`, `row + col`, or `row - col` is under attack.
   - **Action**: Place 'Q', mark constraints.
   - **Recurse**: Move to `row + 1`.
   - **Backtrack**: Remove 'Q', unmark constraints.

# Complexity
- Time complexity: $$O(N!)$$
- Space complexity: $$O(N^2)$$

# Code

### JavaScript
```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const grid = Array.from({length: n}, () => Array(n).fill('.'));
    const res = [];
    const colSet = new Set();
    const posDiagSet = new Set();
    const negDiagSet = new Set();

    const dfs = function(row) {
        if (row === n) {
            res.push(grid.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (colSet.has(col) || 
                posDiagSet.has(row + col) || 
                negDiagSet.has(row - col)
            ) continue;

            colSet.add(col);
            posDiagSet.add(row + col);
            negDiagSet.add(row - col);
            grid[row][col] = 'Q';

            dfs(row + 1);

            colSet.delete(col);
            posDiagSet.delete(row + col);
            negDiagSet.delete(row - col);
            grid[row][col] = '.';
        }
    };

    dfs(0);
    return res;
};
```

### Python
```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        col_set = set()
        pos_diag = set() # (r + c)
        neg_diag = set() # (r - c)
        
        res = []
        board = [["."] * n for _ in range(n)]
        
        def backtrack(r):
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
                return
            
            for c in range(n):
                if c in col_set or (r + c) in pos_diag or (r - c) in neg_diag:
                    continue
                
                col_set.add(c)
                pos_diag.add(r + c)
                neg_diag.add(r - c)
                board[r][c] = "Q"
                
                backtrack(r + 1)
                
                col_set.remove(c)
                pos_diag.remove(r + c)
                neg_diag.remove(r - c)
                board[r][c] = "."
                
        backtrack(0)
        return res
```

### Java
```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for(char[] row : board) Arrays.fill(row, '.');
        
        boolean[] cols = new boolean[n];
        boolean[] posDiag = new boolean[2 * n]; // r + c
        boolean[] negDiag = new boolean[2 * n]; // r - c + n
        
        backtrack(0, n, board, res, cols, posDiag, negDiag);
        return res;
    }
    
    private void backtrack(int r, int n, char[][] board, List<List<String>> res, 
                           boolean[] cols, boolean[] posDiag, boolean[] negDiag) {
        if (r == n) {
            List<String> copy = new ArrayList<>();
            for(char[] row : board) copy.add(new String(row));
            res.add(copy);
            return;
        }
        
        for (int c = 0; c < n; c++) {
            if (cols[c] || posDiag[r + c] || negDiag[r - c + n]) continue;
            
            cols[c] = true;
            posDiag[r + c] = true;
            negDiag[r - c + n] = true;
            board[r][c] = 'Q';
            
            backtrack(r + 1, n, board, res, cols, posDiag, negDiag);
            
            cols[c] = false;
            posDiag[r + c] = false;
            negDiag[r - c + n] = false;
            board[r][c] = '.';
        }
    }
}
```

### C++
```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        
        // Use vectors as hash maps for O(1) lookups
        // posDiag (r+c) max is 2n-2, negDiag (r-c) range is -(n-1) to (n-1)
        vector<bool> cols(n, false);
        vector<bool> posDiag(2 * n, false);
        vector<bool> negDiag(2 * n, false);
        
        function<void(int)> backtrack = [&](int r) {
            if (r == n) {
                res.push_back(board);
                return;
            }
            
            for (int c = 0; c < n; c++) {
                // Shift index for negative diagonal to insure positive index
                if (cols[c] || posDiag[r + c] || negDiag[r - c + n]) continue;
                
                cols[c] = true;
                posDiag[r + c] = true;
                negDiag[r - c + n] = true;
                board[r][c] = 'Q';
                
                backtrack(r + 1);
                
                cols[c] = false;
                posDiag[r + c] = false;
                negDiag[r - c + n] = false;
                board[r][c] = '.';
            }
        };
        
        backtrack(0);
        return res;
    }
};
```
