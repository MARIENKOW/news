import BreadcrumbsComponent from "../../../../../../components/features/BreadcrumbsComponent";
import { ADMIN_BLOG_ROUTE } from "../../../../../../configs/routerLinks";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import BlogUpdate from "../../../../../../components/blog/update/BlogUpdate";
import { Box } from "@mui/material";

export default function () {
    return (
        <ContainerComponent>
            <BlogUpdate />
        </ContainerComponent>
    );
}
