
export const PAYMENT_METHODS_LOGOS: Record<string, string> = {
    VISA: "/payments/visa.png",
    Mastercard: "/payments/mastercard.png",
    AMEX: "/payments/amex.png",
    OCA: "/payments/oca.png",
    Abitab: "/payments/abitab.png",
    Redpagos: "/payments/redpagos.png",
};

export const PAYMENT_METHODS_CATEGORIES: Record<string, string[]> = {
    credit: ["VISA", "Mastercard", "AMEX", "OCA"],
    debit: ["VISA", "Mastercard"],
    cash: ["Abitab", "Redpagos"],
};
