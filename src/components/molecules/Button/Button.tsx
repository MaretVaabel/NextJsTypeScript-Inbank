import { PropsWithChildren, forwardRef } from 'react'
import classNames from 'classnames'
import classes from './classes.module.scss'
import BaseButton, {
  BaseButtonProps,
} from 'components/atoms/BaseButton/BaseButton'

export enum AppearanceTypes {
  Primary = 'primary',
  Secondary = 'secondary',
  Text = 'text',
}

export interface ButtonProps extends BaseButtonProps {
  appearance?: AppearanceTypes
  ariaLabel: string
  hidden?: boolean
  className?: string
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  function Button(
    { appearance = 'primary', ariaLabel, hidden, className, children, ...rest },
    ref
  ) {
    if (hidden) return null

    return (
      <BaseButton
        ref={ref}
        className={classNames(classes.btn, classes[appearance], className)}
        loaderClass={classes.loader}
        {...rest}
        aria-label={ariaLabel}
      >
        <span hidden={!children} className={classes.buttonText}>
          {children}
        </span>
      </BaseButton>
    )
  }
)

export default Button
