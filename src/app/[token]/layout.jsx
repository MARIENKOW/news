import { Box } from "@mui/system";
import { HeaderWrapper } from "../../components/layout/HeaderWrapper";
import AccessService from "../../services/AccessService";
import RedirectToGoogle from "../../components/features/RedirectToGoogle";
import { MainContainer } from "../../components/MainContainer";

const access = new AccessService();

export default async function Layout({ children, params }) {
    const { token } = await params;
    if (!token) return <RedirectToGoogle />;
    let data;
    try {
        const body = await access.checkToken(token);
        data = body.data;
    } catch (error) {
        console.log(error);
    }
    if (!data) return <RedirectToGoogle />;
    return (
        <MainContainer>
            <Box flex={1} display={"flex"} flexDirection={"column"}>
                <HeaderWrapper token={token} />
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    flex={1}
                    position={"relative"}
                    zIndex={"10 "}
                >
                    {children}
                </Box>
            </Box>
        </MainContainer>
    );
}
