'use client';

import { ReactNode, useState } from 'react';
import {
    Smartphone,
    HardDrive,
    Camera,
    Wifi,
    Fingerprint,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

interface ProductSpecsProps {
    attributes: Record<string, string | boolean>;
}

export default function ProductSpecs({ attributes }: ProductSpecsProps) {
    const [expanded, setExpanded] = useState(false);

    const icons: Record<string, ReactNode> = {
        screen_size: <Smartphone className="w-5 h-5 text-secondary" />,
        ram: <HardDrive className="w-5 h-5 text-secondary" />,
        storage: <HardDrive className="w-5 h-5 text-secondary" />,
        main_camera: <Camera className="w-5 h-5 text-secondary" />,
        front_camera: <Camera className="w-5 h-5 text-secondary" />,
        nfc: <Wifi className="w-5 h-5 text-secondary" />,
        unlock: <Fingerprint className="w-5 h-5 text-secondary" />,
    };

    const entries = Object.entries(attributes);
    const visibleEntries = expanded ? entries : entries.slice(0, 4);

    return (
        <div className="p-4 bg-white">
            <h2 className="font-semibold text-foreground mb-4 text-base">
                Características del producto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {visibleEntries.map(([key, value]) => (
                    <div key={key} className="flex items-start gap-2">
                        {icons[key] || <Smartphone className="w-5 h-5 text-secondary" />}
                        <p className="text-secondary">
                            <span className="font-medium capitalize">
                                {key.replace('_', ' ')}:
                            </span>{' '}
                            {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
                        </p>
                    </div>
                ))}
            </div>

            {entries.length > 4 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-primary text-xs mt-7 hover:underline cursor-pointer"
                >
                    {expanded ? (
                        <>
                            Ver menos características <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Ver todas las características <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
