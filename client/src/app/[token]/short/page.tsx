import BlogService from "../../../services/BlogService";
import { BlogsShort } from "../../../components/blog/BlogsShort";
import ErrorElement from "../../../components/ErrorElement";
import ThemeChange from "../../../components/features/ThemeChange";
import { Box } from "@mui/material";
import { getThemeMode } from "../../../components/theme/themeMode";
const blog = new BlogService();

export default async function Page({ params }) {
    const serverMode = await getThemeMode();
    const { token } = await params;
    let data: any[];
    let error: unknown;
    try {
        const body = await blog.getShort();
        data = body.data;
    } catch (e) {
        console.log(e);
        error = e;
    }
    if (error) return <ErrorElement />;

    if (!data) return "";
    return (
        <Box>
            <ThemeChange serverMode={serverMode} />
            <BlogsShort token={token} data={data} />
        </Box>
    );
    return "";
}
