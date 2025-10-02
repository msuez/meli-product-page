import { redirect } from "next/navigation";

export default function Home() {
    const defaultSlug = "celulares";
    const defaultId = "a55-5g";

    redirect(`/${defaultSlug}/p/${defaultId}`);
}