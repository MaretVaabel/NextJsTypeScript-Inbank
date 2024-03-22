import Button, { AppearanceTypes } from 'components/molecules/Button/Button'
import React, { FC } from 'react'
import CareerPhoto from 'assets/careers.png'
import Image from 'next/image'
import classes from './classes.module.scss'
import ContentBlock, {
  ContentBlockProps,
} from 'components/molecules/ContactBlock/ContactBlock'

interface MiniLoanSectionTypes {
  data: ContentBlockProps
  toggleModal: () => void
}

const MiniLoanSection: FC<MiniLoanSectionTypes> = ({ toggleModal, data }) => {
  return (
    <div className={classes.section}>
      <ContentBlock
        className={classes.textContainer}
        textBlockClass={classes.textBlock}
        {...data}
        children={
          <Button
            ariaLabel={'Apply loan now'}
            children={'Apply now'}
            appearance={AppearanceTypes.Secondary}
            onClick={toggleModal}
            className={classes.button}
          />
        }
      />
      <div className={classes.scrollInfo}>
        <Image
          src={CareerPhoto}
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
      <div />
    </div>
  )
}

export default MiniLoanSection
