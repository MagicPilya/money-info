import React from "react";
import { Fragment } from "react";
import {
  Category,
  Component,
  Variant,
  Palette,
} from "@react-buddy/ide-toolbox";
import MUIPalette from "@react-buddy/palette-mui";
import { Button } from "@mui/material";

export const PaletteTree = () => (
  <Palette>
    <Category name="App">
      <Component name="Loader">
        <Variant>
          <ExampleLoaderComponent />
        </Variant>
      </Component>
    </Category>
    <MUIPalette />
    <Category name="Inputs">
      <Component name="Button">
        <Variant name="button_addAccount">
          <Button variant="contained" sx={{ my: 2 }}>
            Contained
          </Button>
        </Variant>
      </Component>
    </Category>
  </Palette>
);

export function ExampleLoaderComponent() {
  return <Fragment>Loading...</Fragment>;
}
