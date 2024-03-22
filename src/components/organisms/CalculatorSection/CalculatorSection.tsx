import React, { FC, useMemo } from 'react'
import classes from './classes.module.scss'
import ContentBlock, {
  ContentBlockProps,
} from 'components/molecules/ContactBlock/ContactBlock'
import PaymentForm, {
  PaymentFormTypes,
} from 'components/molecules/forms/PaymentForm/PaymentForm'
import { FormValues } from 'app/page'
import { Control, useWatch } from 'react-hook-form'
import Button, { AppearanceTypes } from 'components/molecules/Button/Button'
import { toNumber, round } from 'lodash'

interface CalculatorSectionTypes {
  data: {
    calculationInfo: ContentBlockProps
    paymentData: PaymentFormTypes
    paymentInfo: ContentBlockProps
  }
  toggleModal: () => void
  control: Control<FormValues>
}

const CalculatorSection: FC<CalculatorSectionTypes> = ({
  data,
  toggleModal,
  control,
}) => {
  const { calculationInfo, paymentData, paymentInfo } = data || {}
  const amount = useWatch({ control, name: 'amount' })
  const period = useWatch({ control, name: 'period' })

  const monthlyPayment = useMemo(() => {
    const amountValue =
      toNumber(amount) < paymentData.minAmount
        ? paymentData.minAmount
        : toNumber(amount)
    const periodValue =
      toNumber(period) < paymentData.minPeriod
        ? paymentData.minPeriod
        : toNumber(period)

    return `${round(amountValue / periodValue, 2).toFixed(2)} €`
  }, [amount, period])

  return (
    <div className={classes.container}>
      <ContentBlock
        {...calculationInfo}
        className={classes.textContainer}
        textBlockClass={classes.textBlock}
      />
      <div className={classes.paymentContainer}>
        <PaymentForm control={control} data={paymentData} />
        <ContentBlock
          className={classes.paymentTextContainer}
          textBlockClass={classes.paymentTextBlock}
          subTitle={paymentInfo.subTitle}
          mainTitle={monthlyPayment}
          children={
            <Button
              ariaLabel={'Apply loan now'}
              children={'Apply now'}
              appearance={AppearanceTypes.Primary}
              onClick={toggleModal}
              className={classes.button}
            />
          }
        />
        <p className={classes.description}>{paymentInfo.description}</p>
      </div>
    </div>
  )
}

export default CalculatorSection
