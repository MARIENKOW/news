import { Box, Divider } from "@mui/material";
import Header from "./Header";
import Link from "next/link";
import Image from "next/image";
import { MAIN_ROUTE } from "../../configs/routerLinks";
import { getDevice } from "../../lib/got-device";
import ClientHeader from "../../components/layout/ClientHeader";
import WeatherWidget from "../../components/features/Weather";

export const HeaderWrapper = async ({ token }) => {
    const device = await getDevice();
    return (
        <Box display={"flex"} flexDirection={"column"} pt={0.9}>
            <Box
                pb={device === "desktop" ? 2.3 : 0.5}
                display={"flex"}
                justifyContent={"center"}
            >
                {device === "desktop" ? (
                    <Link href={MAIN_ROUTE(token)}>
                        <Image
                            alt="logo"
                            width={176}
                            height={75}
                            src={"/logo.png"}
                        />
                    </Link>
                ) : (
                    <Link href={MAIN_ROUTE(token)}>
                        <Image
                            alt="logo"
                            width={124}
                            height={35}
                            src={"/logo1.png"}
                        />
                    </Link>
                )}
            </Box>
            <Box>
                <Header token={token} />
                <ClientHeader device={device} />
            </Box>
            {device === "desktop" ? null : <Divider sx={{ height: 0.8 }} />}
            <WeatherWidget />
        </Box>
    );
};
