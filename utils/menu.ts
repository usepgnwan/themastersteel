export let menu = [
    {
        label : "Dashboard",
        data : [
                {  
                    label: 'Dashboard',
                    icon: 'i-heroicons-presentation-chart-bar',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/dashboard',
                    children:  null,
                    active: false,
                },   
            ]
    }, 
    {
        label : "Data Master",
        data : [ 
                { 
                    label: 'Role',
                    icon: 'i-fluent-people-team-16-regular',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/role',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'User',
                    icon: 'i-fluent-people-money-20-filled',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/user',
                    children:  null,
                    active: false,
                },
                  
            ]
    },
    {
    label : "Data Operasional",
    data : [
            { 
                label: 'Product',
                icon: 'i-fluent-mdl2-product-list',
                class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                to: '/product',
                children:  null,
                active: false,
            },   
            { 
                label: 'Transaksi',
                icon: 'i-carbon-money',
                class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                to: '/transaksi',
                children:  null,
                active: false,
            },   
        ]
  },
]