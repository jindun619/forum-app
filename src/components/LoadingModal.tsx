export default function LoadingModal(props: { idName: string }) {
  return (
    <dialog id={props.idName} className="modal">
      <div className="modal-box">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </dialog>
  );
}
