import BlogsUser from "../../components/blog/BlogsUser";
import { Box } from "@mui/material";
import { BlogItemMain } from "../../components/blog/item/BlogItemMain";
import { ContainerComponent } from "../../components/wrappers/ContainerComponent";
import { BlogsImportant } from "../../components/blog/BlogsImportant";
import { BlogsShort } from "../../components/blog/BlogsShort";

export default async function Page({ params }) {
    const { token } = await params;
    return (
        <Box >
            <Box display={"flex"} flexDirection={"column"} gap={7}>
                {/* <BlogsShort /> */}
                <BlogItemMain token={token} />
                <BlogsImportant />
                <ContainerComponent>
                    <BlogsUser />
                </ContainerComponent>
            </Box>
        </Box>
    );
}
