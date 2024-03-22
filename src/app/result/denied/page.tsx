'use client'
import React from 'react'
import classes from './classes.module.scss'
import Button, { AppearanceTypes } from 'components/molecules/Button/Button'
import { FormValues } from 'app/page'

const data = {
  title: 'Dear ',
  subTitle: 'Unfortunately, your loan was denied.',
  decision:
    'In addition to your income and expenses, a number of other factors play a role in loan decisions.',
}

const DeniedPage = ({ searchParams }: { searchParams: FormValues }) => {
  return (
    <div className={classes.resultContainer}>
      <h2 className={classes.title}>
        {data.title} {searchParams.firstName}
      </h2>
      <p className={classes.subTitle}>{data.subTitle}</p>
      <p className={classes.decision}>{data.decision}</p>

      <Button
        ariaLabel={'Exit'}
        children={'Exit'}
        appearance={AppearanceTypes.Primary}
        href={'/'}
        className={classes.button}
      />
    </div>
  )
}

export default DeniedPage
