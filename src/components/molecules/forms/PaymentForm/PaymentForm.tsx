'use client'
import React, { FC, useMemo, useState } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import { Root } from '@radix-ui/react-form'
import { Control, Controller, useForm } from 'react-hook-form'
import TextInput from '../../TextInput/TextInput'
import SelectionInput from '../../SelectionInput/SelectionInput'
import Slider from '../../Slider/Slider'
import { map, range, round, toNumber, toString } from 'lodash'
import ContentBlock from '../../ContactBlock/ContactBlock'
import Button, { AppearanceTypes } from '../../Button/Button'
import { FormValues } from 'app/page'
import { watch } from 'fs'

interface PaymentFormPropsTypes {
  control: Control<FormValues>
  data: PaymentFormTypes
}

export interface PaymentFormTypes {
  minAmount: number
  maxAmount: number
  minPeriod: number
  maxPeriod: number
}

const PaymentForm: FC<PaymentFormPropsTypes> = ({ control, data }) => {
  // const { control, watch } = useForm({
  //   mode: 'onChange',
  //   defaultValues: {
  //     amount: toString(data.minAmount),
  //     period: toString(data.minPeriod),
  //   },
  // })

  // const values = watch()

  // console.log(values)

  const periodRange = range(data.minPeriod, data.maxPeriod + 1)

  const periodOptions = map(periodRange, (number) => ({
    label: `${number} months`,
    value: toString(number),
  }))
  // const monthlyPayment = useMemo(() => {
  //   const amountValue =
  //     toNumber(values.amount) < data.minAmount
  //       ? data.minAmount
  //       : toNumber(values.amount)
  //   const periodValue =
  //     toNumber(values.period) < data.minPeriod
  //       ? data.minPeriod
  //       : toNumber(values.period)

  //   return `${round(amountValue / periodValue, 2).toFixed(2)} €`
  // }, [values])

  // console.log(monthlyPayment)

  return (
    <Root className={classes.formContainer} id="calculator">
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <div className={classes.inputContainer}>
            <Slider
              {...field}
              minValue={data.minAmount}
              maxValue={data.maxAmount}
              id={'euro'}
              valueName="€"
            />
            <TextInput
              {...field}
              ariaLabel={'amount'}
              type="number"
              label="Amount"
            />
          </div>
        )}
      />
      <Controller
        name="period"
        control={control}
        render={({ field }) => (
          <div className={classes.inputContainer}>
            <Slider
              {...field}
              minValue={data.minPeriod}
              maxValue={data.maxPeriod}
              valueName="months"
              id={'period'}
            />
            <SelectionInput
              {...field}
              ariaLabel={'period'}
              label={'Period'}
              options={periodOptions}
            />
          </div>
        )}
      />
    </Root>
  )
}

export default PaymentForm
