import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { CardHeader } from "@mui/material";
import { grey, orange, red } from "@mui/material/colors";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import Link from "next/link";
import { BlogItemContent } from "./BlogItemContent";
import * as React from "react";
import { StarCheckbox } from "./StarCheckbox";
import { ShortCheckbox } from "./ShortCheckbox";
import {
    ADMIN_BLOG_UPDATE_ROUTE,
    BLOG_ROUTE,
} from "../../../configs/routerLinks";
import { enqueueSnackbar } from "notistack";
import BlogService from "../../../services/BlogService";
import { CanceledError } from "axios";
import { useParams } from "next/navigation";

const blogImportant = new BlogService();
const blogShort = new BlogService();

const BlogItem = ({ Blog, deletePost, deleteMainPost, setMainPost }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menu = Boolean(anchorEl);
    const [checked, setChecked] = useState(!!Blog.is_important);
    const [checkedShort, setCheckedShort] = useState(!!Blog.is_short);
    const { token } = useParams();

    console.log(token);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const changeImportant = async () => {
        try {
            await blogImportant.setImportant(Blog.id, {
                is_important: !checked,
            });
            setChecked((v) => !v);
            enqueueSnackbar("(важные) Статус новости изменен", {
                variant: "success",
            });
        } catch (error) {
            if (error instanceof CanceledError) return;
            enqueueSnackbar("Упс! что-то пошло не так", {
                variant: "error",
            });
        }
    };
    const changeShort = async () => {
        try {
            await blogShort.setShort(Blog.id, {
                is_short: !checkedShort,
            });
            setCheckedShort((v) => !v);
            enqueueSnackbar("(короткие) Статус новости изменен", {
                variant: "success",
            });
        } catch (error) {
            if (error instanceof CanceledError) return;
            enqueueSnackbar("Упс! что-то пошло не так", {
                variant: "error",
            });
        }
    };

    if (!Blog) return "";
    return (
        <Card
            component={"div"}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                // bgcolor: "transparent",
                boxShadow: "none",
            }}
        >
            <CardHeader
                sx={{
                    bgcolor: Blog?.is_main ? "warning.light" : "inherit",
                    p: "10px !important",
                    "& .MuiCardHeader-action": {
                        marginTop: "0px !important",
                        marginBottom: "0px !important",
                    },
                }}
                avatar={
                    <>
                        <StarCheckbox
                            getData={changeImportant}
                            checked={checked}
                        />
                        <ShortCheckbox
                            getData={changeShort}
                            checked={checkedShort}
                        />
                    </>
                }
                action={
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={menu ? "long-menu" : undefined}
                        aria-expanded={menu ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon
                            color={Blog?.is_main ? "warning" : "inherit"}
                            fontSize="medium"
                        />
                    </IconButton>
                }
            />
            <Menu
                id="long-menu"
                open={menu}
                onClose={handleClose}
                anchorEl={anchorEl}
                sx={{ paddingBottom: 0 }}
            >
                {Blog?.is_main ? (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            deleteMainPost(Blog?.id);
                        }}
                    >
                        <ListItemIcon>
                            <VerifiedIcon color="warning" />
                        </ListItemIcon>
                        <Typography
                            color="warning"
                            textTransform="capitalize"
                            textAlign="center"
                        >
                            Снять главную новость
                        </Typography>
                    </MenuItem>
                ) : (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            setMainPost(Blog?.id);
                        }}
                    >
                        <ListItemIcon>
                            <VerifiedIcon color="warning" />
                        </ListItemIcon>
                        <Typography
                            textTransform="capitalize"
                            textAlign="center"
                            color="warning"
                        >
                            Сделать главной новостью
                        </Typography>
                    </MenuItem>
                )}
                <Link target="_blank" href={BLOG_ROUTE(token) + "/" + Blog?.id}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <OpenInNewIcon />
                        </ListItemIcon>
                        <Typography>Просмотреть</Typography>
                    </MenuItem>
                </Link>
                <Link href={ADMIN_BLOG_UPDATE_ROUTE + "/" + Blog?.id}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        Редактировать
                    </MenuItem>
                </Link>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        deletePost(Blog?.id, Blog?.title);
                    }}
                >
                    <ListItemIcon>
                        <DeleteForeverIcon color="error" />
                    </ListItemIcon>
                    <Typography
                        color="error"
                        textTransform="capitalize"
                        textAlign="center"
                    >
                        Удалить
                    </Typography>
                </MenuItem>
            </Menu>
            <BlogItemContent Blog={Blog} />
        </Card>
    );
};

export default BlogItem;
