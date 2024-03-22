'use client'
import React from 'react'
import classes from './classes.module.scss'
import SmallLoanPhoto from 'assets/small-loan.png'
import Image from 'next/image'
import Button, { AppearanceTypes } from 'components/molecules/Button/Button'
import { FormValues } from 'app/page'
import { round, toNumber } from 'lodash'

const data = {
  title: 'Good news!',
  subTitle: 'Your loan has been approved',
}

const ApprovedPage = ({ searchParams }: { searchParams: FormValues }) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <Image
          src={SmallLoanPhoto}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            maxHeight: '839px',
          }}
          alt="career photo"
          className={classes.photo}
        />
      </div>
      <div className={classes.resultContainer}>
        <h2 className={classes.title}>{data.title}</h2>
        <p className={classes.subTitle}>{data.subTitle}</p>
        <table>
          <tbody>
            <tr>
              <td>{'Loan amount'}</td>
              <td>{`${searchParams.amount} €`}</td>
            </tr>
            <tr>
              <td>{'Loan period'}</td>
              <td>{`${searchParams.period} months`}</td>
            </tr>
            <tr>
              <td>{'Monthly payment'}</td>
              <td>{`${round(
                toNumber(searchParams.amount) / toNumber(searchParams.period),
                2
              ).toFixed(2)} €`}</td>
            </tr>
          </tbody>
        </table>

        <Button
          ariaLabel={'Back to home page'}
          children={'Back to home page'}
          appearance={AppearanceTypes.Primary}
          href={'/'}
          className={classes.button}
        />
      </div>
    </div>
  )
}

export default ApprovedPage
