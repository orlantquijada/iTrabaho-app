import { gray } from '@radix-ui/colors'
import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

export const stitches = createStitches({
  theme: {
    colors: {
      erorr: 'hsla(0 100% 67.8% / var(--opacity))',
      ...gray,
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '10px',
      5: '12px',
      6: '14px',
      7: '16px',
      8: '18px',
      9: '20px',
      10: '24px',
      pill: '999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    fonts: {
      default:
        "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    },
    fontWeights: {},
    borderStyles: {},
    borderWidths: {},
    letterSpacings: {},
    lineHeights: {},
    shadows: {},
    transitions: {},
    fontSizes: {},
  },
  utils: {
    m: (v: Stitches.PropertyValue<'margin'>) => ({ margin: v }),
    mt: (v: Stitches.PropertyValue<'margin'>) => ({ marginTop: v }),
    mr: (v: Stitches.PropertyValue<'margin'>) => ({ marginRight: v }),
    mb: (v: Stitches.PropertyValue<'margin'>) => ({ marginBottom: v }),
    ml: (v: Stitches.PropertyValue<'margin'>) => ({ marginLeft: v }),
    mx: (v: Stitches.PropertyValue<'marginInline'>) => ({ marginInline: v }),
    my: (v: Stitches.PropertyValue<'marginBlock'>) => ({ marginBlock: v }),

    p: (v: Stitches.PropertyValue<'padding'>) => ({ padding: v }),
    pt: (v: Stitches.PropertyValue<'padding'>) => ({ paddingTop: v }),
    pr: (v: Stitches.PropertyValue<'padding'>) => ({ paddingRight: v }),
    pb: (v: Stitches.PropertyValue<'padding'>) => ({ paddingBottom: v }),
    pl: (v: Stitches.PropertyValue<'padding'>) => ({ paddingLeft: v }),
    px: (v: Stitches.PropertyValue<'paddingInline'>) => ({ paddingInline: v }),
    py: (v: Stitches.PropertyValue<'paddingBlock'>) => ({ paddingBlock: v }),

    gapy: (v: Stitches.PropertyValue<'rowGap'>) => ({ rowGap: v }),
    gapx: (v: Stitches.PropertyValue<'columnGap'>) => ({ columnGap: v }),

    rt: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: v,
      borderTopRightRadius: v,
    }),
    rb: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderBottomLeftRadius: v,
      borderBottomRightRadius: v,
    }),
    rl: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: v,
      borderBottomLeftRadius: v,
    }),
    rr: (v: Stitches.PropertyValue<'borderRadius'>) => ({
      borderTopRightRadius: v,
      borderBottomRightRadius: v,
    }),

    linearGradient: (v: Stitches.PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${v})`,
    }),
  },
})

export const { css, styled, config, getCssText, globalCss, keyframes, theme } =
  stitches

export type CSS = Stitches.CSS<typeof config>

export const globalStyles = globalCss({
  '*, ::after, ::before': {
    boxSizing: 'border-box',
  },

  ':root': {
    '--opacity': 1,
  },

  '*': {
    fontFamily: 'inherit',
  },

  body: {
    fontFamily: '$default',
  },

  'body, html': {
    margin: 0,
    padding: 0,
  },
})

type DefaultThemeMapKeys = keyof Stitches.DefaultThemeMap
type ThemeKey<T extends DefaultThemeMapKeys> = Stitches.DefaultThemeMap[T]
type TokenKeys<T extends keyof typeof config.theme> = Exclude<
  keyof typeof config.theme[T],
  symbol
>

export type KeysToPropMap<Prop extends DefaultThemeMapKeys> = Record<
  TokenKeys<ThemeKey<Prop>>,
  Record<Prop, `$${TokenKeys<ThemeKey<Prop>>}`>
>

/**
 *
 * @param cssProp CamelCased CSS Property (color, background, fontSize)
 * @returns a record of mapped design tokens to css property with the design token's value as its value
 * @example
 * mapThemeToCSSProp('color')
 * // generates
 * {
 *    primary1: { color: '$primary1' },
 *    primary2: { color: '$primary2' },
 *    primary3: { color: '$primary3' },
 *    ...
 * }
 */
export function mapThemeToCSSProp<T extends DefaultThemeMapKeys>(cssProp: T) {
  const themeKey = config.themeMap[cssProp]
  return Object.fromEntries(
    Object.entries(theme[themeKey]).map(([key]) => [
      key,
      { [cssProp]: `$${key}` },
    ])
  ) as KeysToPropMap<T>
}
