"use client";
import Box from "@mui/material/Box";
import { ContainerComponent } from "../wrappers/ContainerComponent";
import Link from "next/link";
import { MAIN_ROUTE, NEWS_ROUTE, SHORT_ROUTE } from "../../configs/routerLinks";

import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useScrolled } from "../../hooks/useScrolled";

const ClientHeader = ({ device }) => {
    const { token } = useParams();
    const scrolled = useScrolled(300);
    if (!scrolled) return null;
    return (
        <Box
            position={"fixed"}
            top={0}
            left={0}
            p={device === "desktop" ? 0.2 : 1.5}
            bgcolor={device === "desktop" ? "primary.main" : 'background.default'}
            width={"100%"}
            zIndex={1000}
        >
            <ContainerComponent sx={{ p: { xs: 0 } }}>
                <Box display={"flex"} gap={2}>
                    <Link href={SHORT_ROUTE(token)}>
                        <Typography fontSize={device === "desktop" ? 15 : 16.5}>
                            Коротко
                        </Typography>
                    </Link>
                    <Link href={NEWS_ROUTE(token)}>
                        <Typography fontSize={device === "desktop" ? 15 : 16.5}>
                            Новости
                        </Typography>
                    </Link>
                </Box>
            </ContainerComponent>
        </Box>
    );
};

export default ClientHeader;
