"use client";

import { Box, Menu, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const cities = {
    "Тель-Авив": { lat: 32.0853, lon: 34.7818 },
    "Эйн-Геди": { lat: 31.4621, lon: 35.3886 },
    Тверия: { lat: 32.794, lon: 35.53 },
    Эйлат: { lat: 29.5569, lon: 34.9519 },
    Ашдод: { lat: 31.8044, lon: 34.6553 },
    "Беэр-Шева": { lat: 31.2518, lon: 34.7913 },
    Хайфа: { lat: 32.794, lon: 34.9896 },
    Иерусалим: { lat: 31.7683, lon: 35.2137 },
    Афула: { lat: 32.6078, lon: 35.2897 },
    "Мицпе-Рамон": { lat: 30.61, lon: 34.801 },
    "Бейт-Шеан": { lat: 32.5021, lon: 35.499 },
    Цфат: { lat: 32.9646, lon: 35.496 },
    Кацрин: { lat: 32.9946, lon: 35.6918 },
    Лод: { lat: 31.9516, lon: 34.895 },
    Назарет: { lat: 32.6996, lon: 35.3035 },
};

const getIcon = (code, precipitation) => {
    if (precipitation >= 50) return "🌧️";
    if (precipitation >= 30) return "🌦️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75, 85, 86].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "☀️";
};

export default function WeatherWidget() {
    const [city, setCity] = useState("Тель-Авив");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const { lat, lon } = cities[city];
        setError(null);
        setWeather(null);

        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=temperature_2m,weathercode` +
                `&daily=temperature_2m_max,precipitation_probability_max` +
                `&timezone=Asia%2FJerusalem&forecast_days=1`,
        )
            .then((r) => r.json())
            .then((d) => {
                setWeather({
                    temp: Math.round(d.current.temperature_2m),
                    code: d.current.weathercode,
                    high: Math.round(d.daily.temperature_2m_max[0]),
                    precipitation: d.daily.precipitation_probability_max[0],
                });
            })
            .catch(() => setError("Не удалось загрузить данные"));
    }, [city]);

    if (error || !weather) return null;

    return (
        <Box>
            <Menu
                sx={{
                    ul: {
                        p: 0,
                    },
                }}
                onClose={handleClose}
                anchorEl={anchorEl}
                onChange={() => console.log("object")}
                open={open}
            >
                {Object.keys(cities).map((c) => (
                    <Typography
                        sx={{ cursor: "pointer", pl: 2, pr: 2, pt: 1, pb: 1 }}
                        onClick={() => {
                            setCity(c);
                            handleClose();
                        }}
                        key={c}
                    >
                        {c}
                    </Typography>
                ))}
            </Menu>

            <Box
                p={2}
                sx={{ display: "inline-flex", cursor: "pointer" }}
                onClick={handleClick}
                ref={ref}
                display={"flex"}
                alignItems={"start"}
            >
                <div
                    style={{
                        textAlign: "center",
                        lineHeight: 1,
                    }}
                >
                    {getIcon(weather.code, weather.precipitation)}
                </div>

                <Box
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        lineHeight: "14px",
                        fontWeight: 400,
                    }}
                >
                    {weather.temp}° Погода
                </Box>
                <Box mt={-0.4} >
                    <ExpandMoreIcon />
                </Box>
            </Box>
        </Box>
    );
}
