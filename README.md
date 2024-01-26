# <img src='https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/Logo.svg?t=2024-01-26T02%3A49%3A55.252Z' style='width:50px'/> Petzone 

## VScode 建議安裝套件

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.error-lens)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

## 專案架構

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/zh/)
- [Vue Router](https://next.router.vuejs.org/)
- [Pinia](https://pinia.esm.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 資料夾結構說明

- `api`：放置 API 請求的函式。
- `assets`：放置靜態資源，css、圖片等。
- `containers`：放置頁面容器元件，通常是有邏輯的元件。
- `components`：放置共用元件、拆分元件，通常是不會有邏輯的元件。
- `composables`：放置有使用到 Vue API 的共用邏輯。
- `lib`：放置共用函式。
- `router`：放置路由設定。
- `store`：放置 Pinia 狀態管理。
- `views`：放置頁面元件。

## 啟動指令

- 專案初始化

  ```sh
    pnpm install
  ```

- 開發模式

  ```sh
    pnpm dev
  ```

- 打包
  ```sh
    pnpm build
  ```

## Git Flow

- 主要分支
  - `main`：主要分支，用來放置正式發佈的版本。
  - `dev`：開發分支，用來整合所有功能的分支。
- 次要分支
  - `feat`：功能分支，用來開發新功能的分支，開發完成後會合併到 `dev` 分支。
  - `fix`：修復分支，用來修復 bug 的分支，修復完成後會合併到 `dev` 分支。
- 推送流程
  - `feat` 完成後，先執行 `git merge origin/dev`，測試看看是否有衝突。
  - 若有衝突，請先解決衝突後再推送。
  - 若沒有衝突，請執行 `git push origin feat/xxx`。
  - 推送完成後，請到 GitHub 發起 Pull Request，目前設定是自己可以通過自己發起的 PR。
  - PR 通過後，到網頁上檢查是否有問題，沒問題的話就可以將 `feat/xxx` 發起 PR 到 `main`。
  - PR 通過後，刪除 `feat/xxx` 分支。

## 注意事項

- 請確認是否有安裝 [pnpm](https://pnpm.io/zh/)，若沒有請先安裝。
- 安裝套件請使用 `pnpm install`。
- `main` 與 `dev` 分支兩者互不相交，也就是說不會存在 `dev` PR 到 `main` 的情況。
- `feat` 內可以有功能修復，但 `fix` 內不可以有功能開發。
