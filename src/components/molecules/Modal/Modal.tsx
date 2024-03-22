import { FC, ReactElement } from 'react'
import classes from './classes.module.scss'
import classNames from 'classnames'
import CloseIcon from 'assets/close-icon.svg'
import Image from 'next/image'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactElement
  title?: string
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): ReturnType<FC> => {
  return (
    <div
      className={classNames(
        classes.modal,
        isOpen ? classes.displayBlock : classes.displayNone
      )}
    >
      <div className={classes.modalMain}>
        <div className={classes.modalHead}>
          <h3 className={classes.title}>{title}</h3>
          <button type="button" onClick={onClose}>
            <Image
              src={CloseIcon}
              alt={'close modal'}
              style={{ objectFit: 'cover' }}
            />
          </button>
        </div>
        <div className={classes.modalBody}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
