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
        path: 'findpassword',
        component: () => import('pages/signup/FindPassword.vue'),
      },
      {
        path: 'freetemplate',
        component: () => import('src/pages/template/FreeTemplatePage.vue'),
      },
      {
        path: 'paytemplate',
        component: () => import('src/pages/template/PayTemplatePage.vue'),
      },
      {
        path: 'template/:id',
        component: () => import('src/pages/template/TemplateDetailPage.vue'),
      },
      {
        path: 'apply-creator',
        component: () => import('src/pages/user/ApplyCreator.vue'),
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
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
