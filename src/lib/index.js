// 關閉側邊欄
export const closeSidebar = () => {
  const drawerCheckbox = document.getElementById('my-drawer')
  if (drawerCheckbox) {
    drawerCheckbox.checked = false
  }
}
