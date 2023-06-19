export default function SummaryCard(props) {
  return (
    <>
      <div className="col-6">
        <div className="card-wrapper p-4">
          <div className="icon-wrapper-in box-sh">
            <i className="bi bi-wallet2" aria-hidden="true"></i>
          </div>
          <span className="title-sm">{props.title} </span>
          <h3 className="fw-bold">Rp. {props.nominal},</h3>
          <div>
            <span className="title-sm text-ungu fw-bold"> {props.transaksi} {props.string}</span>
            <span className="title-sm"> Transaksi</span>
          </div>
        </div>
      </div>
    </>
  );
}
