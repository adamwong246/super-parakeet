import assert from "assert";
import {
  Suite,
  Given,
  When,
  Then,
} from "../testeranto/index";

import Rectangle from "./Rectangle";

export default {
  Suite: {
    default: (
      description: string,
      rectangle: Rectangle,
      givens: any[]
    ) => new Suite<Rectangle>(description, rectangle, givens)
  },
  Given: {
    WidthOfOneAndHeightOfOne: (
      feature: string,
      whens: When<Rectangle>[],
      thens: Then<Rectangle>[]
    ) => new Given(`width of 1 and height of 1`, whens, thens, feature, new Rectangle(1, 1)),
    WidthAndHeightOf: (
      width: number,
      height: number,
      feature: string,
      whens: When<Rectangle>[],
      thens: Then<Rectangle>[]
    ) => new Given(`width of "${width} and height of "${height}"`, whens, thens, feature, new Rectangle(height, width)),
    Default: (
      feature: string,
      whens: When<Rectangle>[],
      thens: Then<Rectangle>[]
    ) => new Given(`default width and height`, whens, thens, feature, new Rectangle())
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
