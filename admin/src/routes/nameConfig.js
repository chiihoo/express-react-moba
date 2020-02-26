const nameConfig = [
  {
    title: '内容管理',
    key: '/categories',
    icon: 'mail',
    children: [
      {
        itemGroup: true,
        title: '分类',
        children: [
          {
            title: '新建分类',
            key: '/admin/categories/create'
          },
          {
            title: '分类列表',
            key: '/admin/categories/list'
          }
        ]
      }
    ]
  }
]
