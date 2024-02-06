"use client";

import React, { Component } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CustomButton from "./button";
import Link from "next/link";

function truncateText(text: string, sentenceCount: number): string {
  const sentences = text.split(". ");
  console.log("Sentences:", sentences); // Tambahkan log untuk melihat nilai sentences
  const truncatedText = sentences.slice(0, sentenceCount).join(". ");
  console.log("Truncated Text:", truncatedText); // Tambahkan log untuk melihat nilai truncatedText

  return truncatedText;
}

interface MenuApi {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

interface MenuContainerState {
  menus: MenuApi[];
  activeButton: string;
}

export default class MenuContainer extends Component<{}, MenuContainerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      menus: [],
      activeButton: "all",
    };
  }

  handleClick = (buttonName: string): void => {
    this.setState({ activeButton: buttonName });
  };

  componentDidMount() {
    fetch("https://resto-solo-app-production.up.railway.app/api/menus/")
      .then((response) => response.json())
      .then((data: MenuApi[]) => this.setState({ menus: data }));
  }

  render() {
    const { menus, activeButton } = this.state;

    return (
      <div id="menu" className="bg-primary flex flex-col">
        <h4 className="font-semibold text-center text-lg text-orange-600 mb-6">Our Menu</h4>
        <Box
          className="mx-auto"
          sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Grid
            className="container items-center justify-center px-4 pb-16 text-center"
            container
            spacing={2}
            paddingY={2}
          >
            <Grid component="div" md={2} xs={6} sm={6} className="mx-3 mb-4">
              <CustomButton
                isactive={activeButton === "all"}
                onClick={() => this.handleClick("all")}
              >
                All
              </CustomButton>
            </Grid>
            <Grid component="div" md={2} xs={6} sm={6} className="mx-3 mb-4">
              <CustomButton
                isactive={activeButton === "appetizer"}
                onClick={() => this.handleClick("appetizer")}
              >
                Appetizer
              </CustomButton>
            </Grid>
            <Grid component="div" md={2} xs={6} sm={6} className="mx-3 mb-4">
              <CustomButton
                isactive={activeButton === "main course"}
                onClick={() => this.handleClick("main course")}
              >
                Main Course
              </CustomButton>
            </Grid>
            <Grid component="div" md={2} xs={6} sm={6} className="mx-3 mb-4">
              <CustomButton
                isactive={activeButton === "dessert"}
                onClick={() => this.handleClick("dessert")}
              >
                Dessert
              </CustomButton>
            </Grid>
          </Grid>
          <Grid
            className="container mx-auto px-10 flex flex-wrap justify-center"
            container
            spacing={2}
            paddingY={2}
            paddingBottom={18}
            data-aos="fade-up"
          >
            {menus
              .filter(
                (menu) =>
                  menu.category.toLowerCase() === activeButton ||
                  activeButton === "all"
              )
              .map((menu) => (
                <Grid
                  component="div"
                  className="mx-auto"
                  key={menu.name}
                  xs={9}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Link href={`/menu/${menu.id}`}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        minHeight: 400,
                        marginX: 2,
                        marginY: 2,
                        bgcolor: "#2B2A32",
                        color: "#FFFFFF",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            variant="rounded"
                            sx={{ bgcolor: "#1A1A1A" }}
                            aria-label="price"
                            style={{ borderRight: "1px solid #DDDDDD" }}
                          >
                            {`$${menu.price}`}
                          </Avatar>
                        }
                        title={menu.name}
                        subheader={`Dish - ${menu.category}`}
                        subheaderTypographyProps={{ color: "#FFFFFF" }}
                      />
                      <CardMedia
                        component="img"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "200px",
                        }}
                        src={menu.image}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="text-white"
                          style={{ height: "160px" }}
                        >
                          {truncateText(menu.description, 10)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Box>
      </div>
    );
  }
}
