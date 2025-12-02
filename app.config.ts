export default defineAppConfig({
  ui: {
    navigationMenu: {
            variants:{
                    "active": {
                                "true": {
                                    "childLink": "before:bg-pool-50 text-highlighted",
                                    "childLinkIcon": "text-default"
                                },
                                "false": {
                                    "link": " text-white hover:!bg-elevated rounded-md hover:!text-primary",
                                    "linkLeadingIcon": "text-white hover:!bg-elevated group-hover:!text-primary",
                                    "childLink": [
                                    "hover:before:bg-elevated/50 text-default hover:text-highlighted",
                                    "transition-colors before:transition-colors"
                                    ],
                                    "childLinkIcon": [
                                    "text-dimmed group-hover:text-default",
                                    "transition-colors"
                                    ]
                                }
                                },
            }
        }
    }
})