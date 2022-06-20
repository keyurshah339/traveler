import "./PopUpModal.css";
export function PopUpModal({ props }) {
  const { showModal, modalText } = props;
  return (
    <div className={showModal ? "modale active" : "modale"} style={{color:'white'}}>{modalText}</div>
    
  );
}
