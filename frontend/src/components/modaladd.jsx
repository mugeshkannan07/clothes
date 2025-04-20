import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../css/modal.css';

Modal.setAppElement('#root');

const RtlCartModal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  const handleCloseAndGoHome = () => {
    onClose();
    navigate('/');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      overlayClassName="rtl-modal-overlay"
      className="rtl-modal-content"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <button className="close" onClick={handleCloseAndGoHome}>×</button>
        <div className="modal-body">
          {children}
        </div>
      </motion.div>
    </Modal>
  );
};

export default RtlCartModal;
