export default {
    forms: {
        keystore: [
            {
                label: "Alias",
                name: "alias",
                required: true,
                placeholder: 'MyApp',
            },
            {
                label: "Key Password",
                name: "key_password",
                required: true,
                type: 'password'
            },
            {
                label: "Store Password",
                name: "store_password",
                required: true,
                type: "password"
            },
            {
                label: "Full Name",
                name: "full_name",
                required: true,
                placeholder: "John Doe"
            },
            {
                label: "Organization",
                name: "organization",
            },
            {
                label: "Country",
                name: "country",
                required: true,
                placeholder: "ID"
            }
        ],
        build: [
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
    }
}