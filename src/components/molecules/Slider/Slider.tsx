'use client'
import { forwardRef, useEffect, useRef } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'
import { toNumber } from 'lodash'

interface SliderProps {
  minValue: number
  maxValue: number
  step?: number
  id: string
  valueName?: string
  name?: string
  value?: string | number
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  props,
  ref
) {
  const {
    minValue,
    maxValue,
    step,
    id,
    valueName = '€',
    name,
    value,
    ...rest
  } = props
  const rangeRef = useRef(null)

  const progressScript = (sliderValue?: number | string) => {
    const sliderEl = rangeRef.current as any
    const currentValue = sliderValue || toNumber(sliderEl.value)
    const max = toNumber(sliderEl?.max)
    const progress = (toNumber(currentValue) / max) * 100
    sliderEl.style.background = `linear-gradient(to right, #21093a ${progress}%, #e9e9e9 ${progress}%)`
  }

  useEffect(() => {
    const sliderEl = rangeRef.current as any
    if (typeof window !== 'undefined') {
      progressScript(value)
      sliderEl?.addEventListener('input', (event: Event) => {
        const tempSlider = event?.target as HTMLInputElement
        const tempSliderValue = Number(tempSlider?.value)
        progressScript(tempSliderValue)
      })
      return () => {
        sliderEl.removeEventListener('input', (event: Event) => {
          const tempSlider = event?.target as HTMLInputElement
          const tempSliderValue = Number(tempSlider?.value)
          progressScript(tempSliderValue)
        })
      }
    }
  }, [rest])

  return (
    <div className={classes.sliderContainer}>
      <input
        name={name}
        ref={rangeRef}
        className={classNames(classes.rangeField, classes.js)}
        id={id}
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        step={step || 10}
        {...rest}
      />
      <div className={classes.minMax}>
        <span className={classes.label}>
          {minValue} {valueName}
        </span>
        <span className={classes.label}>
          {maxValue} {valueName}
        </span>
      </div>
    </div>
  )
})

export default Slider
