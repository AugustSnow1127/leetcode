---
description: Automatically update progress docs (README & TodoList) and push code to git
---

1. **Check Completed Problems**:
   - Run `fd -t d . "c:\projects\leetcode"` to list all directories.
   - Filter for problem folders (usually named with a number prefix like `217-Contains-Duplicate`).
   - Identify which problems are newly completed since the last update.

2. **Update NeetCode-150-TodoList.md**:
   - For every identified completed problem:
     - Find the corresponding line in `c:\projects\leetcode\NeetCode-150-TodoList.md`.
     - Change `- [ ] Problem Name` to `- [x] Problem Name`.

3. **Update README.md Stats**:
   - Calculate new statistics:
     - **Total Completed**: Count all `[x]` in TodoList.
     - **Category Counts**: Update the table (e.g., `| Trees | 15 | 15/15 |`).
     - **Difficulty Counts**: Estimate difficulty increment (Easy/Medium/Hard) based on the problem number or known lists.
   - Update `c:\projects\leetcode\README.md` with these new numbers.

4. **Git Operations**:
   - // turbo
   - Run `git add .` in `c:\projects\leetcode`.
   - // turbo
   - Run `git commit -m "feat: complete problems and update stats"` (Include specific problem numbers if possible in the message).
   - // turbo
   - Run `git push`.

5. **Report**:
   - Inform the user that docs are updated and code is pushed.
