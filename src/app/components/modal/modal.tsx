import React from 'react'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import LoadingSpinner from '../loadingSpinner'

export interface IModalC {
  deleting: boolean
  isOpen: boolean
  deletePost: () => void
  setModal:(a:boolean) => void
}

const ModalC = ({ deleting, isOpen , deletePost, setModal}: IModalC) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Delete</ModalHeader>
      <ModalBody>
        {deleting ? (
          <LoadingSpinner>Deleting...</LoadingSpinner>
        ) : (
          'Are you sure you want to delete this blog?'
        )}
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={() => deletePost()}>
          Delete Permanently
        </Button>
        <Button color='secondary' onClick={() => setModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalC
