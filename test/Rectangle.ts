// This file is for testing the Rectangle class

import Rectangle from "../src/Rectangle";
import RectangleTesteranto from "../src/RectangleTesteranto";

const RectangleSuite = RectangleTesteranto.Suite.default;
const Given = RectangleTesteranto.Given;
const When = RectangleTesteranto.When;
const Then = RectangleTesteranto.Then;

const suite = RectangleSuite(`testing the Rectangle class`, Rectangle.prototype, [
  Given.WidthOfOneAndHeightOfOne(`Set the width`, [
    When.WidthIsSetTo(3),
  ], [
    Then.WidthIs(3),
  ]),

  Given.WidthOfOneAndHeightOfOne(`Set the height`, [
    When.HeightIsSetTo(4),
  ], [
    Then.HeightIs(4),
  ]),

  Given.WidthOfOneAndHeightOfOne(`Check the area`, [
    When.HeightIsSetTo(4),
    When.WidthIsSetTo(3),
  ], [
    Then.AreaIs(12),
  ]),

  Given.WidthOfOneAndHeightOfOne(`Check the area and circumference`, [
    When.HeightIsSetTo(3),
    When.WidthIsSetTo(4),
    When.HeightIsSetTo(5),
    When.WidthIsSetTo(6),
  ], [
    Then.AreaIs(30),
    Then.CircumferenceIs(22),
  ]),

  Given.WidthOfOneAndHeightOfOne(`Check the area and circumference after publicly setting`, [
    When.HeightIsPubliclySetTo(3),
    When.WidthIsPubliclySetTo(4),
  ], [
    Then.AreaIs(12),
    Then.CircumferenceIs(14),
  ]),

  Given.WidthAndHeightOf(3, 5, `Set the height and width by constructor, then check the are and circumference`, [], [
    Then.AreaIs(15),
    Then.CircumferenceIs(16),
  ]),

  Given.Default('the default constructor', [], [
    Then.AreaIs(4),
    Then.CircumferenceIs(8),
    Then.WidthIs(2),
    Then.HeightIs(2),
  ])

]);

export default () => {
  suite.run();
}