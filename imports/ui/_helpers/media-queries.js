import { css } from 'styled-components'

const sizes = {
  huge: 1600,
  big: 1280,
  medium: 960,
  small: 640,
  mini: 320
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
