import React, { FC, ReactElement } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'

export interface ContentBlockProps {
  children?: ReactElement
  className?: string
  subTitle?: string
  mainTitle?: string
  description?: string
  id?: string
  textBlockClass?: string
}
const ContentBlock: FC<ContentBlockProps> = ({
  subTitle,
  mainTitle,
  description,
  children,
  className,
  textBlockClass,
  id,
}) => {
  return (
    <div id={id} className={classNames(classes.contactBlock, className)}>
      <div className={classNames(classes.textBlock, textBlockClass)}>
        <h6 hidden={!subTitle} className={classes.subTitle}>
          {subTitle}
        </h6>
        <h1 className={classes.mainTitle}>{mainTitle}</h1>
        <p hidden={!description} className={classes.description}>
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

export default ContentBlock
