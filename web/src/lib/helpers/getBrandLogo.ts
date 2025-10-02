const brandLogos: Record<string, string> = {
    samsung: "/samsung.png",
    apple: "/apple.png",
    xiaomi: "/xiaomi.png",
    motorola: "/motorola.png",
    google: "/google.png",
    oneplus: "/oneplus.png",
};

export function getBrandLogo(brandOrName?: string): string {
    if (!brandOrName) return "/default.png";

    const normalized = brandOrName.toLowerCase();
    const match = Object.keys(brandLogos).find((key) =>
        normalized.includes(key)
    );

    return match ? brandLogos[match] : "/default.png";
}
