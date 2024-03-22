'use client'
import MiniLoanSection from 'components/organisms/MiniLoanSection/MiniLoanSection'
import CalculatorSection from 'components/organisms/CalculatorSection/CalculatorSection'
import { useState } from 'react'
import ContactsForm from 'components/molecules/forms/ContactsForm/ContactsForm'
import dynamic from 'next/dynamic'
import { SubmitHandler, useForm } from 'react-hook-form'
import { map, pick, toNumber, toString } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'

const Modal = dynamic(() => import('components/molecules/Modal/Modal'), {
  ssr: false,
})

const data = {
  loanInfo: {
    subTitle: 'Mini loan',
    mainTitle: 'Take charge of unexpected costs',
    description:
      'Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.',
  },
  calculationInfo: {
    mainTitle: 'Calculate your monthly payment',
    description:
      'Estimate your monthly payments based on the chosen loan amount and time period.',
  },
  paymentData: {
    minAmount: 300,
    maxAmount: 7200,
    minPeriod: 2,
    maxPeriod: 72,
  },
  paymentInfo: {
    subTitle: 'Monthly payment',
    description:
      'The calculation is approximate and may differ from the conditions offered to you. Please submit a loan application to receive a personal offer. Financial services are provided by AS Inbank Finance.',
  },
}
export type FormValues = {
  firstName: string
  lastName: string
  phone: string
  email: string
  monthlyIncome: number | null | string
  amount: string
  period: string
}

const HomePage = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      monthlyIncome: '',
      amount: toString(data.paymentData.minAmount),
      period: toString(data.paymentData.minPeriod),
    },
  })

  const toggleModal = () => {
    setShowModal(!showModal)
    if (!showModal) {
      document.body.style.overflowY = 'hidden'
    } else {
      reset()
      document.body.style.overflowY = 'auto'
    }
  }
  const searchParams = useSearchParams()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const params = new URLSearchParams(searchParams.toString())

    if (toNumber(data.monthlyIncome) > 1000) {
      const paramData = pick(data, ['amount', 'period'])
      map(paramData, (value, key) => params.set(key, toString(value)))
      router.push(`/result/approved?${params.toString()}`)
      toggleModal()
    } else {
      params.set('firstName', data.firstName)
      router.push(`/result/denied?${params.toString()}`)
      toggleModal()
    }
  }
  return (
    <main>
      <MiniLoanSection data={data.loanInfo} toggleModal={toggleModal} />
      <CalculatorSection
        data={data}
        toggleModal={toggleModal}
        control={control}
      />
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={toggleModal}
          title="Personal details"
        >
          <ContactsForm control={control} onSubmit={handleSubmit(onSubmit)} />
        </Modal>
      )}
    </main>
  )
}

export default HomePage
