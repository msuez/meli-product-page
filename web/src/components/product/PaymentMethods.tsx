import Image from "next/image";
import { CreditCard } from "lucide-react";

interface PaymentMethodsProps {
    methods: {
        credit: string[];
        debit: string[];
        cash: string[];
    };
}

export default function PaymentMethods({ methods }: PaymentMethodsProps) {
    return (
        <div className="border border-border rounded-lg p-4 space-y-4 bg-white">
            {/* Title */}
            <h3 className="font-semibold text-secondary text-base">
                Medios de pago
            </h3>

            {/* Green offer */}
            <div className="bg-success text-white text-sm font-medium px-3 py-2 rounded flex items-center gap-x-2">
                <CreditCard size={16} className="text-white" />
                <span>¡Pagá en hasta 12 cuotas sin interés!</span>
            </div>

            {/* Credit Cards */}
            <div>
                <h4 className="text-sm text-foreground">
                    Tarjetas de crédito
                </h4>
                <p className="text-xs text-secondary mb-2">
                    ¡Cuotas sin interés con bancos seleccionados!
                </p>
                <div className="flex flex-wrap gap-3">
                    {methods.credit.map((logo) => (
                        <Image
                            key={logo}
                            src={logo}
                            alt="credit-card"
                            width={50}
                            height={30}
                            className="object-contain"
                        />
                    ))}
                </div>
            </div>

            {/* Debit Cards */}
            <div>
                <h4 className="text-sm text-foreground">
                    Tarjetas de débito
                </h4>
                <div className="flex flex-wrap gap-3">
                    {methods.debit.map((logo) => (
                        <Image
                            key={logo}
                            src={logo}
                            alt="debit-card"
                            width={50}
                            height={30}
                            className="object-contain"
                        />
                    ))}
                </div>
            </div>

            {/* Efectivo */}
            <div>
                <h4 className="text-sm text-foreground">Efectivo</h4>
                <div className="flex flex-wrap gap-3">
                    {methods.cash.map((logo) => (
                        <Image
                            key={logo}
                            src={logo}
                            alt="cash"
                            width={50}
                            height={30}
                            className="object-contain"
                        />
                    ))}
                </div>
            </div>

            {/* Link */}
            <a
                href="#"
                className="text-primary text-sm hover:underline block mt-2"
            >
                Conoce otros medios de pago
            </a>
        </div>
    );
}
