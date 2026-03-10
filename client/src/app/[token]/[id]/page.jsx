import BreadcrumbsComponent from "../../../components/features/BreadcrumbsComponent";
import { ContainerComponent } from "../../../components/wrappers/ContainerComponent";
import { Box } from "@mui/material";
import { MAIN_ROUTE } from "../../../configs/routerLinks";
import BlogService from "../../../services/BlogService";
import RedirectWithMessage from "../../../components/events/RedirectWithMessage";
import BlogFullItem from "../../../components/blog/item/BlogFullItem";
import { BlogsImportant } from "../../../components/blog/BlogsImportant";
import { notFound } from "next/navigation";
import ErrorElement from "../../../components/ErrorElement";

const blog = new BlogService();

export default async function Page({ params }) {
    const { id } = await params;

    try {
        const { data } = await blog.getById(id);

        if (!data) throw new notFound();
        return (
            <Box pb={0} overflow={"hidden"} position={"relative"}>
                <BlogFullItem Blog={data} />
                <BlogsImportant />
            </Box>
        );
    } catch (error) {
        return <ErrorElement />;
    }
}
