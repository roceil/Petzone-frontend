import cat from '../assets/ecommerce/cat.svg'
import dog from '../assets/ecommerce/dog.svg'
import users from '../assets/sidebar/users.svg'
import gift from '../assets/sidebar/gift.svg'
import truck from '../assets/sidebar/truck.svg'
import post from '../assets/sidebar/post.svg'
import coupon from '../assets/sidebar/coupon.svg'

// Header 連結
export const headerLinks = [
  {
    name: 'ECommerce',
    link: '/ecommerce',
    hoverName: '商店'
  },
  {
    name: 'Community',
    link: '/community',
    hoverName: '社群'
  }
]

// Header 頭貼下拉選單選項
export const drop_down_links = [
  { name: '我的會員中心', link: '/membercenter', sm_name: '我的資料' },
  { name: '我的歷史訂單', link: '/membercenter/ordershistory', sm_name: '我的訂單' },
  { name: '我的貼文專區', link: '/mypost', sm_name: '我的貼文' },
  // { name: '後台管理', link: '/item4' },
  { name: '會員登出', link: '/item5', sm_name: '會員登出' }
]

// Header 購物車下拉選單假資料
export const fake_shopping_cart = [
  { id: 1, img: 'https://via.placeholder.com/48', name: '狗狗甜甜圈', price: 2000, quantity: 10 },
  { id: 2, img: 'https://via.placeholder.com/48', name: '貓咪魚魚餅', price: 1000, quantity: 5 },
  { id: 3, img: 'https://via.placeholder.com/48', name: '狗窩', price: 4500, quantity: 1 },
  { id: 4, img: 'https://via.placeholder.com/48', name: '貓砂', price: 300, quantity: 20 },
  { id: 5, img: 'https://via.placeholder.com/48', name: '狗狗罐頭', price: 150, quantity: 30 }
]

// 首頁瀑布流假資料
export const blocks = [
  {
    _id: '65e52936168da9d515515fbf',
    user: '65e520c0dbabe56f1109b69e',
    tags: ['俄羅斯藍貓'],
    photos: [
      'https://storage.cloud.google.com/vue-petzone.appspot.com/milada-vigerova-BgRs4dzW4Js-unsplash.jpg'
    ],
    content: '我家貓貓',
    likes: [],
    comments: [],
    createdAt: '2024-03-04T01:51:50.663Z',
    updatedAt: '2024-03-04T01:51:50.663Z',
    __v: 0
  }

  // {
  //   content: '1',
  //   color: 'bg-red-300',
  //   height: 200
  // },
  // {
  //   content: '2',
  //   color: 'bg-blue-300',
  //   height: 150
  // },
  // {
  //   content: '3',
  //   color: 'bg-green-300',
  //   height: 180
  // },
  // {
  //   content: '4',
  //   color: 'bg-yellow-300',
  //   height: 220
  // },
  // {
  //   content: '5',
  //   color: 'bg-purple-300',
  //   height: 170
  // },
  // {
  //   content: '6',
  //   color: 'bg-pink-300',
  //   height: 190
  // },
  // {
  //   content: '7',
  //   color: 'bg-orange-300',
  //   height: 210
  // },
  // {
  //   content: '8',
  //   color: 'bg-indigo-300',
  //   height: 160
  // },
  // {
  //   content: '9',
  //   color: 'bg-teal-300',
  //   height: 230
  // },
  // {
  //   content: '10',
  //   color: 'bg-gray-300',
  //   height: 140
  // },
  // {
  //   content: '11',
  //   color: 'bg-red-300',
  //   height: 200
  // },
  // {
  //   content: '12',
  //   color: 'bg-blue-300',
  //   height: 150
  // },
  // {
  //   content: '13',
  //   color: 'bg-green-300',
  //   height: 180
  // },
  // {
  //   content: '14',
  //   color: 'bg-yellow-300',
  //   height: 220
  // },
  // {
  //   content: '15',
  //   color: 'bg-purple-300',
  //   height: 170
  // },
  // {
  //   content: '16',
  //   color: 'bg-pink-300',
  //   height: 190
  // },
  // {
  //   content: '17',
  //   color: 'bg-orange-300',
  //   height: 210
  // },
  // {
  //   content: '18',
  //   color: 'bg-indigo-300',
  //   height: 160
  // },
  // {
  //   content: '19',
  //   color: 'bg-teal-300',
  //   height: 230
  // },
  // {
  //   content: '20',
  //   color: 'bg-gray-300',
  //   height: 140
  // }
]

// 商品列表連結
export const ecommerceLinks = [
  {
    name: '貓貓專區',
    icon: cat,
    type: 'cat'
  },
  {
    name: '狗狗專區',
    icon: dog,
    type: 'dog'
  }
]

// 商品列表假資料
export const productListData = [
  {
    name: '商品名稱 1',
    image: 'bg-blue-300',
    originalPrice: 40,
    price: 38.95
  },
  {
    name: '商品名稱 2',
    image: 'bg-red-300',
    originalPrice: 50,
    price: 48.95
  },
  {
    name: '商品名稱 3',
    image: 'bg-green-300',
    originalPrice: 60,
    price: 58.95
  },
  {
    name: '商品名稱 4',
    image: 'bg-yellow-300',
    originalPrice: 70,
    price: 68.95
  },
  {
    name: '商品名稱 5',
    image: 'bg-purple-300',
    originalPrice: 80,
    price: 78.95
  },
  {
    name: '商品名稱 6',
    image: 'bg-pink-300',
    originalPrice: 90,
    price: 88.95
  }
]

// 註冊 Modal 欄位
export const sign_up_modal_form_items = [
  {
    tag: 'email',
    label: '請輸入帳號',
    sub_label: '(Email)',
    placeholder: '請輸入Email',
    type: 'email'
  },
  {
    tag: 'password',
    label: '請輸入密碼',
    placeholder: '請輸入密碼',
    type: 'password'
  },
  {
    tag: 'name',
    label: '請輸入姓名',
    placeholder: '請輸入姓名',
    type: 'text'
  },
  {
    tag: 'nickName',
    label: '請輸入暱稱',
    placeholder: '請輸入暱稱',
    type: 'text'
  },
  {
    tag: 'phone',
    label: '請輸入電話',
    placeholder: '請輸入電話',
    type: 'tel'
  },
  {
    tag: 'address',
    label: '請輸入地址',
    placeholder: '請輸入地址',
    type: 'text'
  }
]

// 登入 Modal 欄位
export const login_modal_form_items = [
  {
    label: '會員帳號',
    tag: 'email',
    type: 'text'
  },
  {
    label: '會員密碼',
    tag: 'password',
    type: 'password'
  }
]

export const sidebarLinks = [
  {
    name: '帳號管理',
    icon: users,
    link: '/admin/accounts'
  },
  {
    name: '商品管理',
    icon: gift,
    link: '/admin/products'
  },
  {
    name: '訂單管理',
    icon: truck,
    link: '/admin/orders'
  },
  {
    name: '貼文管理',
    icon: post,
    link: '/admin/posts'
  },
  {
    name: '優惠券管理',
    icon: coupon,
    link: '/admin/coupons'
  }
]
