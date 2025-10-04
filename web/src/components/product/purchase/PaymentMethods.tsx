'use client';

import Image from "next/image";
import { CreditCard } from "lucide-react";
import { PAYMENT_METHODS_LOGOS, PAYMENT_METHODS_CATEGORIES } from "@/lib/helpers/paymentMethods";

interface PaymentMethodsProps {
    methods?: string[];
}

export default function PaymentMethods({ methods = [] }: PaymentMethodsProps) {
    if (!methods.length) return null;

    return (
        <section
            className="border border-border rounded-lg p-4 space-y-6 bg-white"
            aria-labelledby="payment-methods-title"
        >
            <h3
                id="payment-methods-title"
                className="font-semibold text-secondary text-base"
            >
                Medios de pago
            </h3>
            <div className="bg-success text-white text-sm font-medium px-3 py-2 rounded flex items-center gap-x-2">
                <CreditCard size={16} aria-hidden="true" />
                <span>¡Pagá en hasta 12 cuotas sin interés!</span>
            </div>
            {Object.entries(PAYMENT_METHODS_CATEGORIES).map(([category, supported]) => {
                const filtered = methods.filter((m) => supported.includes(m));
                if (!filtered.length) return null;

                return (
                    <div key={category}>
                        <h4 className="text-sm text-foreground font-medium capitalize">
                            {category === "credit" && "Tarjetas de crédito"}
                            {category === "debit" && "Tarjetas de débito"}
                            {category === "cash" && "Efectivo"}
                        </h4>

                        <div className="flex flex-wrap gap-3 mt-2">
                            {filtered.map((method) => (
                                <div
                                    key={method}
                                    className="relative w-[50px] h-[30px]"
                                    aria-label={`${method} logo`}
                                >
                                    <Image
                                        src={PAYMENT_METHODS_LOGOS[method]}
                                        alt={`${method} logo`}
                                        fill
                                        sizes="50px"
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            <a
                href="#"
                className="text-primary text-sm hover:underline block mt-2"
            >
                Conocé otros medios de pago
            </a>
        </section>
    );
}
