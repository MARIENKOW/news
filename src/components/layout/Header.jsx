"use server";
import Box from "@mui/material/Box";
import { ContainerComponent } from "../wrappers/ContainerComponent";
import Link from "next/link";
import { MAIN_ROUTE, NEWS_ROUTE, SHORT_ROUTE } from "../../configs/routerLinks";
import ThemeChange from "../features/ThemeChange";
import { getThemeMode } from "../theme/themeMode";
import Typography from "@mui/material/Typography";
import { getDevice } from "../../lib/got-device";

const Header = async ({ token }) => {
    // const serverMode = await getThemeMode();
    const device = await getDevice();
    return (
        <Box
            p={device === "desktop" ? 0.2 : 1.5}
            bgcolor={device === "desktop" ? "primary.main" : "inherit"}
            width={"100%"}
            zIndex={1000}
        >
            <ContainerComponent sx={{ p: { xs: 0 } }}>
                <Box display={"flex"} gap={2}>
                    <Link href={SHORT_ROUTE(token)}>
                        <Typography
                            fontSize={device === "desktop" ? 15 : 16.5}
                            color={
                                device === "desktop"
                                    ? "primary.contrastText"
                                    : "initial"
                            }
                        >
                            Коротко
                        </Typography>
                    </Link>
                    <Link href={NEWS_ROUTE(token)}>
                        <Typography
                            fontSize={device === "desktop" ? 15 : 16.5}
                            color={
                                device === "desktop"
                                    ? "primary.contrastText"
                                    : "initial"
                            }
                        >
                            Новости
                        </Typography>
                    </Link>
                    {/* <ThemeChange serverMode={serverMode} /> */}
                </Box>
            </ContainerComponent>
        </Box>
    );
};

export default Header;
