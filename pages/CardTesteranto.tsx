import assert from "assert";
import React from "react";
import {
  Suite,
  Given,
  When,
  Then,
} from "../testeranto/index";

import type { ICardProps } from "./Card";
import { Card } from "./Card";

export default {
  Suite: {
    default: (
      description: string,
      card: ({ title, paragraph }: ICardProps) => JSX.Element,
      givens: any[]
    ) => new Suite(description, card, givens)
  },
  Given: {
    Default: (
      feature: string,
      whens: When<ICardProps>[],
      thens: Then<ICardProps>[]
    ) => new Given(`default`, whens, thens, feature, React.createElement(Card({ title: "", paragraph: "" })))
  },

  When: {
    WidthIsPubliclySetTo: (width: number) =>
      new When<Rectangle>(`the width is set to "${width}"`, (rectangle) =>
        rectangle.width = width
      ),
    HeightIsPubliclySetTo: (height: number) =>
      new When<Rectangle>(`the height is set to "${height}"`, (rectangle) =>
        rectangle.height = height
      ),
    WidthIsSetTo: (width: number) =>
      new When<Rectangle>(`the width is set to "${width}"`, (rectangle) =>
        rectangle.setWidth(width)
      ),
    HeightIsSetTo: (height: number) =>
      new When<Rectangle>(`the height is set to "${height}"`, (rectangle) =>
        rectangle.setHeight(height)
      )
  },

  Then: {
    WidthIs: (width: number) =>
      new Then(`the width is "${width}"`, (rectangle: Rectangle) =>
        assert.equal(rectangle.width, width)
      ),
    HeightIs: (height: number) =>
      new Then(`the height is "${height}"`, (rectangle: Rectangle) =>
        assert.equal(rectangle.height, height)
      ),
    AreaIs: (area: number) =>
      new Then(`the area is "${area}"`, (rectangle: Rectangle) =>
        assert.equal(rectangle.area(), area)
      ),
    CircumferenceIs: (circumference: number) =>
      new Then(`the circumference is "${circumference}"`, (rectangle: Rectangle) =>
        assert.equal(rectangle.circumference(), circumference)
      )
  }
};
