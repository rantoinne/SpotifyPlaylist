import { color } from '../theme';

type GradientOffsetProps = {
  xOffset: number,
  yOffset: number,
};

export const getGradientOffsets = ({
  xOffset,
  yOffset,
}: GradientOffsetProps) => ({ x: xOffset, y: yOffset });

const GradientColors = [
  {
    colors: [color.border, color.background],
    text: color.border,
  },
  {
    colors: [color.textBlack, color.background],
    text: color.textBlack,
  },
  {
    colors: [color.link, color.background],
    text: color.link,
  },
  {
    colors: [color.sliderYellow, color.background],
    text: color.sliderYellow,
  },
  {
    colors: [color.toastErrorBorder, color.background],
    text: color.toastErrorBorder,
  },
  {
    colors: [color.choco, color.background],
    text: color.choco,
  },
  {
    colors: [color.toastInfoBorder, color.background],
    text: color.toastInfoBorder,
  },
];

export const getGradientColorsSet = () => {
  const index = Math.floor(Math.random() * (GradientColors.length) + 0);
  return GradientColors[index];
};
