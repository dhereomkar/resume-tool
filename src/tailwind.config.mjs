/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "400" }],
                sm: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "400" }],
                base: ["1rem", { lineHeight: "1.5", letterSpacing: "0.025em", fontWeight: "400" }],
                lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.025em", fontWeight: "600" }],
                xl: ["1.5rem", { lineHeight: "1.4", letterSpacing: "0.03em", fontWeight: "700" }],
                "2xl": ["2rem", { lineHeight: "1.3", letterSpacing: "0.03em", fontWeight: "700" }],
                "3xl": ["2.5rem", { lineHeight: "1.2", letterSpacing: "0.035em", fontWeight: "700" }],
                "4xl": ["3rem", { lineHeight: "1.1", letterSpacing: "0.04em", fontWeight: "800" }],
                "5xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "0.04em", fontWeight: "800" }],
                "6xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "0.045em", fontWeight: "900" }],
                "7xl": ["5rem", { lineHeight: "1.05", letterSpacing: "0.05em", fontWeight: "900" }],
                "8xl": ["6rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900" }],
                "9xl": ["8rem", { lineHeight: "1", letterSpacing: "0.06em", fontWeight: "900" }],
            },
            fontFamily: {
                heading: ["montserrat"],
                paragraph: ["madefor-display"]
            },
            colors: {
                destructive: "#DF3131",
                "destructive-foreground": "#FFFFFF",
                grey100: "#E5E5E5",
                grey300: "#E5E5E5",
                grey500: "#585858",
                grey700: "#585858",
                grey900: "#000000",
                background: "#FFFFFF",
                secondary: "#585858",
                foreground: "#000000",
                "secondary-foreground": "#FFFFFF",
                "primary-foreground": "#000000",
                primary: "#D4FF5E",
                subtledivider: "#E5E5E5",
                "primary-foreground-token-do-not-use": "#FFFFFF",
                "primary-token-do-not-use": "#000000",
                brandaccent: "#BA5A1D"
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
