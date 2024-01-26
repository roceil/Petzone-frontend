#!/bin/bash

# 確保腳本在出現錯誤時終止
set -e

# 保存原始的 IFS（Internal Field Separator）值
OLD_IFS="$IFS"
# 設置 IFS 為換行符，用於分隔 git log 的輸出
IFS=$'\n'

# 獲取最近的 10 個 commits 的 hash 和訊息，並將其存儲為數組
commit_list=($(git log -10 --pretty=format:"%h - %s"))

# 恢復原始的 IFS 值
IFS="$OLD_IFS"

# 定義一個選擇 commit 的函數
select_commit() {
    select commit_option in "${commit_list[@]}"; do
        if [ -n "$commit_option" ]; then
            # 提取 commit 的 hash
            CHOSEN_COMMIT=$(echo $commit_option | awk '{print $1}')
            break
        else
            echo "請選擇有效的 commit。"
        fi
    done
}

echo "請輸入數字以選擇要回退到的 commit:"
select_commit

# 回退到選擇的 commit
git checkout $CHOSEN_COMMIT

echo "成功回退到 commit $CHOSEN_COMMIT"
