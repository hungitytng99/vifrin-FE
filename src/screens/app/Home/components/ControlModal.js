import ReactModal from "react-modal";
import "./ControlModal.scss";
const customStyles = {
  overlay: {
    animation: "appear 0.3s linear",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    borderRadius: "10px",
    padding: "0px",
    border: "1px solid rgba(219,219,219,1)",
    animation: "zoominoutsinglefeatured 0.3s ease-out",
  },
};
// openModal,
ReactModal.setAppElement("#root");
function ControlModal(props) {
  const { modalIsOpen, closeModal, itemsList } = props;
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ul className="control-modal">
          {itemsList.map((item) => {
            return (
              <li
                key={item.title}
                className={
                  "flex-center control-modal__item " +
                  (item.isHighLight ? "--active" : "")
                }
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </ReactModal>
    </div>
  );
}
export default ControlModal;
