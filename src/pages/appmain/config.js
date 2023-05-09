export default {
    forms: {
        masterApp: [
            {
                label: "App Name",
                name: "name",
                required: true,
                placeholder: 'Example',
            },
            {
                label: "Package Name",
                name: "package_name",
                required: true,
                placeholder: 'com.example.example',
            },
            {
                label: "Version Code",
                name: "version_code",
                required: true,
                placeholder: '1',
            },
            {
                label: "Version Name",
                name: "version_name",
                required: true,
                placeholder: '1.1',
            },
            {
                label: "Privacy Policy Link",
                name: "privacy_policy_link",
            },
        ],
        style: [
            {
                label: "Color Primary",
                name: "color_primary",
                required: true,
            },
            {
                label: "Color Primary Variant",
                name: "color_primary_variant",
                required: true,
            },
            {
                label: "Color On Primary",
                name: "color_on_primary",
                required: true,
            },
            {
                label: "Color Secondary",
                name: "color_secondary",
                required: true,
            },
            {
                label: "Color Secondary Variant",
                name: "color_secondary_variant",
                required: true,
            },
            {
                label: "Color On Secondary",
                name: "color_on_secondary",
                required: true,
            },
        ],
        string: [
            {
                label: "Set As Wallpaper",
                name: "set_as_wallpaper",
                required: true
            },
            {
                label: "Home Screen",
                name: "set_wallpaper_home",
                required: true
            },
            {
                label: "Lock Screen",
                name: "set_wallpaper_lock",
                required: true
            },
            {
                label: "Home + Lock Screen",
                name: "wallpaper_both",
                required: true
            },
            {
                label: "Cancel",
                name: "cancel",
                required: true
            },
            {
                label: "Set Wallpaper Success",
                name: "success_set_wallpaper",
                required: true
            },
            {
                label: "Exit Message",
                name: "exit_message",
                required: true
            },
            {
                label: "No Connection Message",
                name: "no_connection_message",
                required: true
            },
            {
                label: "Privacy Policy Text",
                name: "privacy_policy_text"
            },
        ]
    }
}