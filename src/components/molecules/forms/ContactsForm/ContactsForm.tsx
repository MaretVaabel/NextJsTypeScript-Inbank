'use client'
import React, { FC } from 'react'
import classes from './classes.module.scss'
import { Root } from '@radix-ui/react-form'
import { Control, Controller, useFormState } from 'react-hook-form'
import TextInput from 'components/molecules/TextInput/TextInput'
import Button, { AppearanceTypes } from 'components/molecules/Button/Button'
import { FormValues } from 'app/page'

interface ContactsFormTypes {
  control: Control<FormValues>
  onSubmit: () => void
}

const ContactsForm: FC<ContactsFormTypes> = ({ control, onSubmit }) => {
  const { errors } = useFormState({
    control,
  })

  return (
    <div className={classes.container}>
      <Root className={classes.formContainer} id="calculator">
        <Controller
          name="firstName"
          control={control}
          rules={{ required: 'First name is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              ariaLabel={'firstName'}
              type="text"
              placeholder="First name"
              error={errors[field.name]}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'Last name is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              ariaLabel={'lastName'}
              type="text"
              placeholder="Last name"
              error={errors[field.name]}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone number is required',
            pattern: {
              value: /(\+372\s?)[3-7]([0-9]{6,7})$/i,
              message: 'Phone number is incorrect',
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              ariaLabel={'phone'}
              type="text"
              placeholder="Mobile number"
              error={errors[field.name]}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'E-mail is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
              message: 'E-mail is incorrect',
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              ariaLabel={'email'}
              type="text"
              placeholder="E-mail"
              error={errors[field.name]}
            />
          )}
        />
        <Controller
          name="monthlyIncome"
          control={control}
          rules={{
            required: 'Monthly income is required',
            pattern: {
              value: /^(?!(?:\d{1,2}|100)$)[0-9]\d+$/i,
              message: 'Monthly income must be greater then 100',
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              ariaLabel={'monthlyIncome'}
              type="number"
              placeholder="Monthly income"
              error={errors[field.name]}
            />
          )}
        />
      </Root>
      <Button
        ariaLabel={'Submit form'}
        children={'Submit'}
        appearance={AppearanceTypes.Primary}
        onClick={onSubmit}
        className={classes.button}
      />
    </div>
  )
}

export default ContactsForm
