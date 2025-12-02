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
                { 
                    label: 'Sebaran Data',
                    icon: 'i-material-symbols-map-search-outline-sharp',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/tes1',
                    children:  null,
                    active: false,
                }, 
                { 
                    label: 'Laporan Keuangan',
                    icon: 'i-material-symbols-balance',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/laporan/keuangan',
                    children:  null,
                    active: false,
                }, 
                { 
                    label: 'Laporan Pembayaran',
                    icon: 'i-tdesign-money',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/tes1',
                    children:  null,
                    active: false,
                },  
            ]
    }, 
    {
        label : "Data Master",
        data : [
                { 
                        label: 'Wilayah Administrasi',
                        icon: 'i-gridicons-globe',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                        parent_to: '/administrator', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Negara', 
                                class:'',
                                to: '/administrator/negara',
                                active: false,
                            },
                            {
                                label: 'Provinsi', 
                                class:'',
                                to: '/administrator/provinsi',
                                active: false,
                            }, 
                            {
                                label: 'Kabupaten Kota', 
                                class:'',
                                to: '/administrator/kab_kota',
                                active: false,
                            }, 
                            {
                                label: 'Kecamatan', 
                                class:'',
                                to: '/administrator/kecamatan',
                                active: false,
                            }, 
                            {
                                label: 'Kelurahan Desa', 
                                class:'',
                                to: '/administrator/kelurahan',
                                active: false,
                            }, 
                        ]
                }, 
                { 
                        label: 'Bussiness',
                        icon: 'i-basil-bag-outline',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                        parent_to: '/business', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Bussiness Category', 
                                class:'',
                                to: '/business/business-categories',
                                active: false,
                            },
                            {
                                label: 'Sub Bussiness Category', 
                                class:'',
                                to: '/business/sub-business-categories',
                                active: false,
                            }, 
                        ]
                }, 
                { 
                        label: 'Variant',
                        icon: 'i-heroicons-presentation-chart-bar',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                        parent_to: '/variant', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Variant Parameter', 
                                class:'',
                                to: '/variant/parameter',
                                active: false,
                            },
                            {
                                label: 'Variant Parameter Sub Bisnis', 
                                class:'',
                                to: '/variant/sub-parameter-business',
                                active: false,
                            }, 
                        ]
                }, 
                { 
                        label: 'Master Product',
                        icon: 'i-fluent-box-20-regular',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                        parent_to: '/master-product', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Products', 
                                class:'',
                                to: '/master-product/product',
                                active: false,
                            },
                            {
                                label: 'Weight Checker', 
                                class:'',
                                to: '/xx/detail',
                                active: false,
                            }, 
                        ]
                }, 
                { 
                        label: 'KoinWorks',
                        icon: 'i-iconoir-coin',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                        parent_to: '/xx', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Loan Report', 
                                class:'',
                                to: '/loan-report',
                                active: false,
                            }, 
                        ]
                }, 
                { 
                        label: 'Data Shipment',
                        icon: 'i-mdi-truck-fast',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                        parent_to: '/shipping', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Mitra Ekspedisi', 
                                class:'',
                                to: '/shipping/mitra-ekspedisi',
                                active: false,
                            },
                            {
                                label: 'Log Shipping Cost', 
                                class:'',
                                to: '/shipping/log-cost',
                                active: false,
                            }, 
                        ]
                }, 
                { 
                    label: 'Poolcoin',
                    icon: 'i-clarity-coin-bag-solid',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/poolcoin',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Satuan',
                    icon: 'i-material-symbols-stacks-outline',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/satuan',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Pooler',
                    icon: 'i-fluent-people-money-20-filled',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/pooler',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Packer',
                    icon: 'i-healthicons-market-stall-outline',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/packer',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Team Poolapack',
                    icon: 'i-fluent-people-team-16-regular',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/x',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Flash Sale',
                    icon: 'i-mdi-flash',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/x',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Paramete Sistem',
                    icon: 'i-mingcute-settings-6-line',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/x',
                    children:  null,
                    active: false,
                },
                { 
                    label: 'Banner',
                    icon: 'i-solar-gallery-linear',
                    class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                    to: '/x',
                    children:  null,
                    active: false,
                },
                { 
                        label: 'User Poolpack',
                        icon: 'i-carbon-collaborate',
                        class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer !px-2.5 !py-1.5 ', 
                        parent_to: '/internal', 
                        active: false,
                        defaultOpen: false,
                        children: [
                            {
                                label: 'Roles', 
                                class:'',
                                to: '/internal/roles',
                                active: false,
                            },
                            {
                                label: 'User', 
                                class:'',
                                to: '/internal/user',
                                active: false,
                            }, 
                        ]
                }, 
            ]
    },
    {
    label : "Data Operasional",
    data : [
            { 
                label: 'CRM',
                icon: 'i-gravity-ui-signal',
                class:'text-white hover:text-primary  hover:!bg-elevated',
                active: false,
                parent_to: '/tes',
                defaultOpen: false,
                children: [
                  {
                    label: 'Broadcast Message', 
                    class:'',
                    to: '/tes',
                    active: false,
                  },
                  {
                    label: 'Feedback Rating', 
                    class:'',
                    to: '/tesx',
                    active: false,
                  },
                  
                ]
              },
              { 
                  label: 'RFQ',
                  icon: 'i-iconoir-chat-bubble',
                  class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                  to: '/x',
                  children:  null,
                  active: false,
              }, 
              { 
                  label: 'Event',
                  icon: 'i-material-symbols-light-event-available-sharp',
                  class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                  to: '/x',
                  children:  null,
                  active: false,
              }, 
              { 
                  label: 'Referral',
                  icon: 'i-mingcute-link-fill',
                  class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                  to: '/x',
                  children:  null,
                  active: false,
              }, 
              { 
                  label: 'Link Media',
                  icon: 'i-mi-link',
                  class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                  to: '/x',
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
              { 
                  label: 'Log Activity',
                  icon: 'i-ep-document',
                  class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                  to: '/x',
                  children:  null,
                  active: false,
              }, 
              { 
                  label: 'Log Search',
                  icon: 'i-material-symbols-light-document-search-outline-sharp',
                  class:' text-white hover:text-primary hover:bg-elevated rounded-md cursor-pointer', 
                  to: '/x',
                  children:  null,
                  active: false,
              }, 
              { 
                label: 'Export',
                icon: 'i-lucide-download',
                class:'text-white hover:text-primary  hover:!bg-elevated',
                active: false,
                parent_to: '/tesxxx',
                defaultOpen: false,
                children: [
                  {
                    label: 'Transaksi', 
                    class:'',
                    to: '/tesxx',
                    active: false,
                  },
                  {
                    label: 'RFQ', 
                    class:'',
                    to: '/tesxxx',
                    active: false,
                  },
                  
                ]
              },
              
        ]
  },
]