import ModalCreate from "./Modal";
export default function SummaryTransactions({ tambahItem }) {
  return (
    <div className="row mt-4">
      <div className="col-12 d-flex align-items-center justify-content-between">
        <h4>Ringkasan Transaksi</h4>
        <div className="wrapper-button d-flex">
          <ModalCreate
            action={tambahItem}
            category="IN"
            variant="button btn-ungu px-3 py-2 me-2 box-sh"
            text="Pemasukan"
            icon="bi bi-plus-circle ms-1"
            modalheading="Tambahkan Pemasukan"
          />
          <ModalCreate
            action={tambahItem}
            category="OUT"
            variant="button btn-pink px-3 py-2 box-sh"
            text="Pengeluaran"
            icon="bi bi-dash-circle-dotted ms-1"
            modalheading="Tambahkan Pengeluaran"
          />
        </div>
      </div>
    </div>
  );
}
