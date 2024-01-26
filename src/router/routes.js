const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/HomePage.vue') },
      {
        path: 'signup',
        component: () => import('pages/signup/LoginPage.vue'),
      },
      {
        path: 'signup/next',
        component: () => import('pages/signup/SignupPageNext.vue'),
      },
      {
        path: 'login',
        component: () => import('pages/signup/LoginPage.vue'),
      },
      {
        path: 'login/next',
        component: () => import('pages/signup/LoginPageNext.vue'),
      },
      {
        path: 'signup/success/:name',
        component: () => import('src/components/signup/SignUpSuccess.vue'),
      },
      {
        path: 'findpassword',
        component: () => import('pages/signup/FindPassword.vue'),
      },
      {
        path: 'template/:type/:search',
        component: () => import('src/pages/template/TemplatePage.vue'),
      },
      {
        path: 'template/:type/:search/:id',
        component: () => import('src/pages/template/TemplateDetailPage.vue'),
      },
      {
        path: 'apply-creator',
        component: () => import('src/pages/user/ApplyCreator.vue'),
      },
      {
        path: '/posts',
        component: () => import('src/pages/community/PostWrite.vue'),
      },
      {
        path: '/posts/all',
        component: () => import('src/pages/community/AllPosts.vue'),
      },
      {
        path: '/posts/hot',
        component: () => import('src/pages/community/HotPosts.vue'),
      },
      {
        path: '/posts/free',
        component: () => import('src/pages/community/FreePosts.vue'),
      },
      {
        path: '/posts/inquiry',
        component: () => import('src/pages/community/InquiryPosts.vue'),
      },
      {
        path: '/posts/tip',
        component: () => import('src/pages/community/TipPosts.vue'),
      },
      {
        path: '/posts/:id',
        name: 'PostDetails',
        component: () => import('src/pages/community/PostDetailsPage.vue'),
        props: true,
      },
      {
        path: 'carts',
        component: () => import('src/pages/user/Carts.vue'),
      },
      {
        path: 'mypage',
        component: () => import('src/pages/user/MyPage.vue'),
      },
      {
        path: 'mypage/info-update',
        component: () => import('src/pages/user/MyPageInfoUpdate.vue'),
      },
      {
        path: 'mypage/pwd-update',
        component: () => import('src/pages/user/MyPagePwdUpdate.vue'),
      },
      {
        path: 'mypage/my-review',
        component: () => import('src/pages/user/MyReview.vue'),
      },
      {
        path: 'mypage/my-scrap',
        component: () => import('src/pages/user/MyScrap.vue'),
      },
      {
        path: 'mypage/upload-template',
        component: () => import('src/pages/creator/UploadTemplate.vue'),
      },
      {
        path: 'mypage/revenue-management',
        component: () => import('src/pages/creator/RevenueManagement.vue'),
      },
      {
        path: '/404/:id',
        component: () => import('pages/ExceptionPage.vue'),
      },
      {
        path: '/success/:id',
        component: () => import('pages/ExceptionPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/404',
  },
];

export default routes;
